import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { WorkoutHome } from './WorkoutHome'

export const metadata: Metadata = {
	title: 'Workout',
	...NO_INDEX_PAGE
}

export default function Workout() {
	return <WorkoutHome />
}
