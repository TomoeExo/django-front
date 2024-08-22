'use client'

import { Banner } from '@/components/banner/Banner'
import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { Heading } from '@/components/dashboard-layout/header/Heading'
import { TopWorkoutContainer } from '@/components/dashboard-layout/top-workout/TopWorkoutContainer'
import { WorkoutList } from '@/components/dashboard-layout/workout-list/WorkoutList'

import { useCompleted } from '@/hooks/useCompleted'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useWorkouts } from '@/hooks/useWorkouts'

export function Home() {
	const { data: completedData, isLoading: completedLoading } = useCompleted()

	const { data: workoutData, isLoading: workoutLoading } = useWorkouts()
	const is3xl = useMediaQuery('(max-width: 1870px)') // Adjust the width for 3xl as necessary
	const favoriteWorkouts =
		workoutData?.filter((workout: any) => workout.is_favorite) || []

	const workoutMap = new Map(
		(workoutData || []).map((workout: any) => [workout.id, workout])
	)

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
				title='Home'
				description='Welcome to home page'
			/>

			<Banner />
			<div className='3xl:flex 3xl:gap-5 flex-wrap 3xl:ml-2'>
				<div className='absolute right-2 top-[105px] 3xl:flex 3xl:relative 3xl:top-0 3xl:right-0'>
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
				<div className='absolute right-2 top-[605px] 3xl:flex 3xl:relative 3xl:top-0 3xl:right-0'>
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
			</div>
			<Heading title='New Workout' />
			<WorkoutList
				data={workoutData}
				isLoading={workoutLoading}
			/>
			<Heading title='Workout save' />
			<WorkoutList
				data={workoutData}
				isLoading={workoutLoading}
			/>
		</>
	)
}
