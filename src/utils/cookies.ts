/**
 * Gets a cookie value by name
 */
export const getCookie = (name: string): string | undefined => {
	const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
	return match ? decodeURIComponent(match[2]) : undefined
}

/**
 * Checks if a cookie exists and has a value
 */
export const hasCookie = (name: string): boolean => {
	return getCookie(name) !== undefined
}

/**
 * Sets a cookie with the given name and value
 */
export const setCookie = (
	name: string,
	value: string,
	days?: number,
	path: string = "/"
): void => {
	let expires = ""
	if (days) {
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		expires = `; expires=${date.toUTCString()}`
	}
	document.cookie = `${name}=${encodeURIComponent(
		value
	)}${expires}; path=${path}`
}

/**
 * Removes a cookie by name
 */
export const removeCookie = (name: string, path: string = "/"): void => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`
}
