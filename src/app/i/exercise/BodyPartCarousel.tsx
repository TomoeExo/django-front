import { useEffect, useState } from 'react'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel'

import { BodyPart } from './BodyPart'
import { ExerciseCard } from './ExerciseCard'
import { exerciseOptions, fetchData } from '@/lib/fetchData'

export function BodyPartCarousel({
	bodyPart,
	setBodyPart,
	isBodyParts,
	items
}: any) {
	const [data, setData] = useState<any[]>([])

	useEffect(() => {
		const fetchDataFromApi = async () => {
			try {
				if (isBodyParts) {
					const bodyPartsData = await fetchData(
						'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
						exerciseOptions
					)
					setData(['all', ...bodyPartsData])
				} else {
					setData(items)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchDataFromApi()
	}, [isBodyParts, items])

	return (
		<Carousel
			className={
				isBodyParts
					? 'ml-3 my-4 max-w-[1078px] w-full mb-16'
					: 'ml-3   max-w-[1400px] w-full mb-16'
			}
		>
			<CarouselContent>
				{data.map((item: any, index: any) => (
					<CarouselItem
						key={index}
						className={isBodyParts ? 'basis-1/4' : 'basis-1/3'}
					>
						{isBodyParts ? (
							<BodyPart
								item={item}
								bodyPart={bodyPart}
								setBodyPart={setBodyPart}
							/>
						) : (
							<ExerciseCard exercise={item} />
						)}
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
