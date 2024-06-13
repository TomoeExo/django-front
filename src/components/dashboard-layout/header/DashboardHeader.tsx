'use client'

interface IHeading {
	title: string
	description: string
}

export function DashboardHeader({ title, description }: IHeading) {
	return (
		<div className='bg-[#0D0F10] rounded-2xl py-5 px-12 flex justify-between items-center'>
			<div>
				<h1 className='text-white/80 font-bold text-2xl'>{title}</h1>
				<p className='text-COLORS-placeholder font-medium'>{description}</p>
			</div>
		</div>
	)
}
