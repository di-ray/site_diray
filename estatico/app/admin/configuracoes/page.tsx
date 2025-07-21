import { SettingsManager } from "@/components/admin/settings-manager"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>

      <SettingsManager />
    </div>
  )
}
