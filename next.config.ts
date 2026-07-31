import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	reactCompiler: true,
}

const withMDX = createMDX({
	// optional: remark/rehype plugins go here
	// options: { remarkPlugins: [], rehypePlugins: [] },
})

export default withMDX(nextConfig)
