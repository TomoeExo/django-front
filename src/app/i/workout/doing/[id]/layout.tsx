import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Doing Workout',
	...NO_INDEX_PAGE
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
