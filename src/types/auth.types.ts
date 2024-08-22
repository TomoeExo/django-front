interface ISubscriptionType {
	subscriptionType: string
	description: string
	descriptionRequests: number
	chatRequests: number
}

export interface FavoriteItemDto {
	workoutId: string
	userId: string
}

export interface IAuthForm {
	username?: string
	email: string
	password: string
	password2: string
	subscription: ISubscriptionType
}

interface UserDetails {
	age?: number
	gender?: string
	height?: number
	weight?: number
}

interface UserSubscription {
	subscription_type?: string
	description?: string
	descriptionRequests?: number
	chatRequests?: number
}

export interface IUser {
	id: number
	username?: string
	email: string
	avatar_img?: File | string | null
	details?: UserDetails
	subscription?: UserSubscription
}

export interface IAuthResponse {
	access: string
	// refresh: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
export type TypeUserFormWithFile = Omit<IUser, 'id'> & {
	password?: string
	avatar_img?: File | string | null
}
