// services/completedService.ts
import { axiosWithAuth } from '@/api/interceptors'

export interface IWorkoutCompleted {
	workout: string
	total_seconds: number
	completed_at: string
}

class CompletedService {
	private BASE_URL = '/user/workout/workout_completed/'

	async create(workoutCompleted: IWorkoutCompleted) {
		const response = await axiosWithAuth.post(
			`${this.BASE_URL}create/`,
			workoutCompleted
		)
		return response.data
	}
	async getAll() {
		const response = await axiosWithAuth.get(this.BASE_URL)
		return response.data
	}

	async getByWorkout(workoutId: string) {
		const response = await axiosWithAuth.get(`${this.BASE_URL}${workoutId}`)
		return response.data
	}
}

export const completedService = new CompletedService()
