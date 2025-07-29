import { BackButton } from "@/components/ui/back-button"

export default function BankSelectionPage() {
  return (
    <div className="container relative">
      <div className="sticky top-0 z-10 border-b bg-background">
        <div className="grid h-16 items-center">
          <div className="absolute left-4">
            <BackButton fallbackHref="/checkout/payment" />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="font-semibold">Select Bank</div>
            </div>
          </div>
        </div>
      </div>
      <main className="py-6">
        <div>Bank Selection Content</div>
      </main>
    </div>
  )
}
