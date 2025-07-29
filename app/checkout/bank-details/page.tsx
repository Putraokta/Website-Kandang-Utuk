import { BackButton } from "@/components/ui/back-button"

export default function BankDetailsPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="flex items-center justify-between mb-6">
        <BackButton fallbackHref="/checkout/bank-selection" />
        <h1 className="text-2xl font-bold">Bank Details</h1>
        <div></div> {/* Empty div for spacing */}
      </header>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <p className="mb-2">
          <span className="font-medium">Account Name:</span> John Doe
        </p>
        <p className="mb-2">
          <span className="font-medium">Account Number:</span> 1234567890
        </p>
        <p className="mb-2">
          <span className="font-medium">Bank Name:</span> Example Bank
        </p>
        <p className="mb-2">
          <span className="font-medium">Branch Code:</span> 0001
        </p>
      </div>
    </div>
  )
}
