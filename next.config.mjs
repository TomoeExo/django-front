/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		SERVER_URL: process.env.NEXT_PUBLIC_API_BASE_URL
	},

	async rewrites() {
		return [
			{
				source: '/api/v1/:path*',
				destination: `http://147.45.246.238:8000/api/v1/:path*`
			}
		]
	}
}

export default nextConfig
