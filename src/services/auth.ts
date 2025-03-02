import { useAuthStore } from "@/store/useAuthStore"
import api from "@/utils/api"

// Profile endpoints
export const fetchUserProfile = async () => {
	try {
		const { data } = await api.get("/auth/profile")
		return data
	} catch (error) {
		console.error("Error fetching user profile:", error)
		throw error
	}
}

// Auth endpoints
export const logout = async () => {
	try {
		const { logout } = useAuthStore.getState()
		const { data } = await api.get("/auth/logout")
		logout()
		return data
	} catch (error) {
		console.error("Error during logout:", error)
		throw error
	}
}
