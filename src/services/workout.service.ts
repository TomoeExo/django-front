import { IWorkoutResponse } from '@/types/workout.types'

import { axiosWithAuth } from '@/api/interceptors'

class WorkoutService {
	private BASE_URL = '/user/workout/'

	async getAll() {
		const response = await axiosWithAuth.get(this.BASE_URL)
		return response.data
	}

	async getWorkout(workoutId: string) {
		try {
			const response = await axiosWithAuth.get<IWorkoutResponse>(
				`${this.BASE_URL}${workoutId}`
			)
			return response.data
		} catch (error) {
			console.error('Error fetching workout:', error)
			throw new Error('Failed to fetch workout')
		}
	}

	async create(data: FormData) {
		try {
			const response = await axiosWithAuth.post(this.BASE_URL, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			return response.data
		} catch (error) {
			console.error('Error creating workout:', error)
			throw new Error('Failed to create workout')
		}
	}

	async update(workoutId: string, data: FormData) {
		try {
			const response = await axiosWithAuth.put(
				`${this.BASE_URL}${workoutId}/`,
				data,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
			return response.data
		} catch (error) {
			console.error('Error updating workout:', error)
			throw new Error('Failed to update workout')
		}
	}

	async delete(workoutId: string) {
		try {
			const response = await axiosWithAuth.delete(
				`${this.BASE_URL}${workoutId}`
			)
			return response.data
		} catch (error) {
			console.error('Error deleting workout:', error)
			throw new Error('Failed to delete workout')
		}
	}
}

export const workoutService = new WorkoutService()
