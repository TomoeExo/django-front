import { useQuery } from '@tanstack/react-query'

import { completedService } from '@/services/compelted.service'

export function useCompleted() {
	const { data, isLoading } = useQuery({
		queryKey: ['completed'],
		queryFn: () => completedService.getAll()
	})
	return { data, isLoading }
}
