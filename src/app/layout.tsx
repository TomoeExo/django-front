import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'

import { SITE_NAME } from '@/constants/seo.constants'

import './globals.scss'
import { Providers } from './providers'

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Best one for workout app'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
			</head>
			<body className={zen.className}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
