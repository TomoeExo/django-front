import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/hooks/constants/seo.constants'

import { WorkoutHistory } from './WorkoutHistory'

export const metadata: Metadata = {
	title: 'Workout History',
	...NO_INDEX_PAGE
}

export default function WorkoutHistoryPage() {
	return <WorkoutHistory />
}
