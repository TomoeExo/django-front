import { IFile } from '@/types/file.types'

import { axiosWithAuth } from '@/api/interceptors'

export const FileService = {
	async upload(file: FormData, folder?: string) {
		const config = {
			params: {
				folder
			},
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
		try {
			const response = await axiosWithAuth.post<IFile>(
				'/user/files',
				file,
				config
			)
			return response
		} catch (error: any) {
			throw new Error(error.response?.data?.message || 'Error uploading file')
		}
	}
}
