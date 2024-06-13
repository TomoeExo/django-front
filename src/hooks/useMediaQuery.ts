import { useEffect, useState } from 'react'

export const useMediaQuery = (query: any) => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query)
		const documentChangeHandler = () => setMatches(mediaQueryList.matches)

		mediaQueryList.addEventListener('change', documentChangeHandler)

		// Set the initial value
		setMatches(mediaQueryList.matches)

		return () => {
			mediaQueryList.removeEventListener('change', documentChangeHandler)
		}
	}, [query])

	return matches
}