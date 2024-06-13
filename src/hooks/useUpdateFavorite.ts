import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/components/ui/use-toast'

import { TypeWorkoutFormState } from '@/types/workout.types'

import { workoutService } from '@/services/workout.service'

interface UpdateFavoriteParams {
	workoutId: string
	data: TypeWorkoutFormState
}

export function useUpdateFavorite() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update favorite'],
		mutationFn: async ({ workoutId, data }: UpdateFavoriteParams) => {
			console.log(JSON.stringify(data, null, 2))
			const { isFavorite, ...rest } = data
			const updateData = { ...rest, isFavorite }
			console.log('Updating workout with data:', updateData) // Логирование данных
			await workoutService.update(workoutId, updateData)
		},
		onSuccess() {
			toast({
				description: 'Successfully updated favorite status!'
			})
			queryClient.invalidateQueries({ queryKey: ['workouts'] })
		},
		onError(error) {
			console.error('Failed to update favorite status:', error) // Логирование ошибки
			toast({
				description: `Failed to update favorite status: ${error}`
			})
		}
	})

	return { mutate, isPending }
}
