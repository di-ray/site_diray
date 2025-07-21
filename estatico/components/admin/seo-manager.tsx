"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Save } from "lucide-react"

interface SeoSettings {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  canonicalUrl: string
  robotsTxt: string
  structuredData: string
}

interface PageSeo {
  pageId: string
  pageTitle: string
  settings: SeoSettings
}

export function SeoManager() {
  const [pages, setPages] = useState<{ id: string; title: string }[]>([])
  const [selectedPage, setSelectedPage] = useState("")
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    title: "",
    description: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    canonicalUrl: "",
    robotsTxt: "index, follow",
    structuredData: '{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "DI.RAY"\n}',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Dados simulados para demonstração
  const mockSeoData: PageSeo[] = [
    {
      pageId: "home",
      pageTitle: "Home",
      settings: {
        title: "DI.RAY - Consultoria em Desenvolvimento Organizacional",
        description: "Consultoria especializada em desenvolvimento organizacional e empresarial",
        keywords: "consultoria, desenvolvimento organizacional, empresarial, DI.RAY",
        ogTitle: "DI.RAY - Consultoria em Desenvolvimento Organizacional",
        ogDescription: "Consultoria especializada em desenvolvimento organizacional e empresarial",
        ogImage: "/images/og-image.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: "DI.RAY - Consultoria em Desenvolvimento Organizacional",
        twitterDescription: "Consultoria especializada em desenvolvimento organizacional e empresarial",
        twitterImage: "/images/twitter-image.jpg",
        canonicalUrl: "https://diray.com.br",
        robotsTxt: "index, follow",
        structuredData:
          '{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "DI.RAY",\n  "url": "https://diray.com.br"\n}',
      },
    },
    {
      pageId: "solucoes",
      pageTitle: "Soluções",
      settings: {
        title: "Soluções - DI.RAY",
        description: "Conheça nossas soluções em desenvolvimento organizacional",
        keywords: "soluções, desenvolvimento organizacional, consultoria, DI.RAY",
        ogTitle: "Soluções - DI.RAY",
        ogDescription: "Conheça nossas soluções em desenvolvimento organizacional",
        ogImage: "/images/og-image-solucoes.jpg",
        twitterCard: "summary_large_image",
        twitterTitle: "Soluções - DI.RAY",
        twitterDescription: "Conheça nossas soluções em desenvolvimento organizacional",
        twitterImage: "/images/twitter-image-solucoes.jpg",
        canonicalUrl: "https://diray.com.br/solucoes",
        robotsTxt: "index, follow",
        structuredData:
          '{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "Soluções - DI.RAY"\n}',
      },
    },
  ]

  useEffect(() => {
    const fetchPages = async () => {
      try {
        // Em produção, isso seria uma chamada de API real
        // Simulando dados para demonstração
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const fetchedPages = [
          { id: "home", title: "Home" },
          { id: "solucoes", title: "Soluções" },
          { id: "solucoes/alinhamento-de-cultura", title: "Alinhamento de Cultura" },
          { id: "solucoes/estrategia-de-treinamento", title: "Estratégia de Treinamento" },
          { id: "solucoes/plano-de-comunicacao", title: "Plano de Comunicação" },
          { id: "solucoes/programa-de-desenvolvimento", title: "Programa de Desenvolvimento" },
          { id: "solucoes/workshop-de-metas", title: "Workshop de Metas" },
        ]

        setPages(fetchedPages)

        if (fetchedPages.length > 0) {
          setSelectedPage(fetchedPages[0].id)
        }
      } catch (error) {
        console.error("Erro ao buscar páginas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPages()
  }, [])

  useEffect(() => {
    if (selectedPage) {
      const fetchSeoSettings = async () => {
        try {
          setIsLoading(true)

          // Em produção, isso seria uma chamada de API real
          // Simulando dados para demonstração
          await new Promise((resolve) => setTimeout(resolve, 500))

          const pageSeo = mockSeoData.find((p) => p.pageId === selectedPage)

          if (pageSeo) {
            setSeoSettings(pageSeo.settings)
          } else {
            // Configurações padrão para páginas sem SEO definido
            const pageTitle = pages.find((p) => p.id === selectedPage)?.title || ""
            setSeoSettings({
              title: `${pageTitle} - DI.RAY`,
              description: `${pageTitle} - Consultoria em desenvolvimento organizacional`,
              keywords: `${pageTitle.toLowerCase()}, consultoria, desenvolvimento organizacional, DI.RAY`,
              ogTitle: `${pageTitle} - DI.RAY`,
              ogDescription: `${pageTitle} - Consultoria em desenvolvimento organizacional`,
              ogImage: "/images/og-image.jpg",
              twitterCard: "summary_large_image",
              twitterTitle: `${pageTitle} - DI.RAY`,
              twitterDescription: `${pageTitle} - Consultoria em desenvolvimento organizacional`,
              twitterImage: "/images/twitter-image.jpg",
              canonicalUrl: `https://diray.com.br/${selectedPage === "home" ? "" : selectedPage}`,
              robotsTxt: "index, follow",
              structuredData: `{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"WebPage\",\n  \"name\": \"${pageTitle} - DI.RAY\"\n}`,
            })
          }
        } catch (error) {
          console.error("Erro ao buscar configurações de SEO:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchSeoSettings()
    }
  }, [selectedPage, pages])

  const handleInputChange = (field: keyof SeoSettings, value: string) => {
    setSeoSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveSeo = async () => {
    setIsSaving(true)
    try {
      // Em produção, isso seria uma chamada de API real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Configurações de SEO salvas",
        description: "As configurações de SEO foram atualizadas com sucesso",
      })
    } catch (error) {
      console.error("Erro ao salvar configurações de SEO:", error)
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações de SEO",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="page-select">Página</Label>
        <Select value={selectedPage} onValueChange={setSelectedPage}>
          <SelectTrigger id="page-select">
            <SelectValue placeholder="Selecione uma página" />
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page.id} value={page.id}>
                {page.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Básicas de SEO</CardTitle>
              <CardDescription>Configure os metadados básicos para SEO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Página</Label>
                <Input
                  id="title"
                  value={seoSettings.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Recomendado: 50-60 caracteres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Meta Descrição</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={seoSettings.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Recomendado: 150-160 caracteres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Palavras-chave</Label>
                <Input
                  id="keywords"
                  value={seoSettings.keywords}
                  onChange={(e) => handleInputChange("keywords", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Separe as palavras-chave por vírgulas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">URL Canônica</Label>
                <Input
                  id="canonicalUrl"
                  value={seoSettings.canonicalUrl}
                  onChange={(e) => handleInputChange("canonicalUrl", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opengraph" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Open Graph</CardTitle>
              <CardDescription>Configure os metadados para compartilhamento em redes sociais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ogTitle">Título Open Graph</Label>
                <Input
                  id="ogTitle"
                  value={seoSettings.ogTitle}
                  onChange={(e) => handleInputChange("ogTitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogDescription">Descrição Open Graph</Label>
                <Textarea
                  id="ogDescription"
                  rows={3}
                  value={seoSettings.ogDescription}
                  onChange={(e) => handleInputChange("ogDescription", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">Imagem Open Graph</Label>
                <Input
                  id="ogImage"
                  value={seoSettings.ogImage}
                  onChange={(e) => handleInputChange("ogImage", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  URL da imagem para compartilhamento (recomendado: 1200x630px)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="twitter" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Twitter Card</CardTitle>
              <CardDescription>Configure os metadados para compartilhamento no Twitter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitterCard">Tipo de Card</Label>
                <Select
                  value={seoSettings.twitterCard}
                  onValueChange={(value) => handleInputChange("twitterCard", value)}
                >
                  <SelectTrigger id="twitterCard">
                    <SelectValue placeholder="Selecione o tipo de card" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                    <SelectItem value="app">App</SelectItem>
                    <SelectItem value="player">Player</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterTitle">Título Twitter</Label>
                <Input
                  id="twitterTitle"
                  value={seoSettings.twitterTitle}
                  onChange={(e) => handleInputChange("twitterTitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterDescription">Descrição Twitter</Label>
                <Textarea
                  id="twitterDescription"
                  rows={3}
                  value={seoSettings.twitterDescription}
                  onChange={(e) => handleInputChange("twitterDescription", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterImage">Imagem Twitter</Label>
                <Input
                  id="twitterImage"
                  value={seoSettings.twitterImage}
                  onChange={(e) => handleInputChange("twitterImage", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">URL da imagem para compartilhamento no Twitter</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
              <CardDescription>Configure opções avançadas de SEO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="robotsTxt">Meta Robots</Label>
                <Input
                  id="robotsTxt"
                  value={seoSettings.robotsTxt}
                  onChange={(e) => handleInputChange("robotsTxt", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Ex: index, follow, noindex, nofollow</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="structuredData">Dados Estruturados (JSON-LD)</Label>
                <Textarea
                  id="structuredData"
                  rows={10}
                  value={seoSettings.structuredData}
                  onChange={(e) => handleInputChange("structuredData", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Dados estruturados no formato JSON-LD para melhorar a exibição nos resultados de busca
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSeo} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
