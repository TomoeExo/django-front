import { MessageDto } from '@/types/chat.types'

import { axiosWithAuth } from '@/api/interceptors'

class ChatService {
	private BASE_URL = '/user/chat'

	async createChat(): Promise<{ id: string }> {
		const response = await axiosWithAuth.post<{ id: string }>(this.BASE_URL)
		return response.data
	}

	async getAll() {
		const response = await axiosWithAuth.get(this.BASE_URL)
		return response.data
	}

	async getChat(chatId: string): Promise<{ id: string; userId: string }> {
		const response = await axiosWithAuth.get<{ id: string; userId: string }>(
			`${this.BASE_URL}/${chatId}`
		)
		return response.data
	}

	async getMessages(chatId: string): Promise<MessageDto[]> {
		const response = await axiosWithAuth.get<MessageDto[]>(
			`${this.BASE_URL}/${chatId}/messages`
		)
		return response.data
	}

	async updateChat(chatId: string, content: string): Promise<MessageDto> {
		const response = await axiosWithAuth.put<MessageDto>(
			`${this.BASE_URL}/${chatId}`,
			{ content }
		)
		return response.data
	}

	async deleteChat(chatId: string): Promise<null> {
		const response = await axiosWithAuth.delete<null>(
			`${this.BASE_URL}/${chatId}`
		)
		return response.data
	}
}

export const chatService = new ChatService()
