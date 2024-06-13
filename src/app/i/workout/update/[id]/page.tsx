'use client'

import { useParams } from 'next/navigation'

import { WorkoutUpdate } from './WorkoutUpdate'

export default function Workout() {
	const { id } = useParams() as { id: string }

	if (!id) {
		return <div>Loading...</div>
	}

	return <WorkoutUpdate workoutId={id} />
}
