import { FC } from 'react'

import MenuItem from './MenuItem'
import { IMenu } from './menu.types'

interface MenuProps {
	menu: IMenu
	closeSidebar: () => void // Функция для закрытия сайдбара
}

const Menu: FC<MenuProps> = ({ menu, closeSidebar }) => {
	return (
		<div>
			<div className='text-COLORS-placeholder m-6 uppercase'>{menu.title}</div>
			<ul>
				{menu.items.map(item => (
					<MenuItem
						key={item.link}
						item={item}
						closeSidebar={closeSidebar}
					/>
				))}
			</ul>
		</div>
	)
}

export default Menu
