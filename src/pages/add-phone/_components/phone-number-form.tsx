import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { addPhoneNumber } from "@/services/auth.service"

// Phone number validation schema
const phoneSchema = z.string().refine(
	(value) => {
		const cleaned = value.replace(/\s/g, "")
		return /^(\+84|0)([3-9][0-9]{8})$/.test(cleaned)
	},
	{
		message: "Please enter a valid phone number",
	}
)

export function PhoneNumberForm() {
	const [phoneNumber, setPhoneNumber] = useState("")
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setIsSubmitting(true)

		try {
			// Validate phone number
			phoneSchema.parse(phoneNumber)

			// Save phone number using server action
			await addPhoneNumber(phoneNumber)

			setIsSuccess(true)
			toast.success("Phone number added", {
				description: "Your phone number has been successfully added.",
			})

			// Redirect after short delay to show success state
			setTimeout(() => {
				navigate("/")
			}, 1500)
		} catch (err) {
			if (err instanceof z.ZodError) {
				setError(err.errors[0].message)
			} else {
				setError("An error occurred. Please try again.")
				console.error(err)
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="phoneNumber">Phone Number</Label>
				<Input
					id="phoneNumber"
					type="tel"
					placeholder="0987654321"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
					className={error ? "border-red-500" : ""}
					disabled={isSubmitting || isSuccess}
				/>
				{error && <p className="text-sm text-red-500">{error}</p>}
			</div>

			<Button
				type="submit"
				className="w-full"
				disabled={isSubmitting || isSuccess}
			>
				{isSubmitting ? (
					<>
						<Loader2 className="w-4 h-4 mr-2 animate-spin" />
						Adding...
					</>
				) : isSuccess ? (
					<>
						<Check className="w-4 h-4 mr-2" />
						Added
					</>
				) : (
					"Add phone number"
				)}
			</Button>
		</form>
	)
}
