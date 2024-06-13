import { Heading } from '@/components/dashboard-layout/header/Heading'

export function ExerciseVideos({ exerciseVideos, name }: any) {
	return (
		<>
			<Heading title={`Watch ${name} exercise videos`} />
			<div className='flex ml-5 gap-5 mb-20 xl:flex-col xl:items-center xl:ml-0 sm:ml-2'>
				{exerciseVideos?.slice(0, 3).map((item: any, index: any) => (
					<a
						className='max-w-[392px] w-full p-5 rounded-2xl border border-COLORS-stroke_main sm:p-3'
						href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
						key={index}
						target='_blank'
						rel='noreferrer'
					>
						<img
							className='rounded-2xl outline outline-2 outline-COLORS-stroke_main'
							src={item.video.thumbnails[0].url}
							alt={item.video.title}
						/>
						<div className='flex gap-3 mt-3 flex-col'>
							<div className='mt-5 font-bold text-lg capitalize sm:text-base sm:mt-2'>
								{item.video.title}
							</div>
							<div className='capitalize text-base font-medium  underline px-3 text-end sm:text-sm'>
								{item.video.channelName}
							</div>
						</div>
					</a>
				))}
			</div>
		</>
	)
}
