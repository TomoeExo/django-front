import { useQuery } from '@tanstack/react-query'

import { workoutService } from '@/services/workout.service'

export function useWorkouts() {
	const { data, isLoading } = useQuery({
		queryKey: ['workouts'],
		queryFn: () => workoutService.getAll()
	})
	return { data, isLoading }
}
