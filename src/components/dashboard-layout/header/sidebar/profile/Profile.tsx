import { Skeleton } from '@/components/ui/skeleton'

import { useProfile } from '@/hooks/useProfile'

import { LogoutButton } from './LogoutButton'

export function Profile() {
	const { data, isLoading } = useProfile()
	if (isLoading) {
		return (
			<div className='flex items-center  outline outline-1 outline-COLORS-stroke_main rounded-md px-3 py-3 justify-start bg-COLORS-bg_color_app text-white/80 gap-3'>
				<Skeleton className='h-12 w-16 rounded-md' />
				<div className='flex flex-col w-full gap-1'>
					<Skeleton className='h-6 w-44' />
					<Skeleton className='h-4 w-44' />
				</div>
			</div>
		)
	}
	if (!data) {
		return <div>No profile data found</div>
	}
	return (
		<div>
			{isLoading ? (
				<div className='flex items-center  outline outline-1 outline-COLORS-stroke_main rounded-md px-3 py-3 justify-start bg-COLORS-bg_color_app text-white/80 gap-3'>
					<Skeleton className='h-12 w-16 rounded-md' />
					<div className='flex flex-col w-full gap-1'>
						<Skeleton className='h-6 w-44' />
						<Skeleton className='h-4 w-44' />
					</div>
				</div>
			) : (
				<div className='flex items-center  outline outline-1 outline-COLORS-stroke_main rounded-md px-3 py-3 justify-start bg-COLORS-bg_color_app text-white/80 gap-3 relative'>
					<div className='outline-1 outline outline-blue-50 w-12 h-12 flex items-center justify-center rounded-md'>
						{data?.user?.name?.charAt(0) || 'A'}
					</div>
					<div>
						<p className='text-lg'>{data?.user?.name || data?.user?.email}</p>
						<p className='bg-gradient-to-r from-[#BECE4E]  to-[#569C49] bg-clip-text text-transparent font-bold text-sm'>
							{data?.user?.subscription?.subscriptionType || 'Subscribe'}
						</p>
					</div>
					<LogoutButton />
				</div>
			)}
		</div>
	)
}
