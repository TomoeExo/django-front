import { useMutation, useQueryClient } from '@tanstack/react-query'

import { workoutService } from '@/services/workout.service'

export function useDeleteWorkout() {
	const queryClient = useQueryClient()

	const { mutate: deleteWorkout } = useMutation({
		mutationKey: ['delete workout'],
		mutationFn: (workoutId: string) => workoutService.delete(workoutId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['workouts']
			})
		}
	})

	return { deleteWorkout }
}
