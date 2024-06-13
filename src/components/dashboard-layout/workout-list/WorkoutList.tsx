import { WorkoutItemProps } from '../top-workout/WorkoutItem.types'

import { ItemList } from './ItemList'

export function WorkoutList({ data, isLoading }: WorkoutItemProps) {
	return (
		<>
			<ItemList
				data={data}
				isLoading={isLoading}
			/>
		</>
	)
}
