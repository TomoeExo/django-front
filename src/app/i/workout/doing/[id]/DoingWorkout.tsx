'use client'

import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useCreateCompletedWorkout } from '@/hooks/useCompletedWorkouts'
import { useWorkout } from '@/hooks/useWorkout'

export function DoingWorkout({ workoutId }: { workoutId: string }) {
	console.log('workoutId: ', workoutId)

	const { data, isLoading } = useWorkout(workoutId)
	console.log(JSON.stringify(data, null, 2))

	const {
		create: completeWorkout,
		loading: completing,
		error: completeError
	} = useCreateCompletedWorkout()
	const [completedExercises, setCompletedExercises] = useState<boolean[]>([])
	const [time, setTime] = useState(0)
	const [isRunning, setIsRunning] = useState(false)
	const workoutCompleted = useRef(false)

	useEffect(() => {
		if (data?.exercises) {
			setCompletedExercises(new Array(data.exercises.length).fill(false))
		}
	}, [data])

	useEffect(() => {
		let interval: any
		if (isRunning) {
			interval = setInterval(() => {
				setTime(prevTime => prevTime + 1)
			}, 1000)
		} else if (!isRunning && time !== 0) {
			clearInterval(interval)
		}
		return () => clearInterval(interval)
	}, [isRunning, time])

	const handleExerciseComplete = (index: number) => {
		setCompletedExercises(prev => {
			const newCompleted = [...prev]
			newCompleted[index] = !newCompleted[index]

			if (
				newCompleted.every(completed => completed) &&
				!workoutCompleted.current
			) {
				workoutCompleted.current = true
				setIsRunning(false)
				handleWorkoutComplete()
			}

			return newCompleted
		})
	}

	const handleWorkoutComplete = async () => {
		await completeWorkout(workoutId, time)
		alert('Workout Completed!')
	}

	const handleCompleteButtonClick = async () => {
		setIsRunning(false)
		if (!workoutCompleted.current) {
			workoutCompleted.current = true
			await handleWorkoutComplete()
		}
	}

	return (
		<>
			<DashboardHeader
				title='Workout Info'
				description='Detailed information about the training'
			/>
			{isLoading ? (
				<div className='flex flex-row justify-evenly my-10'>
					<div className='flex flex-col gap-2'>
						<Skeleton className='h-10 w-[500px] rounded-md' />
						<Skeleton className='h-8 w-[500px]' />
						<div className='flex gap-6 mb-4 mt-4'>
							<Skeleton className='h-12 w-24' />
							<Skeleton className='h-12 w-24' />
							<Skeleton className='h-12 w-24' />
						</div>
						<div className='flex gap-4'>
							<Skeleton className='h-12 w-96' />
							<Skeleton className='h-12 w-24' />
						</div>
						<div className='flex gap-4'>
							<Skeleton className='h-12 w-96' />
							<Skeleton className='h-12 w-24' />
						</div>
						<Skeleton className='h-12 w-[500px]' />
						<Skeleton className='h-10 w-32' />
					</div>

					<Skeleton className='h-72 w-96 rounded-2xl mt-8' />
				</div>
			) : (
				<div className='flex flex-row justify-evenly my-10 xl:flex-col xl:items-center'>
					<div className='sm:m-2'>
						<div className='flex flex-row sm:flex-col'>
							<div>
								<h1 className='text-4xl font-bold capitalize mb-4 sm:text-2xl'>
									{data?.title}
								</h1>
								<div className='text-2xl mb-8 sm:text-xl'>
									{data?.description}
								</div>
							</div>
							<div className='flex gap-4  ml-28 sm:-order-1 sm:ml-0 sm:my-3 rounded-md '>
								<div className='flex flex-col items-center gap-2'>
									<span className='text-3xl font-medium'>{`${Math.floor(
										time / 60
									)
										.toString()
										.padStart(2, '0')}:${(time % 60)
										.toString()
										.padStart(2, '0')}`}</span>
									<Button
										onClick={() => setIsRunning(!isRunning)}
										className=''
										variant='trash'
										size='trash'
									>
										{isRunning ? <Pause /> : <Play />}
									</Button>
								</div>
							</div>
						</div>

						<div className='flex gap-6 mb-4 sm:gap-3 sm:mb-3 sm:flex-col'>
							<div className=' px-5 py-3 rounded-md border border-COLORS-stroke_main font-medium'>
								{data?.level}
							</div>
							<div className='px-5 py-3 rounded-md border border-COLORS-stroke_main font-medium'>
								{data?.type}
							</div>
							<div className='px-5 py-3 rounded-md border border-COLORS-stroke_main font-medium'>
								{data?.duration} min.
							</div>
						</div>
						<div className='flex flex-col gap-4 sm:gap-2'>
							{data?.exercises.map((exercise: any, index) => (
								<div
									key={index}
									className='flex gap-4 sm:gap-2'
								>
									<div
										className={`flex gap-4 ${
											completedExercises[index]
												? 'border-green-500 text-white/30'
												: 'border-COLORS-stroke_main'
										} max-w-[570px] w-full px-5 py-3 rounded-md border  font-medium`}
									>
										<div className='w-full border-r border-COLORS-stroke_main pr-2'>
											{exercise.title}
										</div>
										<div className='text-center sm:flex sm:items-center'>
											{exercise.sets}x{exercise.reps}
										</div>
									</div>
									<Button
										variant='trash'
										size='trash'
										className='px-5 py-3 rounded-md border border-COLORS-stroke_main sm:px-2 sm:py-0'
										onClick={() => handleExerciseComplete(index)}
									>
										{completedExercises[index] ? 'Undo' : 'Completed'}
									</Button>
								</div>
							))}
						</div>
						<div className='mt-4 px-5 py-3 rounded-md border border-COLORS-stroke_main font-medium'>
							#{data?.tags}
						</div>
						<Button
							className='mt-8 bg-green-700 text-white px-6 py-3 hover:bg-transparent hover:text-white hover:outline hover:outline-1 hover:outline-white/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 '
							onClick={handleCompleteButtonClick}
						>
							Completed
						</Button>
					</div>

					<div className='max-w-96 h-72 w-full  mt-8 bg-transparent text-COLORS-bg_color_app rounded-2xl border-2 border-COLORS-stroke_main xl:-order-1 xl:mb-4 sm:ml-2'>
						<div className='relative flex items-center justify-center w-full h-full '>
							<img
								src='/trainwell-white.png'
								alt='TrainWell'
								className='relative z-10 opacity-50'
							/>
							<div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
								<div className='absolute w-[60%] h-[60%] bg-gradient-to-r from-[#BECE4E] to-[#569C49] opacity-50 blur-2xl rounded-2xl'></div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
