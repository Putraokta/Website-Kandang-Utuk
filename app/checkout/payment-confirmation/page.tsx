import { BackButton } from "@/components/ui/back-button"

export default function PaymentConfirmationPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-6">
        <BackButton fallbackHref="/checkout" />
        <h1 className="text-2xl font-bold mt-4">Payment Confirmation</h1>
      </header>

      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-lg font-semibold mb-4">Thank you for your order!</h2>
        <p className="text-gray-700">Your payment has been successfully processed.</p>
        <p className="text-gray-700">You will receive an email with your order details shortly.</p>

        <div className="mt-6">
          <a href="/" className="text-blue-500 hover:underline">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  )
}
