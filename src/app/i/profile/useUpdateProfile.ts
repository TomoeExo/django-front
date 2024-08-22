import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/components/ui/use-toast'

import { TypeUserFormWithFile } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export function useUpdateProfile() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: async (data: TypeUserFormWithFile | FormData) => {
			if (data instanceof FormData) {
				// Если данные в формате FormData, отправляем их напрямую
				return await userService.update(data)
			} else {
				// Если данные в формате TypeUserFormWithFile, отправляем как обычный объект
				const { details, ...rest } = data

				const updatedData = {
					...rest,
					details: {
						...details
					}
				}

				return await userService.update(updatedData)
			}
		},
		onSuccess() {
			toast({
				description: 'Successfully updated profile!'
			})
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	return { mutate, isPending }
}
