import { IBase } from './root.types'

export interface MessageDto extends IBase {
	role: 'assistant' | 'system' | 'user' | string
	content: MessageContentDto[]
}

export interface MessageContentDto {
	text?: string
}
