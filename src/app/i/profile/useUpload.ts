import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { FileService } from '@/services/file.service'

type TypeUpload = (
	onChange: (url: string) => void,
	folder?: string
) => {
	uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => FileService.upload(data, folder),
		onSuccess({ data }) {
			onChange(data.url)
		}
	})

	const uploadImage = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const file = e.target.files
			if (file) {
				const formData = new FormData()
				formData.append('file', file[0])
				await mutateAsync(formData)

				setTimeout(() => {
					setIsLoading(false)
				}, 1000)
			}
			setIsLoading(false)
		},
		[mutateAsync]
	)

	return useMemo(() => ({ uploadImage, isLoading }), [uploadImage, isLoading])
}
