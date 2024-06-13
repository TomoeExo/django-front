'use client'

import { useState } from 'react'

import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { Heading } from '@/components/dashboard-layout/header/Heading'

import { useCompleted } from '@/hooks/useCompleted'

import CustomPagination from '../../exercise/CustomPagination'
import { WorkoutCard } from '../WorkoutCard'

export function WorkoutHistory() {
	const { data: completedData, isLoading: completedLoading } = useCompleted()
	const [currentPage, setCurrentPage] = useState(1)
	const [workoutPerPage] = useState(9)

	if (completedLoading) {
		return <div>Loading...</div>
	}

	const indexOfLastWorkout = currentPage * workoutPerPage
	const indexOfFirstWorkout = indexOfLastWorkout - workoutPerPage
	const currentWorkouts = completedData.slice(
		indexOfFirstWorkout,
		indexOfLastWorkout
	)

	const totalPages = Math.ceil(completedData.length / workoutPerPage)

	const handlePageChange = (pageNumber: any) => {
		setCurrentPage(pageNumber)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<>
			<DashboardHeader
				title='Workout History'
				description='Welcome to history page'
			/>
			<div className='mb-10'>
				<Heading title='History' />
				<div className='flex gap-5 ml-5 flex-wrap sm:ml-2'>
					{currentWorkouts.map((completedWorkout: any, index: any) => (
						<WorkoutCard
							key={index}
							item={{
								...completedWorkout.workout,
								totalSeconds: completedWorkout.totalSeconds,
								completedAt: completedWorkout.completedAt
							}}
						/>
					))}
				</div>
				<div>
					{completedData.length > workoutPerPage && (
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
		</>
	)
}
