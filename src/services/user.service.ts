import { IUser, TypeUserFormWithFile } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

class UserService {
	private BASE_URL = '/user/profile/'

	async getProfile() {
		const response = await axiosWithAuth.get<IUser>(this.BASE_URL)
		return response.data
	}

	async update(data: FormData | TypeUserFormWithFile) {
		let config = {}
		if (data instanceof FormData) {
			config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		}

		const response = await axiosWithAuth.put(this.BASE_URL, data, config)
		return response.data
	}
}

export const userService = new UserService()
