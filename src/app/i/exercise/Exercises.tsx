import { useEffect, useState } from 'react'

import { Heading } from '@/components/dashboard-layout/header/Heading'

import CustomPagination from './CustomPagination'
import { ExerciseCard } from './ExerciseCard'
import { exerciseOptions, fetchData } from '@/lib/fetchData'

export function Exercises({ exercises, setExercises, bodyPart }: any) {
	const [currentPage, setCurrentPage] = useState(1)
	const [exercisesPerPage] = useState(9)

	const indexOfLastExercise = currentPage * exercisesPerPage
	const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
	const currentExercises = exercises.slice(
		indexOfFirstExercise,
		indexOfLastExercise
	)

	const totalPages = Math.ceil(exercises.length / exercisesPerPage)

	const handlePageChange = (pageNumber: any) => {
		setCurrentPage(pageNumber)
		window.scrollTo({ top: 1800, behavior: 'smooth' })
	}

	useEffect(() => {
		const fetchExercisesData = async () => {
			let exercisesData = []

			if (bodyPart === 'all') {
				exercisesData = await fetchData(
					'https://exercisedb.p.rapidapi.com/exercises?limit=2000',
					exerciseOptions
				)
			} else {
				exercisesData = await fetchData(
					`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=2000`,
					exerciseOptions
				)
			}
			setExercises(exercisesData)
		}

		fetchExercisesData()
	}, [bodyPart, setExercises])

	if (!exercises.length) return null

	return (
		<div
			id='exercises'
			className='max-w-7xl'
		>
			<Heading title='Showing Results' />
			<div className='flex flex-row flex-wrap justify-center gap-5 ml-3'>
				{currentExercises.map((exercise: any, index: any) => (
					<ExerciseCard
						key={index}
						exercise={exercise}
					/>
				))}
			</div>
			<div>
				{exercises.length > 9 && (
					<div className='my-5'>
						<CustomPagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
