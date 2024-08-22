import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/hooks/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Workout Update',
	...NO_INDEX_PAGE
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
