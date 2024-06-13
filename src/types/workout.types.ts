// types/workout.types.ts

export interface IExercise {
	title: string
	sets: number
	reps: number
}

export interface IWorkoutResponse {
	id: string
	title: string
	description?: string
	level?: string
	type: string[]
	duration?: number
	tags: string[]
	isFavorite?: boolean
	completed?: boolean
	exercises: IExercise[]
}

export interface TypeWorkoutFormState {
	title: string
	description?: string
	level?: string
	type?: string[]
	duration?: number
	tags?: string[]
	isFavorite?: boolean
	completed?: boolean
	exercises: IExercise[]
}
