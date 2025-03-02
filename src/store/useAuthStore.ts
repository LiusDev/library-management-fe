import { create } from "zustand"
import { logoutService } from "@/services/auth"

export interface User {
	_id: string
	username: string
	email: string
	avatar?: string
	role: "user" | "admin"
}

interface AuthState {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean
	setUser: (user: User | null) => void
	setIsAuthenticated: (value: boolean) => void
	setIsLoading: (value: boolean) => void
	logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: true,
	setUser: (user) => set({ user }),
	setIsAuthenticated: (value) => set({ isAuthenticated: value }),
	setIsLoading: (value) => set({ isLoading: value }),
	logout: async () => {
		try {
			// Call logout API endpoint to invalidate token on server
			await logoutService()
		} catch (error) {
			console.error("Error during logout:", error)
		} finally {
			// Reset auth state regardless of API success
			set({ user: null, isAuthenticated: false })
		}
	},
}))

export const useAuth = () => useAuthStore((state) => state)
