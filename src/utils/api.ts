import axios from "axios"

export const API_URL = import.meta.env.PROD
	? "https://library-api.quydx.id.vn"
	: "http://localhost:9999"

// Create axios instance
const api = axios.create({
	baseURL: API_URL,
	withCredentials: true, // Important for cookies to be sent
})

export default api
