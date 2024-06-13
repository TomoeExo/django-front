import { Button } from '../ui/button'

export function BannerExerciseContent() {
	return (
		<div className='max-w-[480px] text-white/80'>
			<h1 className='font-bold text-3xl leading-10 mb-3 sm:text-xl'>
				Эффективные упражнения для всех уровней подготовки.
			</h1>
			<p className='font-medium leading-7 sm:hidden'>
				Найдите упражнения, которые соответствуют вашему уровню подготовки и
				помогают достигать ваших фитнес-целей.
			</p>

			<div className='gap-10 flex mt-10'>
				<Button
					onClick={e => {}}
					variant='link'
					size='trash'
					className='text-white/80 font-medium text-lg '
				>
					Show all
				</Button>
			</div>
		</div>
	)
}
