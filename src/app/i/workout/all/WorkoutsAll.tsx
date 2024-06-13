'use client'

import { useState } from 'react'

import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { Heading } from '@/components/dashboard-layout/header/Heading'

import { useWorkouts } from '@/hooks/useWorkouts'

import CustomPagination from '../../exercise/CustomPagination'
import { WorkoutCard } from '../WorkoutCard'

export function WorkoutsAll() {
	const { data: workouts, isLoading } = useWorkouts() // Используем хук useWorkout для получения данных
	const [currentPage, setCurrentPage] = useState(1)
	const [workoutPerPage] = useState(9)

	if (isLoading) {
		return <div>Loading...</div> // Возвращаем заглушку во время загрузки
	}

	if (!workouts || workouts.length === 0) {
		return <div>No workouts found</div> // Возвращаем заглушку, если нет тренировок
	}

	const indexOfLastWorkout = currentPage * workoutPerPage
	const indexOfFirstWorkout = indexOfLastWorkout - workoutPerPage
	const currentWorkouts = workouts.slice(
		indexOfFirstWorkout,
		indexOfLastWorkout
	)

	const totalPages = Math.ceil(workouts.length / workoutPerPage)

	const handlePageChange = (pageNumber: any) => {
		setCurrentPage(pageNumber)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<>
			<DashboardHeader
				title='Workouts All'
				description='Here are all your workouts'
			/>
			<div className='mb-10'>
				<Heading title='All Workouts' />
				<div className='flex gap-5 ml-5 flex-wrap sm:ml-2'>
					{currentWorkouts.map((workout: any, index: any) => (
						<WorkoutCard
							key={index}
							item={workout} // Передаем данные всех тренировок в компонент WorkoutCard
						/>
					))}
				</div>
				<div>
					{workouts.length > workoutPerPage && (
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
