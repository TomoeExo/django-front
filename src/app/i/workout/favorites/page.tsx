import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { FavoriteWorkout } from './FavoriteWorkout'

export const metadata: Metadata = {
	title: 'Workout Favorites',
	...NO_INDEX_PAGE
}

export default function WorkoutFavoritesPage() {
	return <FavoriteWorkout />
}
