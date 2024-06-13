import Link from 'next/link'
import { FC } from 'react'

import { LucideIcon } from '@/components/ui/icons/LucidIcons'

import { IMenuItem } from './menu.types'

interface MenuItemProps {
	item: IMenuItem
	closeSidebar: () => void // Функция для закрытия сайдбара
}

const MenuItem: FC<MenuItemProps> = ({ item, closeSidebar }) => {
	const handleClick = () => {
		closeSidebar() // Закрываем сайдбар при клике на элемент меню
	}
	return (
		<li>
			<Link
				className='flex items-center  outline outline-1 outline-COLORS-stroke_main rounded-md px-3 py-3 justify-start bg-COLORS-bg_color_app mb-6 text-white/80 gap-3'
				onClick={handleClick}
				href={item.link}
			>
				<LucideIcon name={item.icon} />
				<span>{item.title}</span>
			</Link>
		</li>
	)
}

export default MenuItem
