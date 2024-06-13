import Link from 'next/link'

import { TopWorkoutItem } from './TopWorkoutItem'
import { WorkoutContainerProps } from './WorkoutItem.types'

interface UpdatedWorkoutContainerProps extends WorkoutContainerProps {
	linkHref: string
	isFavorite: boolean
}

export function TopWorkoutContainer({
	workoutItemProps,
	title,
	linkHref,
	isFavorite
}: UpdatedWorkoutContainerProps) {
	const { data, isLoading } = workoutItemProps
	return (
		<div className='max-w-md p-5 w-full outline outline-1 outline-COLORS-stroke_main rounded-2xl mt-2 text-white/80'>
			<div className='flex items-center justify-between mb-5'>
				<h1 className='capitalize text-xl font-bold'>{title}</h1>
				<Link
					href={linkHref}
					className='underline-offset-4 hover:underline px-4'
				>
					See all
				</Link>
			</div>
			<TopWorkoutItem
				isFavorite={isFavorite}
				data={data}
				isLoading={isLoading}
			/>
		</div>
	)
}
