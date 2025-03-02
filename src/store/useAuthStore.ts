import { create } from "zustand"

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
	logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: true,
	setUser: (user) => set({ user }),
	setIsAuthenticated: (value) => set({ isAuthenticated: value }),
	setIsLoading: (value) => set({ isLoading: value }),
	logout: () => set({ user: null, isAuthenticated: false }),
}))

export const useAuth = () => useAuthStore((state) => state)
