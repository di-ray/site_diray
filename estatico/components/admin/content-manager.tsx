"use client"

import { useState, useEffect } from "react"
import { useContent } from "@/lib/use-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Save, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContentManager() {
  const { content, isLoading, saveContent } = useContent()
  const [selectedPage, setSelectedPage] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [editedContent, setEditedContent] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isRevalidating, setIsRevalidating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && content.pages.length > 0 && !selectedPage) {
      setSelectedPage(content.pages[0].id)
    }
  }, [isLoading, content, selectedPage])

  useEffect(() => {
    if (selectedPage && content.pages.length > 0) {
      const page = content.pages.find((p) => p.id === selectedPage)
      if (page && page.sections.length > 0 && !selectedSection) {
        setSelectedSection(page.sections[0].id)
      }
    }
  }, [selectedPage, content, selectedSection])

  useEffect(() => {
    if (selectedPage && selectedSection) {
      const page = content.pages.find((p) => p.id === selectedPage)
      if (page) {
        const section = page.sections.find((s) => s.id === selectedSection)
        if (section) {
          setEditedContent({ ...section })
        }
      }
    }
  }, [selectedPage, selectedSection, content])

  const handleSaveContent = async () => {
    if (!editedContent) return

    setIsSaving(true)
    try {
      // Atualizar o conteúdo localmente
      const updatedContent = { ...content }
      const pageIndex = updatedContent.pages.findIndex((p) => p.id === selectedPage)

      if (pageIndex !== -1) {
        const sectionIndex = updatedContent.pages[pageIndex].sections.findIndex((s) => s.id === selectedSection)

        if (sectionIndex !== -1) {
          updatedContent.pages[pageIndex].sections[sectionIndex] = { ...editedContent }

          // Salvar no servidor
          await saveContent(updatedContent)

          // Revalidar o cache
          await revalidateCache()

          toast({
            title: "Conteúdo salvo",
            description: "O conteúdo foi atualizado com sucesso",
          })
        }
      }
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error)
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o conteúdo",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const revalidateCache = async () => {
    setIsRevalidating(true)
    try {
      const response = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: "/",
          tag: "content",
          secret: "diray-secret-token",
        }),
      })

      const data = await response.json()

      if (!data.revalidated) {
        throw new Error("Falha ao revalidar cache")
      }
    } catch (error) {
      console.error("Erro ao revalidar cache:", error)
      toast({
        title: "Aviso",
        description: "O conteúdo foi salvo, mas o cache não foi revalidado",
        variant: "destructive",
      })
    } finally {
      setIsRevalidating(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (editedContent) {
      setEditedContent({
        ...editedContent,
        [field]: value,
      })
    }
  }

  const handleItemChange = (itemId: string, field: string, value: string) => {
    if (editedContent && editedContent.items) {
      const updatedItems = editedContent.items.map((item: any) => {
        if (item.id === itemId) {
          return { ...item, [field]: value }
        }
        return item
      })

      setEditedContent({
        ...editedContent,
        items: updatedItems,
      })
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
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="page-select">Página</Label>
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger id="page-select">
              <SelectValue placeholder="Selecione uma página" />
            </SelectTrigger>
            <SelectContent>
              {content.pages.map((page) => (
                <SelectItem key={page.id} value={page.id}>
                  {page.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="section-select">Seção</Label>
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger id="section-select">
              <SelectValue placeholder="Selecione uma seção" />
            </SelectTrigger>
            <SelectContent>
              {selectedPage &&
                content.pages
                  .find((p) => p.id === selectedPage)
                  ?.sections.map((section) => (
                    <SelectItem key={section.id} value={section.id}>
                      {section.title || section.id}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {editedContent ? (
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="items">Itens</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Editar Seção</CardTitle>
                <CardDescription>Edite as informações básicas da seção</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={editedContent.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={editedContent.subtitle || ""}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    value={editedContent.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setEditedContent(null)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveContent} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Itens da Seção</CardTitle>
                <CardDescription>Edite os itens desta seção</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {editedContent.items && editedContent.items.length > 0 ? (
                  editedContent.items.map((item: any, index: number) => (
                    <div key={item.id} className="space-y-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Item {index + 1}</h3>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-${item.id}-text`}>Texto</Label>
                        <Textarea
                          id={`item-${item.id}-text`}
                          rows={3}
                          value={item.text || ""}
                          onChange={(e) => handleItemChange(item.id, "text", e.target.value)}
                        />
                      </div>

                      {item.category !== undefined && (
                        <div className="space-y-2">
                          <Label htmlFor={`item-${item.id}-category`}>Categoria</Label>
                          <Input
                            id={`item-${item.id}-category`}
                            value={item.category || ""}
                            onChange={(e) => handleItemChange(item.id, "category", e.target.value)}
                          />
                        </div>
                      )}

                      {item.question !== undefined && (
                        <div className="space-y-2">
                          <Label htmlFor={`item-${item.id}-question`}>Pergunta</Label>
                          <Input
                            id={`item-${item.id}-question`}
                            value={item.question || ""}
                            onChange={(e) => handleItemChange(item.id, "question", e.target.value)}
                          />
                        </div>
                      )}

                      {item.answer !== undefined && (
                        <div className="space-y-2">
                          <Label htmlFor={`item-${item.id}-answer`}>Resposta</Label>
                          <Textarea
                            id={`item-${item.id}-answer`}
                            rows={3}
                            value={item.answer || ""}
                            onChange={(e) => handleItemChange(item.id, "answer", e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">Esta seção não possui itens</div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setEditedContent(null)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveContent} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-12 text-muted-foreground">Selecione uma página e uma seção para editar</div>
      )}

      <div className="flex justify-end">
        <Button variant="outline" onClick={revalidateCache} disabled={isRevalidating}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRevalidating ? "animate-spin" : ""}`} />
          Revalidar Cache
        </Button>
      </div>
    </div>
  )
}
