import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { BorrowStatus, BorrowTransaction } from "@/types"

// Helper function to format dates
const formatDate = (date: Date | undefined) => {
	if (!date) return "N/A"
	return format(new Date(date), "dd/MM/yyyy")
}

// Define the status of a transaction based on dates
const getStatus = (transaction: BorrowTransaction) => {
	if (transaction.status === BorrowStatus.RETURNED) {
		return { label: "Returned", variant: "success" as const }
	}

	const now = new Date()
	if (new Date(transaction.dueDate) < now) {
		return { label: "Overdue", variant: "destructive" as const }
	}

	if (transaction.status === BorrowStatus.BORROWED) {
		return { label: "Borrowed", variant: "default" as const }
	}

	return { label: "Checking", variant: "warning" as const }
}

export const columns: ColumnDef<BorrowTransaction>[] = [
	{
		accessorKey: "_id",
		header: "Transaction ID",
		cell: ({ row }) => {
			const id = row.getValue("_id") as string
			return <div className="font-medium">{id.substring(0, 8)}...</div>
		},
	},
	{
		accessorKey: "book",
		header: "Book",
		cell: ({ row }) => {
			const book = row.getValue("book") as BorrowTransaction["book"]
			return (
				<div className="flex flex-col">
					<span className="font-medium">{book.title}</span>
					<span className="text-xs text-muted-foreground">
						by {book.author}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Status
				</Button>
			)
		},
		cell: ({ row }) => {
			const transaction = row.original
			const status = getStatus(transaction)
			const variant = status.variant as keyof typeof badgeVariants

			return <Badge variant={variant}>{status.label}</Badge>
		},
	},
	{
		accessorKey: "borrowDate",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Borrow Date
				</Button>
			)
		},
		cell: ({ row }) => formatDate(row.getValue("borrowDate")),
	},
	{
		accessorKey: "dueDate",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Due Date
				</Button>
			)
		},
		cell: ({ row }) => formatDate(row.getValue("dueDate")),
	},
	{
		accessorKey: "returnDate",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Return Date
				</Button>
			)
		},
		cell: ({ row }) => formatDate(row.getValue("returnDate")),
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => formatDate(row.getValue("createdAt")),
	},
	{
		accessorKey: "updatedAt",
		header: "Updated At",
		cell: ({ row }) => formatDate(row.getValue("updatedAt")),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const transaction = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(transaction._id)
							}
						>
							Copy transaction ID
						</DropdownMenuItem>
						{/* <DropdownMenuSeparator />
						<DropdownMenuItem>View details</DropdownMenuItem>
						{!transaction.returnDate && (
							<DropdownMenuItem>
								Mark as returned
							</DropdownMenuItem>
						)}
						<DropdownMenuItem>Edit transaction</DropdownMenuItem> */}
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
