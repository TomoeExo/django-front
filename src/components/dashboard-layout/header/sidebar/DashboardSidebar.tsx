'use client'

import clsx from 'clsx'
import { Menu, WalletCards } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import Search from '@/components/search/Search'

import { useWorkouts } from '@/hooks/useWorkouts'

import styles from '../../DashboardLayout.module.scss'

import MenuContainer from './menu-container/MenuContainer'
import { Profile } from './profile/Profile'

export function DashboardSidebar({ setWorkouts }: any) {
	const [search, setSearch] = useState('')
	const { data: workoutsData, isLoading } = useWorkouts()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	const handleSearch = (term: string) => {
		setSearch(term)
	}

	const handleSearchClick = async () => {
		const filteredWorkouts = workoutsData.filter(
			(workout: any) =>
				workout.title.toLowerCase().includes(search.toLowerCase()) ||
				(workout.description &&
					workout.description.toLowerCase().includes(search.toLowerCase())) ||
				(workout.tags &&
					workout.tags.some((tag: string) =>
						tag.toLowerCase().includes(search.toLowerCase())
					))
		)

		setSearch('')
		setWorkouts(filteredWorkouts)
	}

	const closeSidebar = () => {
		setIsSidebarOpen(false)
	}

	return (
		<div className='bg-COLORS-bg_color_app p-2 sm:p-0'>
			<button className='hidden lg:flex absolute z-50 right-7 top-6 bg-[#0D0F10] p-3 rounded-full'>
				<Menu
					className='w-8 h-8'
					onClick={toggleSidebar}
				/>
			</button>
			<div
				className={
					isSidebarOpen ? 'lg:flex lg:absolute lg:z-20' : 'flex lg:hidden'
				}
			>
				<div
					className={clsx(
						'w-72 flex flex-col justify-between  pb-2 pl-2 pr-2 rounded-2xl bg-[#0D0F10] min-h-[98.5vh] max-h-screen overflow-y-auto',
						styles.container
					)}
				>
					<div>
						<div className='border-b border-COLORS-bg_color_app'>
							<img
								className='p-6'
								src='/logo.svg'
								alt='Logo'
							/>
						</div>

						<div>
							<div className='text-COLORS-placeholder m-6 uppercase'>
								General
							</div>
							<Search
								onSearch={handleSearch}
								onClick={handleSearchClick}
								placeholder='Search Workout'
								className='pb-6'
							/>
							<Link
								className='flex items-center border border-COLORS-stroke_main rounded-md px-3 py-3 justify-start gap-3 bg-COLORS-bg_color_app text-white/80'
								onClick={closeSidebar}
								href='/i'
							>
								<WalletCards />
								<span>Billing</span>
							</Link>
							<div className='pb-6 border-b border-COLORS-bg_color_app'></div>
						</div>

						<MenuContainer closeSidebar={closeSidebar} />
					</div>
					<div className=' max-w-[17rem] w-full'>
						<Profile />
					</div>
				</div>
			</div>
		</div>
	)
}
