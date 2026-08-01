import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const basePath = process.env.NODE_ENV === "production" ? "/recipes" : ""

const nextConfig: NextConfig = {
	reactCompiler: true,
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

	output: "export",
	trailingSlash: true,
	skipTrailingSlashRedirect: true,
	images: { unoptimized: true },

	basePath,
	assetPrefix: basePath,
	env: {
		NEXT_PUBLIC_BASE_PATH: basePath,
	},
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
