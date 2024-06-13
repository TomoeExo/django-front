import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'

const CustomPagination = ({ currentPage, totalPages, onPageChange }: any) => {
	const pageNumbers = []
	const maxPageLinks = 3
	const halfPageLinks = Math.floor(maxPageLinks / 2)

	let startPage = Math.max(currentPage - halfPageLinks, 1)
	let endPage = Math.min(currentPage + halfPageLinks, totalPages)

	if (startPage === 1) {
		endPage = Math.min(maxPageLinks, totalPages)
	}

	if (endPage === totalPages) {
		startPage = Math.max(totalPages - maxPageLinks + 1, 1)
	}

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i)
	}

	return (
		<Pagination>
			<PaginationContent>
				{currentPage > 1 && (
					<PaginationItem>
						<PaginationPrevious
							href='#'
							onClick={e => {
								e.preventDefault()
								onPageChange(currentPage - 1)
							}}
						/>
					</PaginationItem>
				)}

				{startPage > 1 && (
					<PaginationItem>
						<PaginationLink
							className='bg-transparent text-white  hover:bg-transparent hover:text-white hover:outline  hover:outline-COLORS-stroke_main hover:outline-1'
							href='#'
							onClick={e => {
								e.preventDefault()
								onPageChange(1)
							}}
						>
							1
						</PaginationLink>
					</PaginationItem>
				)}

				{startPage > 2 && <PaginationEllipsis />}

				<PaginationItem>
					<PaginationLink
						className='bg-transparent text-white  hover:bg-transparent hover:text-white hover:outline  hover:outline-COLORS-stroke_main hover:outline-1'
						href='#'
						onClick={e => {
							e.preventDefault()
							onPageChange(currentPage)
						}}
						isActive={currentPage === currentPage}
					>
						{currentPage}
					</PaginationLink>
				</PaginationItem>

				{endPage < totalPages - 1 && <PaginationEllipsis />}

				{endPage < totalPages && (
					<PaginationItem>
						<PaginationLink
							className='bg-transparent text-white  hover:bg-transparent hover:text-white hover:outline  hover:outline-COLORS-stroke_main hover:outline-1'
							href='#'
							onClick={e => {
								e.preventDefault()
								onPageChange(totalPages)
							}}
						>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
				)}

				{currentPage < totalPages && (
					<PaginationItem>
						<PaginationNext
							href='#'
							onClick={e => {
								e.preventDefault()
								onPageChange(currentPage + 1)
							}}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	)
}

export default CustomPagination
