import {
	Bot,
	Dumbbell,
	Layers3,
	LayoutGrid,
	LineChart,
	User
} from 'lucide-react'

const LucideIcons = { LayoutGrid, Bot, User, Dumbbell, Layers3, LineChart }

export type TypeLucideIconName = keyof typeof LucideIcons

export interface IMenuItem {
	icon: TypeLucideIconName
	title: string
	link: string
}

export interface IMenu {
	title: string
	items: IMenuItem[]
}
