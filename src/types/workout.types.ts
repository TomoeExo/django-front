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
	is_favorite?: boolean
	completed?: boolean
	exercises: IExercise[]
	workout_img: File | string | null
}

export interface TypeWorkoutFormState {
	title: string
	description?: string
	level?: string
	type?: string[]
	duration?: number
	tags?: string[]
	is_favorite?: boolean
	completed?: boolean
	exercises: IExercise[]
	workout_img: File | string | null
}
