'use client'

import { useState } from 'react'

import { BannerContent } from '@/components/banner/BannerContent'
import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { TopWorkoutContainer } from '@/components/dashboard-layout/top-workout/TopWorkoutContainer'

import { useCompleted } from '@/hooks/useCompleted'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useWorkouts } from '@/hooks/useWorkouts'

import { SearchWorkouts } from './SearchWorkouts'
import { SearchWorkoutsResult } from './SearchWorkoutsResult'
import styles from './Workout.module.scss'

export function WorkoutHome() {
	const [workouts, setWorkouts] = useState<any[]>([])
	const { data: completedData, isLoading: completedLoading } = useCompleted()
	const { data: workoutData, isLoading: workoutLoading } = useWorkouts()
	const is3xl = useMediaQuery('(max-width: 1870px)') // Adjust the width for 3xl as necessary

	// Создаем карту тренировок
	const workoutMap = new Map(
		(workoutData || []).map((workout: any) => [workout.id, workout])
	)

	// Фильтруем избранные тренировки
	const favoriteWorkouts =
		workoutData?.filter((workout: any) => workout.is_favorite) || []

	const slicedFavoriteWorkouts = is3xl
		? favoriteWorkouts.slice(0, 2)
		: favoriteWorkouts.slice(0, 2)

	const slicedCompletedData = is3xl
		? completedData?.slice(0, 2)
		: completedData?.slice(0, 5)

	const completedWorkoutsData = (slicedCompletedData || [])
		.map((completed: any) => {
			const workout = workoutMap.get(completed.workout)
			return workout
				? {
						...workout,
						total_seconds: completed.total_seconds,
						completed_at: completed.completed_at
					}
				: null
		})
		.filter((workout: any) => workout !== null)

	return (
		<>
			<DashboardHeader
				title='Workout'
				description='Welcome to workout page'
			/>

			<div className={styles.bg_banner}>
				<BannerContent />
			</div>
			<div className='absolute right-2 top-[105px] 3xl:hidden'>
				<TopWorkoutContainer
					title='Top Workouts'
					linkHref={`/i/workout/favorites`}
					isFavorite={true}
					workoutItemProps={{
						data: slicedFavoriteWorkouts,
						isLoading: workoutLoading
					}}
				/>
			</div>
			<div className='absolute right-2 top-[605px] 3xl:hidden'>
				<TopWorkoutContainer
					isFavorite={false}
					title='History'
					linkHref={`/i/workout/history`}
					workoutItemProps={{
						data: completedWorkoutsData,
						isLoading: completedLoading
					}}
				/>
			</div>
			<SearchWorkouts setWorkouts={setWorkouts} />
			<SearchWorkoutsResult workouts={workouts} />
		</>
	)
}
