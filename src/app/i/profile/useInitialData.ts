import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { TypeUserFormWithFile } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'

export function useInitialData(reset: UseFormReset<TypeUserFormWithFile>) {
	const { data, isSuccess } = useProfile()

	useEffect(() => {
		if (isSuccess && data) {
			reset({
				email: data?.email,
				username: data?.username,
				details: data?.details
			})
		}
	}, [isSuccess])

	return { data }
}
