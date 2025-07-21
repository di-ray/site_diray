"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Download, Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Lead {
  name: string
  email: string
  phone: string
  company?: string
  message?: string
  service?: string
  source?: string
  budget?: string
  date: string
  time: string
}

export function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads")
        const data = await response.json()

        if (data.success && data.leads) {
          setLeads(data.leads)
          setFilteredLeads(data.leads)
        }
      } catch (error) {
        console.error("Erro ao buscar leads:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [])

  useEffect(() => {
    // Aplicar filtros
    let result = [...leads]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          lead.phone.includes(term) ||
          (lead.company && lead.company.toLowerCase().includes(term)),
      )
    }

    if (serviceFilter) {
      result = result.filter((lead) => lead.service === serviceFilter)
    }

    if (dateFilter) {
      result = result.filter((lead) => lead.date === dateFilter)
    }

    setFilteredLeads(result)
  }, [searchTerm, serviceFilter, dateFilter, leads])

  const clearFilters = () => {
    setSearchTerm("")
    setServiceFilter("")
    setDateFilter("")
  }

  const exportToCSV = () => {
    // Preparar cabeçalhos CSV
    const headers = [
      "Nome",
      "Email",
      "Telefone",
      "Empresa",
      "Serviço",
      "Mensagem",
      "Origem",
      "Orçamento",
      "Data",
      "Hora",
    ]

    // Preparar linhas de dados
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.company || "",
      lead.service || "",
      lead.message || "",
      lead.source || "",
      lead.budget || "",
      lead.date,
      lead.time,
    ])

    // Combinar cabeçalhos e linhas
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    // Criar blob e link para download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `leads_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Extrair serviços únicos para o filtro
  const uniqueServices = Array.from(new Set(leads.map((lead) => lead.service).filter(Boolean))) as string[]

  // Extrair datas únicas para o filtro
  const uniqueDates = Array.from(new Set(leads.map((lead) => lead.date)))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="all">Todos os Leads</TabsTrigger>
            <TabsTrigger value="recent">Recentes</TabsTrigger>
            <TabsTrigger value="analytics">Análise</TabsTrigger>
          </TabsList>

          <Button onClick={exportToCSV} className="ml-auto">
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre os leads por diferentes critérios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nome, email, telefone..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-filter">Serviço</Label>
                <Select value={serviceFilter} onValueChange={setServiceFilter}>
                  <SelectTrigger id="service-filter">
                    <SelectValue placeholder="Todos os serviços" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_services">Todos os serviços</SelectItem>
                    {uniqueServices.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-filter">Data</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger id="date-filter">
                    <SelectValue placeholder="Todas as datas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_dates">Todas as datas</SelectItem>
                    {uniqueDates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  <X className="mr-2 h-4 w-4" />
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Leads</CardTitle>
              <CardDescription>{filteredLeads.length} leads encontrados</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredLeads.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  Nenhum lead encontrado com os filtros atuais
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell>
                            {lead.service ? (
                              <Badge variant="outline">{lead.service}</Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {lead.date} às {lead.time}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leads Recentes</CardTitle>
              <CardDescription>Leads dos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredLeads.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">Nenhum lead recente encontrado</div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.slice(0, 10).map((lead, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell>
                            {lead.service ? (
                              <Badge variant="outline">{lead.service}</Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {lead.date} às {lead.time}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Leads</CardTitle>
              <CardDescription>Estatísticas e métricas de conversão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{leads.length}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Serviço Mais Procurado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{uniqueServices.length > 0 ? uniqueServices[0] : "N/A"}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Média Diária</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {uniqueDates.length > 0 ? (leads.length / uniqueDates.length).toFixed(1) : "0"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Distribuição por Serviço</h3>
                <div className="space-y-4">
                  {uniqueServices.map((service) => {
                    const count = leads.filter((lead) => lead.service === service).length
                    const percentage = (count / leads.length) * 100

                    return (
                      <div key={service} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>{service}</span>
                          <span className="text-sm text-muted-foreground">
                            {count} leads ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
