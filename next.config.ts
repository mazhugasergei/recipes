import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const IS_PROD = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
	reactCompiler: true,
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	output: "export",
	basePath: IS_PROD ? "/recipes" : "",
	assetPrefix: IS_PROD ? "/recipes" : "",
	trailingSlash: true,
	skipTrailingSlashRedirect: true,
	images: { unoptimized: true },
}

const withMDX = createMDX({
	// optional: remark/rehype plugins go here
	// options: { remarkPlugins: [], rehypePlugins: [] },
})

export default withMDX(nextConfig)
