import { useState } from 'react'

import { Heading } from '@/components/dashboard-layout/header/Heading'
import Search from '@/components/search/Search'

import { exerciseOptions, fetchData } from '@/lib/fetchData'

export function SearchExercises({ setExercises }: any) {
	const [search, setSearch] = useState('')

	const handleSearch = (term: string) => {
		setSearch(term)
	}

	const handleSearchClick = async () => {
		if (search) {
			try {
				const exercisesData = await fetchData(
					'https://exercisedb.p.rapidapi.com/exercises?limit=2000',
					exerciseOptions
				)

				const searchedExercises = exercisesData.filter(
					(exercise: any) =>
						exercise.name.toLowerCase().includes(search) ||
						exercise.target.toLowerCase().includes(search) ||
						exercise.equipment.toLowerCase().includes(search) ||
						exercise.bodyPart.toLowerCase().includes(search)
				)
				setSearch('')
				setExercises(searchedExercises)
			} catch (error) {
				console.error('Error fetching exercises data:', error)
			}
		}
	}

	return (
		<>
			<Heading title='Search Exercises' />
			<Search
				onSearch={handleSearch}
				onClick={handleSearchClick}
				placeholder='Search Exercise'
				className='max-w-[1078px] w-full ml-3'
			/>
		</>
	)
}
