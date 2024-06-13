import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ExercisePage } from './ExerciseHome'

export const metadata: Metadata = {
	title: 'Exercise',
	...NO_INDEX_PAGE
}

export default function Exercise() {
	return <ExercisePage />
}
