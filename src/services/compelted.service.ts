// services/completedService.ts
import { axiosWithAuth } from '@/api/interceptors'

class CompletedService {
	private BASE_URL = '/user/workout/completed'

	async create(workoutId: string, totalSeconds: number) {
		const response = await axiosWithAuth.post(this.BASE_URL, {
			workoutId,
			totalSeconds
		})
		return response.data
	}

	async getAll() {
		const response = await axiosWithAuth.get(this.BASE_URL)
		return response.data
	}

	async getByWorkout(workoutId: string) {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/${workoutId}`)
		return response.data
	}
}

export const completedService = new CompletedService()
