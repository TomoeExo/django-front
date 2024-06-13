import Link from 'next/link'

export function ExerciseCard({ exercise }: any) {
	return (
		<Link
			href={`/i/exercise/${exercise.id}`}
			className='flex flex-col min-w-72 max-w-[402px] w-full p-5 rounded-2xl border border-COLORS-stroke_main sm:p-3'
		>
			<img
				className='rounded-2xl outline outline-2 outline-COLORS-stroke_main'
				src={exercise.gifUrl}
				alt={exercise.name}
				loading='lazy'
			/>
			<div className='mt-5 font-bold text-lg capitalize sm:text-base sm:mt-2'>
				{exercise.name}
			</div>
			<div className='flex gap-3 mt-3'>
				<div className='capitalize text-base font-medium rounded-lg outline outline-1 outline-COLORS-stroke_main px-3 py-1 sm:text-sm'>
					{exercise.bodyPart}
				</div>
				<div className='capitalize text-base font-medium rounded-lg outline outline-1 outline-COLORS-stroke_main px-3 py-1 sm:text-sm'>
					{exercise.target}
				</div>
			</div>
		</Link>
	)
}
