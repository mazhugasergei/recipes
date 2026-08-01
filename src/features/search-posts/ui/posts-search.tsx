import { PostMeta } from "@/entities/post"
import { Suspense } from "react"
import { PostsGrid } from "./posts-grid"
import { PostsSearchSkeleton } from "./posts-search-skeleton"
import { SearchInput } from "./search-input"
import { TagFilter } from "./tag-filter"

export function PostsSearch({ posts }: { posts: PostMeta[] }) {
	const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b, "ru"))

	return (
		<Suspense fallback={<PostsSearchSkeleton />}>
			<SearchInput />
			<TagFilter tags={allTags} />
			<PostsGrid posts={posts} />
		</Suspense>
	)
}
