import { useState } from 'react'

import { Heading } from '@/components/dashboard-layout/header/Heading'

import CustomPagination from '../exercise/CustomPagination'

import { WorkoutCard } from './WorkoutCard'

export function SearchWorkoutsResult({ workouts }: any) {
	const [currentPage, setCurrentPage] = useState(1)
	const [workoutPerPage] = useState(9)

	const indexOfLastWorkout = currentPage * workoutPerPage
	const indexOfFirstWorkout = indexOfLastWorkout - workoutPerPage
	const currentWorkouts = workouts.slice(
		indexOfFirstWorkout,
		indexOfLastWorkout
	)

	const totalPages = Math.ceil(workouts.length / workoutPerPage)

	const handlePageChange = (pageNumber: any) => {
		setCurrentPage(pageNumber)
		window.scrollTo({ top: 1800, behavior: 'smooth' })
	}
	return (
		<div className='mb-10'>
			<Heading title='Showing Results' />
			<div className='flex gap-5 ml-5 max-w-[1160px] flex-wrap lg:justify-center sm:ml-2'>
				{currentWorkouts.map((workout: any, index: any) => (
					<WorkoutCard
						key={index}
						item={workout}
					/>
				))}
			</div>
			<div>
				{workouts.length > 9 && (
					<div>
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
