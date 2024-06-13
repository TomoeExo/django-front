import { Heading } from '@/components/dashboard-layout/header/Heading'

import { BodyPartCarousel } from './BodyPartCarousel'

export function SimilarExercises({
	targetMuscleExercises,
	equipmentExercises
}: any) {
	return (
		<>
			<Heading title='Exercises that use the same equipment' />
			<div className='mb-20'>
				{equipmentExercises.length !== 0 ? (
					<BodyPartCarousel
						isBodyParts={false}
						items={equipmentExercises}
					/>
				) : (
					<div>Loading...</div>
				)}
			</div>
			<Heading title='Exercises that target the same muscle group' />
			<div className='mb-40'>
				{targetMuscleExercises.length !== 0 ? (
					<BodyPartCarousel
						isBodyParts={false}
						items={targetMuscleExercises}
					/>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</>
	)
}
