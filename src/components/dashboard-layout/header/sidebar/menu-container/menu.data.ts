import { IMenu } from './menu.types'

const menu: IMenu = {
	title: 'Pages',
	items: [
		{
			icon: 'LayoutGrid',
			link: '/i',
			title: 'Home'
		},
		{
			icon: 'User',
			link: '/i/profile',
			title: 'Profile'
		},
		{
			icon: 'Dumbbell',
			link: '/i/workout',
			title: 'Workout'
		},
		{
			icon: 'Layers3',
			link: '/i/exercise',
			title: 'Exercises'
		},
		{
			icon: 'Bot',
			link: '/i/chat',
			title: 'Chat'
		},
		{
			icon: 'LineChart',
			link: '/i/statistic',
			title: 'Statistic'
		}
	]
}

const general: IMenu = {
	title: 'General',
	items: []
}

export const menus: IMenu[] = [menu, general]
