'use client'

import { useState } from 'react'

import { BannerExercise } from '@/components/banner-exercise/BannerExercise'
import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'

import { BodyPartCarousel } from './BodyPartCarousel'
import { Exercises } from './Exercises'
import { SearchExercises } from './SearchExercises'

export function ExercisePage() {
	const [exercises, setExercises] = useState<any>([])
	const [bodyPart, setBodyPart] = useState('all')

	return (
		<>
			<DashboardHeader
				title='Exercise'
				description='Welcome to exercise page'
			/>

			<BannerExercise />

			<SearchExercises setExercises={setExercises} />

			<BodyPartCarousel
				bodyPart={bodyPart}
				setBodyPart={setBodyPart}
				isBodyParts={true}
			/>

			<Exercises
				exercises={exercises}
				setExercises={setExercises}
				bodyPart={bodyPart}
			/>
		</>
	)
}
