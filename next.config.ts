import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	reactCompiler: true,
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	output: "export",
	basePath: "/recipes",
	assetPrefix: "/recipes",
	trailingSlash: true,
	skipTrailingSlashRedirect: true,
	images: { unoptimized: true },
}

const withMDX = createMDX({
	// optional: remark/rehype plugins go here
	// options: { remarkPlugins: [], rehypePlugins: [] },
})

export default withMDX(nextConfig)
