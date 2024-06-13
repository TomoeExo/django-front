import { useQuery } from '@tanstack/react-query'

import { exerciseService } from '@/services/exercise.service'

export function useSearchExercise() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['exercise'],
		queryFn: () => exerciseService.getExercise()
	})
	return { data, isLoading, isSuccess }
}
