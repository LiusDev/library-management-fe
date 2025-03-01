export interface DialogOptions {
	title?: string
	description?: string
	children: React.ReactNode
	className?: string
	onClose?: () => void
}

export interface DialogStore {
	isOpen: boolean
	options: DialogOptions | null
}

export interface DialogContextType {
	open: (options: DialogOptions) => void
	close: () => void
	closeAll: () => void
}
