import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { WorkoutsAll } from './WorkoutsAll'

export const metadata: Metadata = {
	title: 'Workouts All',
	...NO_INDEX_PAGE
}

export default function WorkoutFavoritesPage() {
	return <WorkoutsAll />
}
