import { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: "https://mazhugasergei.github.io/recipes/sitemap.xml",
	}
}
