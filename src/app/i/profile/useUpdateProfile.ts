import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/components/ui/use-toast'

import { TypeUserForm } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export function useUpdateProfile() {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: async (data: TypeUserForm) => {
			const { details, ...rest } = data

			const updatedData = {
				...rest,
				...details
			}

			await userService.update(updatedData)
		},
		onSuccess() {
			toast({
				description: 'Successfully update profile!'
			})
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	return { mutate, isPending }
}
