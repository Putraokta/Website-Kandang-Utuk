import { BackButton } from "@/components/ui/back-button"

export default function PersonalProfilePage() {
  return (
    <div className="container relative">
      <div className="md:hidden">
        <BackButton fallbackHref="/profile" />
      </div>
      <div className="py-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Personal Information</h1>
          <p className="text-muted-foreground">Manage your personal information.</p>
        </div>
      </div>
    </div>
  )
}
