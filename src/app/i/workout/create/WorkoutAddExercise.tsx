import { Button } from '@/components/ui/button'

interface IWorkoutAddExercise {
	addExercise: () => void
}

export function WorkoutAddExercise({ addExercise }: IWorkoutAddExercise) {
	return (
		<Button
			onClick={addExercise}
			variant='textVar'
		>
			Add Exercise...
		</Button>
	)
}
