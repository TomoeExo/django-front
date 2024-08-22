import { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`user/${type}/`,
			data
		)

		if (response.data.access) {
			saveTokenStorage(response.data.access)
		}

		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'user/token/refresh/'
		)
		if (response.data.access) {
			saveTokenStorage(response.data.access)
		}

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('user/logout/')
		if (response.data) removeFromStorage()

		return response
	}
}
