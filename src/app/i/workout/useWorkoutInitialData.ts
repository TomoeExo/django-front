// useWorkoutInitialData.ts
import { useEffect, useState } from 'react'
import { UseFormReset } from 'react-hook-form'

import { IWorkoutResponse, TypeWorkoutFormState } from '@/types/workout.types'

import { useWorkout } from '@/hooks/useWorkout'

export function useWorkoutInitialData(
	reset: UseFormReset<TypeWorkoutFormState>,
	workoutId: string
) {
	const { data: workoutData, isSuccess: isWorkoutSuccess } =
		useWorkout(workoutId)
	const [exerciseData, setExerciseData] = useState<
		IWorkoutResponse['exercises']
	>([])

	useEffect(() => {
		const fetchExerciseData = async () => {
			if (isWorkoutSuccess && workoutData) {
				try {
					const fetchedExercises = workoutData.exercises.map(
						(exercise: any) => {
							// Допустим, у вас уже есть данные упражнений в объекте exercise
							// В данном случае просто возвращаем exercise
							return exercise
						}
					)
					setExerciseData(fetchedExercises)
				} catch (error) {
					console.error('Error fetching exercises:', error)
				}
			}
		}

		fetchExerciseData()
	}, [isWorkoutSuccess, workoutData])

	useEffect(() => {
		if (workoutData && exerciseData.length > 0) {
			reset({
				title: workoutData.title,
				description: workoutData.description,
				exercises: exerciseData,
				level: workoutData.level,
				type: workoutData.type,
				duration: workoutData.duration,
				tags: workoutData.tags
			})
		}
	}, [workoutData, exerciseData, reset])

	return { workoutData, exerciseData }
}
