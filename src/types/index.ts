export interface UserProfile {
	_id: string
	username: string
	email: string
	role: "user" | "staff" | "admin"
	avatar: string
	status: "active" | "banned"
	phone: string | null
	createdAt: string
	updatedAt: string
}
export interface ListData<T> {
	data: T[]
	total: number
	page: number
	limit: number
}

export interface Category {
	_id: string
	name: string
	description: string
}

export interface Book {
	_id: string
	title: string
	description: string
	author: string
	publishedDate: string
	quantity: number
	available: number
	cover: string
	category: Category[]
	createdAt: string
	updatedAt: string
}

export enum BorrowStatus {
	CHECKING = "checking",
	BORROWED = "borrowed",
	RETURNED = "returned",
}

export interface BorrowTransaction {
	_id: string
	user: string
	book: Book
	borrowDate: string
	dueDate: string
	status: BorrowStatus
	returnDate: string | undefined
	createdAt: string
	updatedAt: string
}
