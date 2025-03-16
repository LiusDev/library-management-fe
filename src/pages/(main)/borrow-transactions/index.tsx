import { TransactionsTable } from "./_components/transactions-table"

const BorrowTransactionsPage = () => {
	return (
		<main className="flex-1">
			<div className="container mx-auto px-4 py-6 md:px-6 md:py-12">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Borrow Transactions
						</h1>
						<p className="text-muted-foreground">
							Here are your borrow transactions.
						</p>
					</div>
				</div>
				<TransactionsTable />
			</div>
		</main>
	)
}

export default BorrowTransactionsPage
