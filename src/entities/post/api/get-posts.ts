import fs from "fs"
import matter from "gray-matter"
import path from "path"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

interface PostFrontmatter {
	title: string
	date: string
	image?: string
}

export interface PostMeta {
	slug: string
	title: string
	date: string
	image?: string
}

export function getAllPostsMeta(): PostMeta[] {
	const files = fs.readdirSync(POSTS_DIR)
	const posts = files.map((filename) => {
		const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8")
		const { data } = matter(raw)
		const frontmatter = data as PostFrontmatter

		return {
			slug: filename.replace(/\.mdx$/, ""),
			title: frontmatter.title,
			date: frontmatter.date,
			image: frontmatter.image,
		}
	})

	return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}
