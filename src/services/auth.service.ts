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
export const logoutService = async () => {
	try {
		await api.get("/auth/logout")
	} catch (error) {
		console.error("Error logging out:", error)
	}
}

export const addPhoneNumber = async (phone: string) => {
	try {
		await api.post("/auth/phone", {
			phone,
		})
	} catch (error) {
		console.error("Error add phone", error)
	}
}
