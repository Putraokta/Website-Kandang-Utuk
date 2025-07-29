import { BackButton } from "@/components/ui/back-button"

export default function NewAddressPage() {
  return (
    <div className="container">
      <div className="py-6">
        <div className="flex items-center justify-between">
          <BackButton fallbackHref="/checkout/address" />
          <h1 className="text-xl font-semibold">New Address</h1>
          <div></div>
        </div>
      </div>
      <div>
        {/* Address Form will go here */}
        <p>Address Form</p>
      </div>
    </div>
  )
}
