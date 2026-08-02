import fs from "fs"
import matter from "gray-matter"
import path from "path"

const POSTS_DIR = path.join(process.cwd(), "public/posts")

interface PostFrontmatter {
	title: string
	date: string
	tags?: string[]
}

export interface PostMeta {
	slug: string
	title: string
	date: string
	image?: string
	tags: string[]
}

// each post now lives in its own folder (public/posts/{slug}/index.mdx) after the migration script runs,
// so this reads directory names directly instead of deriving the slug from the title
function getPostSlugs(): string[] {
	return fs
		.readdirSync(POSTS_DIR, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
}

// there's no separate cover-image field anymore — the cover is just the first inline
// image found in the post body, same image the migration script already normalized
function extractFirstImage(content: string): string | undefined {
	const match = content.match(/!\[[^\]]*\]\(([^)]+)\)/)
	return match?.[1]
}

export function getAllPostsMeta(): PostMeta[] {
	const slugs = getPostSlugs()
	const posts = slugs.map((slug) => {
		const raw = fs.readFileSync(path.join(POSTS_DIR, slug, "index.mdx"), "utf-8")
		const { data, content } = matter(raw)
		const frontmatter = data as PostFrontmatter

		return {
			slug,
			title: frontmatter.title,
			date: frontmatter.date,
			image: extractFirstImage(content),
			tags: frontmatter.tags ?? [],
		}
	})

	return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export interface Post extends PostMeta {
	content: string
}

export function getAllPosts(): Post[] {
	const slugs = getPostSlugs()
	return slugs.map((slug) => {
		const raw = fs.readFileSync(path.join(POSTS_DIR, slug, "index.mdx"), "utf-8")
		const { data, content } = matter(raw)
		const frontmatter = data as PostFrontmatter

		return {
			slug,
			title: frontmatter.title,
			date: frontmatter.date,
			image: extractFirstImage(content),
			tags: frontmatter.tags ?? [],
			content,
		}
	})
}

export function getPostBySlug(slug: string): Post | undefined {
	const dirPath = path.join(POSTS_DIR, slug)
	if (!fs.existsSync(dirPath)) return undefined

	const raw = fs.readFileSync(path.join(dirPath, "index.mdx"), "utf-8")
	const { data, content } = matter(raw)
	const frontmatter = data as PostFrontmatter

	return {
		slug,
		title: frontmatter.title,
		date: frontmatter.date,
		image: extractFirstImage(content),
		tags: frontmatter.tags ?? [],
		content,
	}
}

// returns every unique tag across all posts, sorted alphabetically — useful for a tag filter/index page
export function getAllTags(): string[] {
	const tags = getAllPostsMeta().flatMap((post) => post.tags)
	return [...new Set(tags)].sort((a, b) => a.localeCompare(b, "ru"))
}

// returns posts that include the given tag
export function getPostsByTag(tag: string): PostMeta[] {
	return getAllPostsMeta().filter((post) => post.tags.includes(tag))
}
