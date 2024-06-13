import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Workout Info',
	...NO_INDEX_PAGE
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
