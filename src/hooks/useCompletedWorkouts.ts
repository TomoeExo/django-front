// hooks/useCompletedWorkouts.ts
import { useEffect, useState } from 'react'

import { completedService } from '@/services/compelted.service'

export const useCreateCompletedWorkout = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const create = async (workoutId: string, totalSeconds: number) => {
		setLoading(true)
		try {
			await completedService.create(workoutId, totalSeconds)
		} catch (err: any) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return { create, loading, error }
}

export const useGetAllCompletedWorkouts = () => {
	const [workouts, setWorkouts] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchWorkouts = async () => {
			setLoading(true)
			try {
				const data = await completedService.getAll()
				setWorkouts(data)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchWorkouts()
	}, [])

	return { workouts, loading, error }
}

export const useGetCompletedWorkoutsByWorkout = (workoutId: string) => {
	const [workouts, setWorkouts] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchWorkouts = async () => {
			setLoading(true)
			try {
				const data = await completedService.getByWorkout(workoutId)
				setWorkouts(data)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchWorkouts()
	}, [workoutId])

	return { workouts, loading, error }
}
