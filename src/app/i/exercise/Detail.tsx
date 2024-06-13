export function Detail({ exerciseDetail }: any) {
	const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail

	const additions = [
		{
			icon: '/body-part.png',
			name: bodyPart
		},
		{
			icon: '/target.png',
			name: target
		},
		{
			icon: '/equipment.png',
			name: equipment
		}
	]

	return (
		<div className='flex justify-evenly mt-10 mb-20 2xl:flex-col 2xl:items-center sm:ml-2'>
			<div className='max-w-[900px] w-full flex flex-col gap-5 2xl:mt-10'>
				<div className='text-4xl font-medium capitalize sm:text-2xl'>
					{name}
				</div>
				<div className='text-2xl sm:text-xl'>
					{' '}
					Exercises keep you strong.{' '}
					<span className='capitalize underline'>{name}</span> bup is one of the
					best <br /> exercises to target your {target}. It will help you
					improve your <br /> mood and gain energy.
				</div>
				{additions.map((item: any, index: any) => (
					<div
						key={index}
						className='flex items-center gap-5'
					>
						<div className='bg-white p-2 rounded-2xl outline outline-2 outline-COLORS-stroke_main'>
							<img
								className='w-14 h-14'
								src={item.icon}
								alt={item.name}
							/>
						</div>
						<div className='text-xl capitalize font-medium'>{item.name}</div>
					</div>
				))}
			</div>
			<div className='max-w-[500px] max-h-[500px] w-full 2xl:-order-1'>
				<img
					className='w-full rounded-2xl outline outline-2 outline-COLORS-stroke_main'
					src={gifUrl}
					alt={name}
					loading='lazy'
				/>
			</div>
		</div>
	)
}
