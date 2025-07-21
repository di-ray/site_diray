import { SeoManager } from "@/components/admin/seo-manager"

export default function SeoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gerenciamento de SEO</h1>
      </div>

      <SeoManager />
    </div>
  )
}
