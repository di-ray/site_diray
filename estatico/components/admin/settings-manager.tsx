"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Save } from "lucide-react"

export function SettingsManager() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Analytics settings
  const [analyticsSettings, setAnalyticsSettings] = useState({
    googleAnalyticsId: "G-XXXXXXXXXX",
    googleAdsId: "XXXXXXXXXX",
    facebookPixelId: "XXXXXXXXXX",
    linkedInId: "XXXXXXXXXX",
    enableAnalytics: true,
    anonymizeIp: true,
    respectDnt: true,
  })

  // Cache settings
  const [cacheSettings, setCacheSettings] = useState({
    enableCache: true,
    cacheDuration: "3600",
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateOnUpdate: true,
  })

  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    notificationEmail: "contato@diray.com.br",
    emailSubject: "Novo lead recebido - DI.RAY",
    emailTemplate:
      "Olá,\n\nUm novo lead foi recebido através do site:\n\nNome: {{name}}\nEmail: {{email}}\nTelefone: {{phone}}\nEmpresa: {{company}}\nServiço: {{service}}\nMensagem: {{message}}\n\nAtenciosamente,\nSistema DI.RAY",
    sendNotifications: true,
  })

  const handleAnalyticsChange = (field: string, value: any) => {
    setAnalyticsSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCacheChange = (field: string, value: any) => {
    setCacheSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEmailChange = (field: string, value: any) => {
    setEmailSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveSettings = async (settingsType: string) => {
    setIsLoading(true)
    try {
      // Em produção, isso seria uma chamada de API real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Configurações salvas",
        description: `As configurações de ${settingsType} foram atualizadas com sucesso`,
      })
    } catch (error) {
      console.error(`Erro ao salvar configurações de ${settingsType}:`, error)
      toast({
        title: "Erro ao salvar",
        description: `Não foi possível salvar as configurações de ${settingsType}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="cache">Cache</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Analytics</CardTitle>
              <CardDescription>Configure os serviços de analytics e rastreamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-analytics" className="flex flex-col space-y-1">
                  <span>Habilitar Analytics</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Ativar ou desativar todos os serviços de analytics
                  </span>
                </Label>
                <Switch
                  id="enable-analytics"
                  checked={analyticsSettings.enableAnalytics}
                  onCheckedChange={(checked) => handleAnalyticsChange("enableAnalytics", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-analytics-id">ID do Google Analytics</Label>
                <Input
                  id="google-analytics-id"
                  value={analyticsSettings.googleAnalyticsId}
                  onChange={(e) => handleAnalyticsChange("googleAnalyticsId", e.target.value)}
                  disabled={!analyticsSettings.enableAnalytics}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-ads-id">ID do Google Ads</Label>
                <Input
                  id="google-ads-id"
                  value={analyticsSettings.googleAdsId}
                  onChange={(e) => handleAnalyticsChange("googleAdsId", e.target.value)}
                  disabled={!analyticsSettings.enableAnalytics}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook-pixel-id">ID do Facebook Pixel</Label>
                <Input
                  id="facebook-pixel-id"
                  value={analyticsSettings.facebookPixelId}
                  onChange={(e) => handleAnalyticsChange("facebookPixelId", e.target.value)}
                  disabled={!analyticsSettings.enableAnalytics}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin-id">ID do LinkedIn</Label>
                <Input
                  id="linkedin-id"
                  value={analyticsSettings.linkedInId}
                  onChange={(e) => handleAnalyticsChange("linkedInId", e.target.value)}
                  disabled={!analyticsSettings.enableAnalytics}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="anonymize-ip" className="flex flex-col space-y-1">
                  <span>Anonimizar IPs</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Anonimizar endereços IP para conformidade com LGPD
                  </span>
                </Label>
                <Switch
                  id="anonymize-ip"
                  checked={analyticsSettings.anonymizeIp}
                  onCheckedChange={(checked) => handleAnalyticsChange("anonymizeIp", checked)}
                  disabled={!analyticsSettings.enableAnalytics}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="respect-dnt" className="flex flex-col space-y-1">
                  <span>Respeitar Do Not Track</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Respeitar a configuração Do Not Track do navegador
                  </span>
                </Label>
                <Switch
                  id="respect-dnt"
                  checked={analyticsSettings.respectDnt}
                  onCheckedChange={(checked) => handleAnalyticsChange("respectDnt", checked)}
                  disabled={!analyticsSettings.enableAnalytics}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("analytics")} disabled={isLoading} className="ml-auto">
                {isLoading ? (
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
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="cache" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Cache</CardTitle>
              <CardDescription>Configure as opções de cache e revalidação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-cache" className="flex flex-col space-y-1">
                  <span>Habilitar Cache</span>
                  <span className="font-normal text-xs text-muted-foreground">Ativar ou desativar o cache do site</span>
                </Label>
                <Switch
                  id="enable-cache"
                  checked={cacheSettings.enableCache}
                  onCheckedChange={(checked) => handleCacheChange("enableCache", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cache-duration">Duração do Cache (segundos)</Label>
                <Input
                  id="cache-duration"
                  type="number"
                  value={cacheSettings.cacheDuration}
                  onChange={(e) => handleCacheChange("cacheDuration", e.target.value)}
                  disabled={!cacheSettings.enableCache}
                />
                <p className="text-xs text-muted-foreground">
                  Tempo em segundos que o conteúdo ficará em cache (3600 = 1 hora)
                </p>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="revalidate-on-focus" className="flex flex-col space-y-1">
                  <span>Revalidar ao Focar</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Revalidar o cache quando o usuário retorna à página
                  </span>
                </Label>
                <Switch
                  id="revalidate-on-focus"
                  checked={cacheSettings.revalidateOnFocus}
                  onCheckedChange={(checked) => handleCacheChange("revalidateOnFocus", checked)}
                  disabled={!cacheSettings.enableCache}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="revalidate-on-reconnect" className="flex flex-col space-y-1">
                  <span>Revalidar ao Reconectar</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Revalidar o cache quando o usuário reconecta à internet
                  </span>
                </Label>
                <Switch
                  id="revalidate-on-reconnect"
                  checked={cacheSettings.revalidateOnReconnect}
                  onCheckedChange={(checked) => handleCacheChange("revalidateOnReconnect", checked)}
                  disabled={!cacheSettings.enableCache}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="revalidate-on-update" className="flex flex-col space-y-1">
                  <span>Revalidar ao Atualizar</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Revalidar o cache quando o conteúdo é atualizado
                  </span>
                </Label>
                <Switch
                  id="revalidate-on-update"
                  checked={cacheSettings.revalidateOnUpdate}
                  onCheckedChange={(checked) => handleCacheChange("revalidateOnUpdate", checked)}
                  disabled={!cacheSettings.enableCache}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("cache")} disabled={isLoading} className="ml-auto">
                {isLoading ? (
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
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Configure as notificações por email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="send-notifications" className="flex flex-col space-y-1">
                  <span>Enviar Notificações</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Enviar notificações por email quando um novo lead for recebido
                  </span>
                </Label>
                <Switch
                  id="send-notifications"
                  checked={emailSettings.sendNotifications}
                  onCheckedChange={(checked) => handleEmailChange("sendNotifications", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Email para Notificações</Label>
                <Input
                  id="notification-email"
                  type="email"
                  value={emailSettings.notificationEmail}
                  onChange={(e) => handleEmailChange("notificationEmail", e.target.value)}
                  disabled={!emailSettings.sendNotifications}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-subject">Assunto do Email</Label>
                <Input
                  id="email-subject"
                  value={emailSettings.emailSubject}
                  onChange={(e) => handleEmailChange("emailSubject", e.target.value)}
                  disabled={!emailSettings.sendNotifications}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-template">Template do Email</Label>
                <Textarea
                  id="email-template"
                  rows={10}
                  value={emailSettings.emailTemplate}
                  onChange={(e) => handleEmailChange("emailTemplate", e.target.value)}
                  disabled={!emailSettings.sendNotifications}
                />
                <p className="text-xs text-muted-foreground">
                  Use &#123;&#123; name &#125;&#125;, &#123;&#123; email &#125;&#125;, &#123;&#123; phone &#125;&#125;,
                  etc. para inserir os dados do lead
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("email")} disabled={isLoading} className="ml-auto">
                {isLoading ? (
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
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
