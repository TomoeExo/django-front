import { useMutation, useQueryClient } from '@tanstack/react-query'

import { workoutService } from '@/services/workout.service'

export function useCreateWorkout() {
	const queryClient = useQueryClient()

	const { mutate: createWorkout } = useMutation({
		mutationKey: ['create workout'],
		mutationFn: async (data: FormData) => {
			await workoutService.create(data)
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['workouts']
			})
		}
	})

	return { createWorkout }
}
