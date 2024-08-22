'use client'

import { Bot, Loader, Play, SquarePen, Trash2, User } from 'lucide-react'
import { useEffect, useState } from 'react'

import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { Heading } from '@/components/dashboard-layout/header/Heading'

import { MessageDto } from '@/types/chat.types'

import { WorkoutTextarea } from '../workout/WorkoutTextarea'

import { chatService } from '@/services/chat.service'

export function ChatList() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)
	const [chatList, setChatList] = useState<any[]>([])
	const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState<MessageDto[]>([])
	const [isSending, setIsSending] = useState(false)

	const fetchChatList = async () => {
		try {
			setLoading(true)
			const chats = await chatService.getAll()
			setChatList(chats)
		} catch (err) {
			setError(err as Error)
		} finally {
			setLoading(false)
		}
	}

	const fetchChatMessages = async (chatId: string) => {
		try {
			const chatMessages = await chatService.getMessages(chatId)
			setMessages(chatMessages)
		} catch (error) {
			console.log('Failed to fetch chat messages:', error)
		}
	}

	useEffect(() => {
		fetchChatList()
	}, [])

	useEffect(() => {
		if (selectedChatId) {
			fetchChatMessages(selectedChatId)
		}
	}, [selectedChatId])

	const handleChatClick = (chatId: string) => {
		setSelectedChatId(chatId)
	}

	const handleChatDelete = async (chatId: string) => {
		try {
			setLoading(true)
			await chatService.deleteChat(chatId)
			setChatList(prevChatList =>
				prevChatList.filter(chat => chat.id !== chatId)
			)
			if (selectedChatId === chatId) {
				setSelectedChatId(null)
				setMessages([])
			}
		} catch (err) {
			setError(err as Error)
		} finally {
			setLoading(false)
		}
	}

	const handleCreateChat = async () => {
		try {
			setLoading(true)
			const newChat = await chatService.createChat()
			setChatList(prevChatList => [...prevChatList, newChat])
			setSelectedChatId(newChat.id)
		} catch (err) {
			setError(err as Error)
		} finally {
			setLoading(false)
		}
	}
	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value)
	}

	const sendMessage = async () => {
		if (!message.trim()) return // Не отправляем пустые сообщения
		setIsSending(true)

		const userMessage: any = {
			content: message,
			role: 'user'
		}
		setMessages(prevMessages => [...prevMessages, userMessage])

		try {
			const newMessage = await chatService.updateChat(selectedChatId!, message)
			const transformedMessage: any = {
				content: newMessage.message.find(([key]: any) => key === 'content')[1],
				role: newMessage.message.find(([key]: any) => key === 'role')[1]
			}

			setMessages(prevMessages => [...prevMessages, transformedMessage])
			setMessage('')
		} catch (error) {
			console.log('Failed to send message:', error)
		} finally {
			setIsSending(false)
		}
	}
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			sendMessage()
		}
	}

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>
	return (
		<div>
			<DashboardHeader
				title='Trainwall AI'
				description='Welcome to Trainwall AI page'
			/>
			<div className='flex mx-10 gap-10 justify-around lg:flex-col lg:mx-2'>
				<div className='flex flex-col lg:w-72 '>
					<div className='sticky top-0'>
						<Heading title='Available chats' />

						<button
							className='font-medium flex max-w-80 w-full border border-transparent justify-between px-5 py-3 mb-3 hover:border-COLORS-stroke_main rounded-md'
							onClick={handleCreateChat}
						>
							New Chat
							<SquarePen />
						</button>
						<ul className='flex flex-col gap-3'>
							{chatList.map(chat => (
								<div
									key={chat.id}
									className='flex justify-between'
								>
									<button
										className='w-full'
										onClick={() => handleChatClick(chat.id)}
									>
										<li
											className='flex max-w-80 w-full justify-between px-5 py-3 border border-COLORS-stroke_main rounded-md'
											key={chat.id}
										>
											{chat.name || chat.id}
										</li>
									</button>
									<button
										className='text-white/60 px-2'
										onClick={() => handleChatDelete(chat.id)}
									>
										<Trash2 />
									</button>
								</div>
							))}
						</ul>
					</div>
				</div>
				<div className='flex flex-col w-[720px] mb-10 lg:w-full'>
					{selectedChatId && (
						<div className='flex flex-col '>
							<Heading title='Chat now' />
							<div className='flex-1 overflow-y-auto'>
								{messages.map((message, index) => (
									<div
										key={index}
										className={`flex mb-4 items-center relative ${message.role === 'user' ? 'justify-end mr-10' : 'justify-start ml-10'}`}
									>
										{message.role === 'user' ? (
											<div className='absolute -right-10 min-w-6 min-h-6 rounded-full border border-COLORS-stroke_main  p-1'>
												<User />
											</div>
										) : (
											<div className='absolute -left-10 min-w-6 min-h-6 rounded-full border border-[#569C49]/50  p-1'>
												<Bot />
											</div>
										)}
										<div
											className={`rounded-lg p-2 ${message.role === 'user' ? 'border border-COLORS-stroke_main bg-white/10 text-white self-end' : 'border border-[#569C49]/20 text-white self-start'}`}
										>
											{Array.isArray(message.content) ? (
												message.content.map((content, index) => (
													<p key={index}>{content.text}</p>
												))
											) : (
												<p>{message.content}</p>
											)}
										</div>
									</div>
								))}
							</div>

							<div className='flex relative max-w-[670px] '>
								<WorkoutTextarea
									className=''
									placeholder='Message ChatGPT...'
									id='chat'
									onChange={handleMessageChange}
									onKeyDown={handleKeyDown}
									value={message}
								/>
								<button
									className=' bg-COLORS-bg_color_app rounded-md p-2 mt-2 text-white/80 absolute right-3 top-2'
									onClick={sendMessage}
									disabled={isSending}
								>
									{isSending ? <Loader /> : <Play />}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
