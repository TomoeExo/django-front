'use client'

import { useEffect, useState } from 'react'

import { BannerContent } from '@/components/banner/BannerContent'
import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { Heading } from '@/components/dashboard-layout/header/Heading'
import { TopWorkoutContainer } from '@/components/dashboard-layout/top-workout/TopWorkoutContainer'

import { useCompleted } from '@/hooks/useCompleted'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useWorkouts } from '@/hooks/useWorkouts'

import styles from './Statistic.module.scss'

export function Statistic() {
	const { data: completedData, isLoading: completedLoading } = useCompleted()
	const [totalTime, setTotalTime] = useState(0)
	const [averageDuration, setAverageDuration] = useState(0)
	const [completedSessions, setCompletedSessions] = useState(0)
	const { data: workoutData, isLoading: workoutLoading } = useWorkouts()
	const is3xl = useMediaQuery('(max-width: 1870px)') // Adjust the width for
	const slicedCompletedData = is3xl
		? completedData?.slice(0, 2)
		: completedData?.slice(0, 5)
	useEffect(() => {
		if (!completedLoading && completedData) {
			const totalSessions = completedData.length
			const totalSeconds = completedData.reduce(
				(acc: any, workout: any) => acc + workout.total_seconds,
				0
			)
			const averageTime = totalSessions ? totalSeconds / totalSessions : 0

			setCompletedSessions(totalSessions)
			setTotalTime(totalSeconds)
			setAverageDuration(averageTime)
		}
	}, [completedLoading, completedData])

	const formatTime = (seconds: any) => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		const formattedSecs = secs % 1 === 0 ? secs.toFixed(0) : secs.toFixed(1)
		return `${mins > 0 ? mins + ' min ' : ''}${formattedSecs} sec`
	}

	const workoutMap = new Map(
		(workoutData || []).map((workout: any) => [workout.id, workout])
	)

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
				title='Statistic'
				description='Welcome to statistic page'
			/>
			<div className={styles.bg_banner}>
				<BannerContent />
			</div>
			<div className='absolute right-2 top-[105px] 3xl:flex 3xl:relative 3xl:top-0 3xl:right-0 3xl:ml-2'>
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
			<Heading title='General Information' />
			<div className='px-6 py-4 w-[600px] sm:w-full'>
				<div className='font-medium text-xl mb-2 flex justify-between items-center sm:border sm:rounded-md sm:border-COLORS-stroke_main sm:p-2 sm:text-base sm:font-normal'>
					<div className='sm:border-r sm:border-COLORS-stroke_main sm:mr-2 sm:pr-2'>
						Completed training sessions:{' '}
					</div>
					<div className='font-bold sm:font-normal'>{completedSessions}</div>
				</div>
				<div className='font-bold text-xl mb-2 flex justify-between items-center sm:border sm:rounded-md sm:border-COLORS-stroke_main sm:p-2 sm:text-base sm:font-normal'>
					<div className='sm:border-r sm:border-COLORS-stroke_main sm:mr-2 sm:pr-2'>
						Average training duration:{' '}
					</div>
					<div className='font-bold sm:font-normal'>
						{formatTime(averageDuration)}
					</div>
				</div>
				<div className='font-bold text-xl mb-2 flex justify-between items-center sm:border sm:rounded-md sm:border-COLORS-stroke_main sm:p-2 sm:text-base sm:font-normal'>
					<div className='sm:border-r sm:border-COLORS-stroke_main sm:mr-2 sm:pr-2'>
						Total amount of training time:{' '}
					</div>
					<div className='font-bold sm:font-normal'>
						{formatTime(totalTime)}
					</div>
				</div>
			</div>
		</>
	)
}
