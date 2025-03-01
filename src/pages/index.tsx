import { Button } from "@/components/ui/button"
import { useDialog } from "@/providers"

function HomePage() {
	const dialog = useDialog()

	return (
		<div>
			<Button
				onClick={() => {
					dialog.open({
						title: "Subscribe to newsletter",
						children: (
							<>
								<Button onClick={() => dialog.closeAll()}>
									Submit
								</Button>
							</>
						),
					})
				}}
			>
				Open Dialog
			</Button>
		</div>
	)
}

export default HomePage
