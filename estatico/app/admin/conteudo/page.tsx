import { ContentManager } from "@/components/admin/content-manager"

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gerenciamento de Conteúdo</h1>
      </div>

      <ContentManager />
    </div>
  )
}
