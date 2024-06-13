'use client'

import { useParams } from 'next/navigation'

import { DoingWorkout } from './DoingWorkout'

export default function Workout() {
	const { id } = useParams() as { id: string }

	if (!id) {
		return <div>Loading...</div>
	}

	return <DoingWorkout workoutId={id} />
}
