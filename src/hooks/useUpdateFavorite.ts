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
			// Создаем экземпляр FormData
			const formData = new FormData()

			// Заполняем FormData данными
			formData.append('is_favorite', JSON.stringify(data.is_favorite))
			formData.append('title', data.title)
			if (data.description) formData.append('description', data.description)
			if (data.level) formData.append('level', data.level)
			if (data.type) formData.append('type', JSON.stringify(data.type))
			if (data.duration) formData.append('duration', data.duration.toString())
			if (data.tags) formData.append('tags', JSON.stringify(data.tags))
			if (data.completed)
				formData.append('completed', JSON.stringify(data.completed))
			if (data.exercises)
				formData.append('exercises', JSON.stringify(data.exercises))
			if (data.workout_img) {
				if (typeof data.workout_img === 'string') {
					// Если workout_img уже является строкой (например, URL)
					formData.append('workout_img', data.workout_img)
				} else {
					// Если это файл
					formData.append('workout_img', data.workout_img)
				}
			}

			// Отправляем данные на сервер
			await workoutService.update(workoutId, formData)
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
