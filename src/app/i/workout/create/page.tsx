import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { WorkoutCreate } from './WorkoutCreate'

export const metadata: Metadata = {
	title: 'Workout Create',
	...NO_INDEX_PAGE
}

export default function WorkoutCreatePage() {
	return <WorkoutCreate />
}
