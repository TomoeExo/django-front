import Link from 'next/link'

import { Skeleton } from '@/components/ui/skeleton'

import { WorkoutItemProps } from './WorkoutItem.types'

export function TopWorkoutItem({
	isFavorite,
	data,
	isLoading
}: WorkoutItemProps & { isFavorite: boolean }) {
	console.log('data: ', data)

	if (isLoading) {
		return (
			<div className='flex gap-5'>
				<Skeleton className='h-16 w-20 rounded-md' />
				<div className='flex flex-col items-center justify-between w-full'>
					<Skeleton className='h-7 w-[308px]' />
					<Skeleton className='h-5 w-[308px]' />
				</div>
			</div>
		)
	}
	if (!data) {
		return <div>No favorite workout found</div>
	}

	return (
		<div>
			{isLoading ? (
				<div className='flex gap-5'>
					<Skeleton className='h-16 w-20 rounded-md' />
					<div className='flex flex-col items-center justify-between w-full'>
						<Skeleton className='h-7 w-[308px]' />
						<Skeleton className='h-5 w-[308px]' />
					</div>
				</div>
			) : (
				<div className='flex flex-col gap-5'>
					{data.map((favorite: any, index: number) => (
						<Link
							href='/'
							key={index}
							className='flex items-center w-[408px] sm:w-auto hover:outline hover:outline-1 hover:outline-COLORS-stroke_main rounded-md p-5 justify-start bg-COLORS-bg_color_app text-white/80 gap-5'
						>
							<div className='outline-1 outline outline-blue-50 w-20 h-16 flex items-center justify-center rounded-md sm:hidden'>
								{isFavorite
									? favorite?.title?.charAt(0) || 'A'
									: favorite.workout?.title?.charAt(0) || 'A'}
							</div>
							<div className='flex items-center justify-between w-full sm:gap-5'>
								<div>
									<p className='text-lg font-medium'>
										{isFavorite
											? favorite?.title || 'Workout'
											: favorite.workout?.title || 'Workout'}
									</p>
									<p className='font-medium text-sm sm:hidden'>
										{isFavorite
											? favorite?.type?.join(', ') || 'Type'
											: favorite.workout?.type?.join(', ') || 'Type'}
									</p>
								</div>
								<p className='min-w-20 flex justify-end sm:min-w-0'>
									{isFavorite
										? `${favorite?.duration} min.`
										: `${Math.round(favorite?.totalSeconds / 60)} min.`}
								</p>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
