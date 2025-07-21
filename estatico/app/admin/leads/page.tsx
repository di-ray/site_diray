import { LeadsManager } from "@/components/admin/leads-manager"

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gerenciamento de Leads</h1>
      </div>

      <LeadsManager />
    </div>
  )
}
