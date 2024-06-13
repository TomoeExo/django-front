import { Search } from 'lucide-react'
import { ChangeEvent, FC } from 'react'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	onClick?: () => void
}

const SearchField: FC<ISearchField> = ({
	handleSearch,
	searchTerm,
	placeholder,
	onClick
}) => {
	return (
		<div className='flex items-center bg-transparent border  border-COLORS-stroke_main rounded-md px-5 py-3'>
			<input
				name='search'
				className='flex-1 bg-transparent focus:outline-none'
				placeholder={placeholder}
				value={searchTerm}
				onChange={handleSearch}
			/>
			<button
				className='cursor-pointer text-white/80'
				onClick={onClick}
			>
				<Search />
			</button>
		</div>
	)
}

export default SearchField
