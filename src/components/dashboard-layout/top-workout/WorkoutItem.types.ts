export interface WorkoutItemProps {
	data: any
	isLoading: boolean
}

export interface WorkoutContainerProps {
	workoutItemProps: WorkoutItemProps
	title: string
}
