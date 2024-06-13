import { ChangeEvent, FC, useEffect, useState } from 'react'

import SearchField from '@/components/ui/search-field/SearchField'

import { cn } from '@/lib/utils'

interface SearchProps {
	className?: string
	placeholder?: string
	onSearch: (searchTerm: string) => void
	onClick?: () => void
}

const Search: FC<SearchProps> = ({
	className = '',
	placeholder = 'Search...',
	onSearch,
	onClick
}) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value.toLowerCase()
		setSearchTerm(term)
	}

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm)
		}, 1500)

		return () => {
			clearTimeout(handler)
		}
	}, [searchTerm])

	useEffect(() => {
		if (debouncedSearchTerm) {
			onSearch(debouncedSearchTerm)
		}
	}, [debouncedSearchTerm, onSearch])

	return (
		<div className={cn('relative', className)}>
			<SearchField
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				placeholder={placeholder}
				onClick={onClick}
			/>
		</div>
	)
}

export default Search
