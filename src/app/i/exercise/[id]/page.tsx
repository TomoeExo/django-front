'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'

import { Detail } from '../Detail'
import { ExerciseVideos } from '../ExerciseVideos'
import { SimilarExercises } from '../SimilarExercises'

import { exerciseOptions, fetchData, youtubeOptions } from '@/lib/fetchData'

export default function ExerciseId() {
	const [exerciseDetail, setExerciseDetail] = useState<any>({})
	const [exerciseVideos, setExerciseVideos] = useState([])
	const [targetMuscleExercises, setTargetMuscleExercises] = useState([])
	const [equipmentExercises, setEquipmentExercises] = useState([])
	const { id } = useParams()

	useEffect(() => {
		const fetchExercisesData = async () => {
			const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
			const youtubeSearchUrl =
				'https://youtube-search-and-download.p.rapidapi.com'
			const exerciseDetailData = await fetchData(
				`${exerciseDbUrl}/exercises/exercise/${id}`,
				exerciseOptions
			)
			setExerciseDetail(exerciseDetailData)

			const exerciseVideosData = await fetchData(
				`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
				youtubeOptions
			)
			setExerciseVideos(exerciseVideosData.contents)

			const targetMuscleExercisesData = await fetchData(
				`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
				exerciseOptions
			)
			setTargetMuscleExercises(targetMuscleExercisesData)

			const equipmentExercisesData = await fetchData(
				`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
				exerciseOptions
			)
			setEquipmentExercises(equipmentExercisesData)
		}
		fetchExercisesData()
	}, [id])

	if (!exerciseDetail) return <div>No Data</div>
	return (
		<>
			<DashboardHeader
				title='Exercise details'
				description='Welcome to exercise details page'
			/>
			<Detail exerciseDetail={exerciseDetail} />
			<ExerciseVideos
				exerciseVideos={exerciseVideos}
				name={exerciseDetail.name}
			/>
			<SimilarExercises
				targetMuscleExercises={targetMuscleExercises}
				equipmentExercises={equipmentExercises}
			/>
		</>
	)
}
