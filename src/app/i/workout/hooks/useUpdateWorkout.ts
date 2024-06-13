import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeWorkoutFormState } from '@/types/workout.types'

import { workoutService } from '@/services/workout.service'

export function useUpdateWorkout() {
	const queryClient = useQueryClient()

	const { mutate: updateWorkout } = useMutation({
		mutationKey: ['update workout'],
		mutationFn: ({
			workoutId,
			formData
		}: {
			workoutId: string
			formData: Partial<TypeWorkoutFormState>
		}) => {
			return workoutService.update(workoutId, formData)
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['workouts'] })
		}
	})

	return { updateWorkout }
}
