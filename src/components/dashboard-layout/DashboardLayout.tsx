'use client'

import clsx from 'clsx'
import { PropsWithChildren, useState } from 'react'

import styles from './DashboardLayout.module.scss'
import { DashboardSidebar } from './header/sidebar/DashboardSidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	const [workouts, setWorkouts] = useState<any[]>([])
	return (
		<div className='flex min-h-screen '>
			<DashboardSidebar setWorkouts={setWorkouts} />

			<div
				className={clsx(
					'flex-1 pt-2 pr-2 bg-COLORS-bg_color_app overflow-x-hidden max-h-screen relative bg-marks',
					styles.container
				)}
			>
				{children}
			</div>
		</div>
	)
}
