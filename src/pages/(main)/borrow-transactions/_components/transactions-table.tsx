import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useSearchParamPagination } from "@/hooks"
import { useTransactions } from "@/services/borrowTransaction.service"
import { LIST_LIMIT } from "@/utils/constant"
import { columns } from "./columns"
import { useMemo } from "react"

export function TransactionsTable() {
	const [page, setPage] = useSearchParamPagination(1)
	const { data } = useTransactions(page, LIST_LIMIT)
	const totalPage = useMemo(
		() => Math.ceil(data.total / LIST_LIMIT),
		[data.total]
	)
	const table = useReactTable({
		data: data.data,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		pageCount: totalPage,
		state: {
			pagination: {
				pageIndex: page - 1,
				pageSize: LIST_LIMIT,
			},
		},
		onPaginationChange: (updater) => {
			if (typeof updater === "function") {
				const newState = updater({
					pageIndex: page - 1,
					pageSize: LIST_LIMIT,
				})
				setPage(newState.pageIndex + 1) // Convert back to 1-indexed for URL
			}
		},
	})

	return (
		<div className="space-y-4">
			<div className="rounded-md border mt-8">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2">
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage(Math.max(page - 1, 1))}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage(Math.min(page + 1, totalPage))}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
