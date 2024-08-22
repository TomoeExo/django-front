import axios, { type CreateAxiosDefaults } from 'axios'

import { errorCatch } from './error'
import {
	getAccessToken,
	removeFromStorage
} from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	},
	withCredentials: true // Включение учетных данных (куки)
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

// Function to get CSRF token from cookie
function getCSRFToken() {
	const csrfCookie = document.cookie
		.split('; ')
		.find(row => row.startsWith('csrftoken='))
	return csrfCookie ? csrfCookie.split('=')[1] : null
}

// Adding CSRF token to all requests made by axiosClassic
axiosClassic.interceptors.request.use(config => {
	const csrfToken = getCSRFToken()

	if (config.headers && csrfToken) {
		config.headers['X-CSRFToken'] = csrfToken
	}
	return config
})

// Adding authorization header and CSRF token to all requests made by axiosWithAuth
axiosWithAuth.interceptors.request.use(config => {
	const access = getAccessToken()
	const csrfToken = getCSRFToken()

	if (config?.headers) {
		if (access) {
			config.headers.Authorization = `Bearer ${access}`
		}
		if (csrfToken) {
			config.headers['X-CSRFToken'] = csrfToken
		}
	}
	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()

				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
			}
		}

		throw error
	}
)

export { axiosClassic, axiosWithAuth }
