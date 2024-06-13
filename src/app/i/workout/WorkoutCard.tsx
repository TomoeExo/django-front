import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { TypeWorkoutFormState } from '@/types/workout.types'

import { useUpdateWorkout } from './hooks/useUpdateWorkout'

export const WorkoutCard: React.FC<any> = ({ item }) => {
	const [isFavorite, setIsFavorite] = useState(item.isFavorite)
	const { updateWorkout } = useUpdateWorkout()

	const handleFavoriteToggle = async (e: React.MouseEvent) => {
		e.preventDefault()
		const updatedData: Partial<TypeWorkoutFormState> = {
			...item,
			isFavorite: !isFavorite
		}
		updateWorkout({ workoutId: item.id, formData: updatedData })
		setIsFavorite(!isFavorite)
	}

	return (
		<Link
			href={`/i/workout/${item.id}`}
			className='flex flex-col p-5 border border-COLORS-stroke_main rounded-2xl max-w-[350px] max-h-[370px] w-full'
		>
			<div className='relative max-w-[308px] max-h-[205px] w-full outline rounded-2xl outline-1 h-[205px] mb-5'>
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
				<button
					onClick={handleFavoriteToggle}
					className='outline outline-1 absolute rounded-full p-2 bg-white right-3 top-3 hover:opacity-80 hover:outline transition-opacity duration-300'
				>
					<Heart className={isFavorite ? 'text-red-500' : 'text-gray-500'} />
				</button>
			</div>
			<h1 className='font-bold text-lg'>{item.title || 'Title'}</h1>
			<p className='text-sm text-COLORS-placeholder'>
				{item.type?.join(', ') || 'Type'}
			</p>
			<div className='flex items-center justify-between mt-5'>
				<div className='font-bold'>Time: {item.duration} min.</div>
				<Button
					variant='workoutItem'
					className='px-8 py-2'
				>
					Start
				</Button>
			</div>
		</Link>
	)
}
