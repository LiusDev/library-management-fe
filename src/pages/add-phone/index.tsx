import { useAuth } from "@/store/useAuthStore"
import { PhoneNumberForm } from "./_components/phone-number-form"
import { useNavigate } from "react-router"
import { useEffect } from "react"

const AddPhonePage = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	useEffect(() => {
		if (!user) {
			navigate("/")
		}
	}, [user, navigate])
	return (
		<div className="container mx-auto flex items-center justify-center min-h-screen py-12">
			<div className="w-full max-w-md space-y-6">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">
						Add Your Phone Number
					</h1>
					<p className="text-muted-foreground">
						Please enter your phone number to complete your account
						setup.
					</p>
				</div>
				<PhoneNumberForm />
			</div>
		</div>
	)
}

export default AddPhonePage
