import { useMutation, useQueryClient } from '@tanstack/react-query'

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
			formData: FormData
		}) => {
			return workoutService.update(workoutId, formData)
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['workouts'] })
		}
	})

	return { updateWorkout }
}
