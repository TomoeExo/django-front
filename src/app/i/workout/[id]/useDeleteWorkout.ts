import { useMutation, useQueryClient } from '@tanstack/react-query'

import { workoutService } from '@/services/workout.service'

export function useDeleteWorkout() {
	const queryClient = useQueryClient()

	const { mutate: deleteWorkout, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete workout'],
		mutationFn: (id: string) => workoutService.delete(id)
	})
	return { deleteWorkout, isDeletePending }
}
