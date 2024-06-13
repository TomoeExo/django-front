import { useState } from 'react'

import { Heading } from '@/components/dashboard-layout/header/Heading'
import Search from '@/components/search/Search'

import { useWorkouts } from '@/hooks/useWorkouts'

export function SearchWorkouts({ setWorkouts }: any) {
	const [search, setSearch] = useState('')
	const { data: workoutsData, isLoading } = useWorkouts()

	const handleSearch = (term: string) => {
		setSearch(term)
	}

	const handleSearchClick = async () => {
		const filteredWorkouts = workoutsData.filter(
			(workout: any) =>
				workout.title.toLowerCase().includes(search.toLowerCase()) ||
				(workout.description &&
					workout.description.toLowerCase().includes(search.toLowerCase())) ||
				(workout.tags &&
					workout.tags.some((tag: string) =>
						tag.toLowerCase().includes(search.toLowerCase())
					))
		)

		setSearch('')
		setWorkouts(filteredWorkouts)
	}

	return (
		<>
			<Heading title='Search Workouts' />
			<Search
				onSearch={handleSearch}
				onClick={handleSearchClick}
				placeholder='Search Workout'
				className='max-w-[1078px] w-full mx-3 lg:max-w-[720px]'
			/>
		</>
	)
}
