import { useEffect, useState } from 'react'

import { MessageDto } from '@/types/chat.types'

import { chatService } from '@/services/chat.service'

interface UseChatReturnType {
	chat: { id: string; userId: string } | null
	messages: MessageDto[]
	loading: boolean
	error: Error | null
	sendMessage: (content: string) => Promise<void>
}

export const useChat = (chatId: string): UseChatReturnType => {
	const [chat, setChat] = useState<{ id: string; userId: string } | null>(null)
	const [messages, setMessages] = useState<MessageDto[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchChat = async () => {
			try {
				setLoading(true)
				const chatData = await chatService.getChat(chatId)
				setChat(chatData)
				const messagesData = await chatService.getMessages(chatId)
				setMessages(messagesData)
			} catch (err) {
				setError(err as Error)
			} finally {
				setLoading(false)
			}
		}

		fetchChat()
	}, [chatId])

	const sendMessage = async (content: string) => {
		try {
			const response = await chatService.updateChat(chatId, content)
			setMessages(prevMessages => [...prevMessages, response])
		} catch (err) {
			setError(err as Error)
		}
	}

	return { chat, messages, loading, error, sendMessage }
}
