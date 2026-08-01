import { PostMeta } from "../api/get-posts"

// shared filtering logic — pulled out so PostsGrid (and any future consumer) doesn't duplicate the rules
export function filterPosts(posts: PostMeta[], query: string, tag: string): PostMeta[] {
	const q = query.trim().toLocaleLowerCase("ru")

	return posts.filter((post) => {
		const matchesQuery = !q || post.title.toLocaleLowerCase("ru").includes(q)
		const matchesTag = !tag || post.tags.includes(tag)
		return matchesQuery && matchesTag
	})
}
