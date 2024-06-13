'use client'

import { useState } from 'react'

import { BannerContent } from '@/components/banner/BannerContent'
import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { TopWorkoutContainer } from '@/components/dashboard-layout/top-workout/TopWorkoutContainer'

import { useCompleted } from '@/hooks/useCompleted'
import { useWorkouts } from '@/hooks/useWorkouts'

import { SearchWorkouts } from './SearchWorkouts'
import { SearchWorkoutsResult } from './SearchWorkoutsResult'
import styles from './Workout.module.scss'

export function WorkoutHome() {
	const [workouts, setWorkouts] = useState<any[]>([])
	const { data: completedData, isLoading: completedLoading } = useCompleted()
	const { data: workoutData, isLoading: workoutLoading } = useWorkouts()
	// Фильтруем избранные тренировки
	const favoriteWorkouts =
		workoutData?.filter((workout: any) => workout.isFavorite) || []

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
						data: favoriteWorkouts.slice(0, 3),
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
						data: completedData?.slice(0, 5),
						isLoading: completedLoading
					}}
				/>
			</div>
			<SearchWorkouts setWorkouts={setWorkouts} />
			<SearchWorkoutsResult workouts={workouts} />
		</>
	)
}
