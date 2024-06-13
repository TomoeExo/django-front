import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Statistic } from './Statistic'

export const metadata: Metadata = {
	title: 'Workout',
	...NO_INDEX_PAGE
}

export default function StatisticPage() {
	return <Statistic />
}
