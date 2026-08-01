import crypto from "crypto"
import fs from "fs"
import matter from "gray-matter"
import path from "path"
import sharp from "sharp"

const POSTS_DIR = "public/posts"
const MAX_IMAGE_SIZE = 1280
const EXAMPLE_FILE = "example.mdx"
const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif)$/i

// cyrillic → latin map, same transliteration rules used for slugs elsewhere on the site
const RU_TO_LAT = {
	а: "a",
	б: "b",
	в: "v",
	г: "g",
	д: "d",
	е: "e",
	ё: "yo",
	ж: "zh",
	з: "z",
	и: "i",
	й: "y",
	к: "k",
	л: "l",
	м: "m",
	н: "n",
	о: "o",
	п: "p",
	р: "r",
	с: "s",
	т: "t",
	у: "u",
	ф: "f",
	х: "h",
	ц: "ts",
	ч: "ch",
	ш: "sh",
	щ: "sch",
	ъ: "",
	ы: "y",
	ь: "",
	э: "e",
	ю: "yu",
	я: "ya",
}

function transliterate(str) {
	return str
		.toLowerCase()
		.split("")
		.map((char) => RU_TO_LAT[char] ?? char)
		.join("")
}

function slugify(str) {
	return transliterate(str)
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
}

function isRemoteUrl(src) {
	return /^https?:\/\//.test(src)
}

// remote sources are fetched over the network; anything else is treated as a bare filename
// sitting directly in public/posts, ignoring any path segments the author might have typed
async function loadImageBuffer(src, postsDir) {
	if (isRemoteUrl(src)) {
		const res = await fetch(src)
		if (!res.ok) throw new Error(`failed to fetch ${src}: ${res.status}`)
		return Buffer.from(await res.arrayBuffer())
	}

	const filename = path.basename(src)
	const filePath = path.join(postsDir, filename)
	if (!fs.existsSync(filePath)) throw new Error(`local image not found: ${filename}`)
	return fs.readFileSync(filePath)
}

// resizes to MAX_IMAGE_SIZE, converts to webp, writes it into the post's images folder
async function saveAsWebp(buffer, imagesDir) {
	const filename = `${crypto.randomUUID()}.webp`
	const destPath = path.join(imagesDir, filename)

	const image = sharp(buffer)
	const metadata = await image.metadata()

	await image
		.resize({ width: Math.min(metadata.width ?? MAX_IMAGE_SIZE, MAX_IMAGE_SIZE), withoutEnlargement: true })
		.webp({ quality: 82 })
		.toFile(destPath)

	return filename
}

// loose top-level files, split by type — used to decide whether multiple mdx files can be processed safely
function findRawFiles() {
	const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true })
	const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name)

	const mdxFiles = files.filter((name) => name.endsWith(".mdx") && name !== EXAMPLE_FILE)
	const imageFiles = files.filter((name) => IMAGE_EXTENSIONS.test(name))

	return { mdxFiles, imageFiles }
}

async function migratePost(filename) {
	const sourcePath = path.join(POSTS_DIR, filename)
	const raw = fs.readFileSync(sourcePath, "utf-8")
	const { data, content } = matter(raw)

	if (!data.title) throw new Error(`${filename} is missing a title in frontmatter`)

	const slug = slugify(data.title)
	const postDir = path.join(POSTS_DIR, slug)
	const imagesDir = path.join(postDir, "images")
	fs.mkdirSync(imagesDir, { recursive: true })

	const publicUrlBase = `/posts/${slug}/images`
	const usedLocalImages = new Set()

	// tracks which loose local files were actually consumed, so only those get cleaned up afterward
	function trackIfLocal(src) {
		if (!isRemoteUrl(src)) usedLocalImages.add(path.basename(src))
	}

	const newFrontmatter = { ...data }
	if (data.image) {
		trackIfLocal(data.image)
		const buffer = await loadImageBuffer(data.image, POSTS_DIR)
		const imageFilename = await saveAsWebp(buffer, imagesDir)
		newFrontmatter.image = `${publicUrlBase}/${imageFilename}`
	}

	// walk every markdown image in the body and replace its src with the migrated local file
	const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
	let newContent = ""
	let lastIndex = 0
	let match

	while ((match = imageRegex.exec(content)) !== null) {
		const [full, alt, src] = match
		newContent += content.slice(lastIndex, match.index)

		trackIfLocal(src)
		const buffer = await loadImageBuffer(src, POSTS_DIR)
		const imageFilename = await saveAsWebp(buffer, imagesDir)
		newContent += `![${alt}](${publicUrlBase}/${imageFilename})`

		lastIndex = match.index + full.length
	}
	newContent += content.slice(lastIndex)

	const output = matter.stringify(newContent, newFrontmatter)
	fs.writeFileSync(path.join(postDir, "index.mdx"), output)

	// clean up the raw mdx and every loose image file that was actually referenced and migrated
	fs.unlinkSync(sourcePath)
	for (const imageFilename of usedLocalImages) {
		fs.unlinkSync(path.join(POSTS_DIR, imageFilename))
	}

	console.log(`migrated ${filename} → public/posts/${slug}/index.mdx (${usedLocalImages.size} local image(s))`)
}

async function main() {
	if (!fs.existsSync(POSTS_DIR)) {
		console.log(`no ${POSTS_DIR} folder found — nothing to migrate`)
		return
	}

	const { mdxFiles, imageFiles } = findRawFiles()

	if (mdxFiles.length === 0) {
		console.log("no raw .mdx file found in public/posts — nothing to migrate")
		return
	}

	// with loose local images present, there's no way to tell which image belongs to which
	// post if multiple mdx files are being processed at once — stay strict in that case
	if (mdxFiles.length > 1 && imageFiles.length > 0) {
		throw new Error(
			`found ${mdxFiles.length} raw .mdx files alongside ${imageFiles.length} loose image(s) — ` +
				`when local images are present, only one .mdx can be processed at a time, since there's ` +
				`no way to tell which image belongs to which post. Either process one post at a time, or ` +
				`use only remote image urls when migrating multiple posts together.`
		)
	}

	// no ambiguity possible — every referenced image is either remote, or there's only one post to match against
	for (const filename of mdxFiles) {
		await migratePost(filename)
	}

	console.log(`migrated ${mdxFiles.length} post(s)`)
}

main().catch((error) => {
	console.error(error.message)
	process.exit(1)
})
