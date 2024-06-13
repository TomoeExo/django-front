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
	name?: string
	email: string
	password: string
	repeat_password: string
	subscription: ISubscriptionType
}

interface UserDetails {
	age?: number
	gender?: string
	height?: number
	weight?: number
}

interface UserSubscription {
	subscriptionType?: string
	description?: string
	descriptionRequests?: number
	chatRequests?: number
}

export interface IUser {
	id: number
	name?: string
	email: string
	avatarImg?: string
	details?: UserDetails
	subscription?: UserSubscription
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
