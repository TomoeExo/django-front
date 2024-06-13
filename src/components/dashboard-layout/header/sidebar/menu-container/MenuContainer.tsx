import { FC } from 'react'

import Menu from './Menu'
import { menus } from './menu.data'

interface MenuContainerProps {
	closeSidebar: () => void // Функция для закрытия сайдбара
}

const MenuContainer: FC<MenuContainerProps> = ({ closeSidebar }) => {
	return (
		<div>
			<Menu
				menu={menus[0]}
				closeSidebar={closeSidebar}
			/>
		</div>
	)
}

export default MenuContainer
