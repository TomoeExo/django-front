import Cookies from 'js-cookie'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'access',
	'REFRESH_TOKEN' = 'refresh'
}

export const getAccessToken = () => {
	const access = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return access || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: '147.45.246.238',
		sameSite: 'lax',
		secure: false,
		expires: 1
	})
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
