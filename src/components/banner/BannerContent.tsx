import Link from 'next/link'

export function BannerContent() {
	return (
		<div className='max-w-[420px] text-white'>
			<h1 className='font-bold text-3xl leading-10 mb-3 sm:text-2xl'>
				Путь к здоровью и силе начинается с тренировок.
			</h1>
			<p className='font-medium leading-7 '>
				Превращай мечты в реальность шаг за шагом!
			</p>

			<div className='gap-10 flex mt-10'>
				<Link
					className='bg-white/80 text-COLORS-bg_color_app rounded-xl hover:bg-transparent hover:text-white/80 hover:outline transition-all hover:outline-white/80 hover:outline-1 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background h-10 px-4 py-2'
					href='/i/workout/create'
				>
					Create workout
				</Link>
				<Link
					href='/i/workout/all'
					className='text-white/80 items-center flex underline-offset-4 hover:underline'
				>
					Show all
				</Link>
			</div>
		</div>
	)
}
