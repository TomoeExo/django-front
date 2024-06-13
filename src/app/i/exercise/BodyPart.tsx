import { Dumbbell } from 'lucide-react'
import React from 'react'

export const BodyPart: React.FC<any> = ({ item, bodyPart, setBodyPart }) => {
	return (
		<button
			onClick={() => {
				setBodyPart(item)
				window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' })
			}}
		>
			<div
				className='w-48 h-60 flex flex-col justify-center gap-5 rounded-2xl border border-COLORS-stroke_main p-5 mx-2'
				onClick={() => setBodyPart(item)}
			>
				<Dumbbell className='m-16' />
				<div className='text-lg font-bold capitalize text-center'>{item}</div>
			</div>
		</button>
	)
}
