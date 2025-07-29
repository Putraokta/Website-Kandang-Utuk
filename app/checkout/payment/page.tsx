import { BackButton } from "@/components/ui/back-button"

export default function PaymentPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-6">
        <BackButton fallbackHref="/checkout" />
        <h1 className="text-2xl font-bold">Payment</h1>
      </header>

      <main>
        {/* Payment form or options will go here */}
        <p>Choose your payment method:</p>
        {/* Example payment options */}
        <ul>
          <li>Credit Card</li>
          <li>PayPal</li>
          <li>Google Pay</li>
        </ul>
      </main>
    </div>
  )
}
