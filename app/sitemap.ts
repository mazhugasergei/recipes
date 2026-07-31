import { getAllPostsMeta } from "@/entities/post"
import { MetadataRoute } from "next"

const BASE_URL = "https://mazhugasergei.github.io/recipes"

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getAllPostsMeta()

	const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `${BASE_URL}/blog/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "monthly",
		priority: 0.8,
	}))

	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		...postEntries,
	]
}
