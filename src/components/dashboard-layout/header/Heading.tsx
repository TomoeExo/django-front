interface IHeading {
	title: string
}

export function Heading({ title }: IHeading) {
	return (
		<div>
			<h1 className='text-2xl font-bold mx-10 mt-10 mb-5 sm:text-xl sm:font-medium'>
				{title}
			</h1>
		</div>
	)
}
