import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Home } from './Home'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function Dashboard() {
	return (
		<div className=' bg-COLORS-bg_color_app min-h-screen'>
			<Home />
		</div>
	)
}
