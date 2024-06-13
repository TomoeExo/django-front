import { IBase } from './root.types'

export interface IGoal extends IBase {
	title: string
	description?: string
	deadline?: Date
	completed?: boolean
}
