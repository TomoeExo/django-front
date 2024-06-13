import {
	Blocks,
	Bot,
	Dumbbell,
	Layers3,
	LayoutGrid,
	LineChart,
	User
} from 'lucide-react'
import { FC, SVGAttributes } from 'react'

import { TypeLucideIconName } from '@/components/dashboard-layout/header/sidebar/menu-container/menu.types'

import { useRenderClient } from '@/hooks/useRenderClient'

const LucideIcons = {
	LayoutGrid,
	Bot,
	User,
	Dumbbell,
	Layers3,
	LineChart,
	Blocks
}
type IconComponentProps = SVGAttributes<SVGSVGElement>
export const LucideIcon: FC<{ name: TypeLucideIconName }> = ({ name }) => {
	const { isRenderClient } = useRenderClient()

	const IconComponent = LucideIcons[name] as FC<IconComponentProps>

	if (isRenderClient) return <IconComponent /> || <LucideIcons.Blocks />
	else return null
}
