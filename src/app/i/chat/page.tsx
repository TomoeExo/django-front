import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ChatList } from './ChatList'

export const metadata: Metadata = {
	title: 'Chat',
	...NO_INDEX_PAGE
}

export default function ChatPage() {
	return <ChatList />
}
