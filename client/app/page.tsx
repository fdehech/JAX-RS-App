import { PersonList } from "@/components/person-list"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <PersonList />
      </div>
    </main>
  )
}
