import { createContext, useCallback, useContext, useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog"
import { DialogContextType, DialogOptions, DialogStore } from "./types"

const DialogContext = createContext<DialogContextType | null>(null)

export function DialogProvider({ children }: { children: React.ReactNode }) {
	const [dialogState, setDialogState] = useState<DialogStore>({
		isOpen: false,
		options: null,
	})

	const open = useCallback((options: DialogOptions) => {
		setDialogState({
			isOpen: true,
			options,
		})
	}, [])

	const close = useCallback(() => {
		setDialogState((current) => ({
			...current,
			isOpen: false,
		}))
		dialogState.options?.onClose?.()
	}, [dialogState.options])

	const closeAll = useCallback(() => {
		close()
	}, [close])

	return (
		<DialogContext.Provider value={{ open, close, closeAll }}>
			{children}
			<Dialog
				open={dialogState.isOpen}
				onOpenChange={(open) => !open && close()}
			>
				{dialogState.options && (
					<DialogContent className={dialogState.options.className}>
						<DialogHeader>
							{dialogState.options.title && (
								<DialogTitle>
									{dialogState.options.title}
								</DialogTitle>
							)}
							{dialogState.options.description && (
								<DialogDescription>
									{dialogState.options.description}
								</DialogDescription>
							)}
						</DialogHeader>
						{dialogState.options.children}
					</DialogContent>
				)}
			</Dialog>
		</DialogContext.Provider>
	)
}

export const useDialog = () => {
	const context = useContext(DialogContext)
	if (!context) {
		throw new Error("useDialog must be used within a DialogProvider")
	}
	return context
}
