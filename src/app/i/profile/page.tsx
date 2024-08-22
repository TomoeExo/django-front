import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/hooks/constants/seo.constants'

import { Profile } from './Profile'

export const metadata: Metadata = {
	title: 'Profile',
	...NO_INDEX_PAGE
}

export default function Dashboard() {
	return <Profile />
}
