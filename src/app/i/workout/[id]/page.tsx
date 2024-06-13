'use client'

import { useParams } from 'next/navigation'

import { WorkoutInfo } from './WorkoutInfo'

export default function Workout() {
	const { id } = useParams() as { id: string }

	if (!id) {
		return <div>Loading...</div>
	}

	return <WorkoutInfo workoutId={id} />
}
