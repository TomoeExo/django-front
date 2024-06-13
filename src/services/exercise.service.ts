import { axiosWithAuth } from '@/api/interceptors'

export const exerciseService = {
	async getExercise() {
		const config = {
			headers: {
				'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
				'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
			}
		}
		try {
			const response = await axiosWithAuth.get(
				'https://exercisedb.p.rapidapi.com/exercises/bodyPartlist',
				config
			)

			return response.data
		} catch (error: any) {
			throw new Error(error.response?.data?.message || 'Error getting exercise')
		}
	}
}
