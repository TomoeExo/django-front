'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useWorkout } from '@/hooks/useWorkout'

import { useDeleteWorkout } from './useDeleteWorkout'

export function WorkoutInfo({ workoutId }: { workoutId: string }) {
	const router = useRouter()
	const { deleteWorkout, isDeletePending } = useDeleteWorkout()
	const { data, isLoading } = useWorkout(workoutId)

	const handleDelete = async () => {
		try {
			await deleteWorkout(workoutId)
			router.push('/i')
		} catch (error) {
			console.error('Failed to delete workout:', error)
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
						<div className='flex sm:flex-col'>
							<h1 className='text-4xl font-bold capitalize mb-4 sm:text-2xl'>
								{data?.title}
							</h1>
							<div className='flex gap-4 items-center ml-20 sm:-order-1 sm:ml-0 sm:my-3'>
								<Link
									className='bg-[#DB6900] px-6 py-3 hover:bg-transparent hover:outline hover:outline-1 hover:outline-[#DB6900] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 '
									href={`/i/workout/update/${workoutId}`}
								>
									Change
								</Link>
								<Button
									variant='delete'
									className='px-6 py-3 '
									onClick={handleDelete}
									disabled={isDeletePending}
								>
									Delete
								</Button>
							</div>
						</div>
						<div className='text-2xl mb-8 sm:text-xl'>{data?.description}</div>
						<div className='flex gap-6 mb-4 sm:gap-3 sm:mb-3 sm:flex-col'>
							<div className=' px-5 py-3 rounded-md outline outline-1 outline-COLORS-stroke_main font-medium'>
								{data?.level}
							</div>
							<div className='px-5 py-3 rounded-md outline outline-1 outline-COLORS-stroke_main font-medium'>
								{data?.type}
							</div>
							<div className='px-5 py-3 rounded-md outline outline-1 outline-COLORS-stroke_main font-medium'>
								{data?.duration} min.
							</div>
						</div>
						<div className='flex flex-col gap-4 sm:gap-2'>
							{data?.exercises.map((exercise, index) => (
								<div
									key={index}
									className='flex gap-4 sm:gap-2'
								>
									<div className='max-w-[570px] w-full px-5 py-3 rounded-md outline outline-1 outline-COLORS-stroke_main font-medium'>
										{exercise.title}
									</div>
									<div className='max-w-24 w-full text-center  py-3 rounded-md outline outline-1 outline-COLORS-stroke_main font-medium sm:items-center sm:justify-center sm:flex'>
										{exercise.sets}x{exercise.reps}
									</div>
								</div>
							))}
						</div>
						<div className='mt-4 px-5 py-3 rounded-md outline outline-1 outline-COLORS-stroke_main font-medium sm:mt-2'>
							#{data?.tags}
						</div>
						<Link
							className='mt-8 bg-green-700 text-white px-6 py-3 hover:bg-transparent hover:text-white hover:outline hover:outline-1 hover:outline-white/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 '
							href={`/i/workout/doing/${workoutId}`}
						>
							{`Start ${data?.title}` || 'Start'}
						</Link>
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
