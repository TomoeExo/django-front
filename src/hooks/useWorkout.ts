import { useQuery } from '@tanstack/react-query'

import { workoutService } from '@/services/workout.service'

export function useWorkout(workoutId: string) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['workout'],
		queryFn: () => workoutService.getWorkout(workoutId)
	})
	return { data, isLoading, isSuccess }
}
