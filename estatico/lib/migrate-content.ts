import websiteContent from "./content"
import { CMSService } from "./cms-service"

/**
 * Este script migra todo o conteúdo do arquivo content.ts para o banco de dados.
 * Execute-o uma vez para popular o banco de dados com o conteúdo inicial.
 */
async function migrateContentToDatabase() {
  console.log("Iniciando migração de conteúdo para o banco de dados...")

  const cmsService = new CMSService()

  // Aguardar um momento para garantir que a conexão com o banco de dados seja estabelecida
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Migrar páginas e suas seções
  for (const page of websiteContent.pages) {
    console.log(`Migrando página: ${page.id}`)
    await cmsService.savePage(page)
  }

  // Migrar configurações globais
  console.log("Migrando configurações globais")
  await cmsService.saveGlobalSettings(websiteContent.global)

  console.log("Migração concluída com sucesso!")
}

// Executar a migração
migrateContentToDatabase().catch((error) => {
  console.error("Erro durante a migração:", error)
})
