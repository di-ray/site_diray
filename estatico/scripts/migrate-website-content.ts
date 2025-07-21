import type mysql from "mysql2/promise"
import type { WebsiteContent } from "../lib/cms-service"

export async function migrateWebsiteContent(connection: mysql.Connection, content: WebsiteContent) {
  console.log("Migrando conteúdo do site...")

  // Iniciar transação
  await connection.beginTransaction()

  try {
    // Migrar páginas e seções
    for (const page of content.pages) {
      console.log(`Migrando página: ${page.id}`)

      // Inserir ou atualizar a página
      await connection.execute("INSERT INTO pages (page_id, title) VALUES (?, ?) ON DUPLICATE KEY UPDATE title = ?", [
        page.id,
        page.title,
        page.title,
      ])

      // Para cada seção
      for (const section of page.sections) {
        console.log(`Migrando seção: ${section.id}`)

        // Inserir ou atualizar a seção
        await connection.execute(
          "INSERT INTO sections (page_id, section_id, title, subtitle, description) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = ?, subtitle = ?, description = ?",
          [
            page.id,
            section.id,
            section.title,
            section.subtitle || null,
            section.description || null,
            section.title,
            section.subtitle || null,
            section.description || null,
          ],
        )

        // Se a seção tem itens
        if (section.items && section.items.length > 0) {
          // Primeiro, remover itens existentes para esta seção
          await connection.execute("DELETE FROM items WHERE section_id = ?", [section.id])

          // Depois, inserir os novos itens
          for (const item of section.items) {
            await connection.execute("INSERT INTO items (section_id, item_id, text) VALUES (?, ?, ?)", [
              section.id,
              item.id,
              item.text,
            ])
          }
        }
      }
    }

    // Migrar configurações globais
    console.log("Migrando configurações globais...")

    // Atualizar copyright
    await connection.execute(
      "INSERT INTO global_settings (id, copyright) VALUES (1, ?) ON DUPLICATE KEY UPDATE copyright = ?",
      [content.global.footer.copyright, content.global.footer.copyright],
    )

    // Atualizar links de navegação
    await connection.execute("DELETE FROM navigation_links")
    for (let i = 0; i < content.global.navigation.links.length; i++) {
      const link = content.global.navigation.links[i]
      await connection.execute("INSERT INTO navigation_links (text, href, position) VALUES (?, ?, ?)", [
        link.text,
        link.href,
        i,
      ])
    }

    // Atualizar links de rodapé
    await connection.execute("DELETE FROM footer_links")
    for (let i = 0; i < content.global.footer.links.length; i++) {
      const link = content.global.footer.links[i]
      await connection.execute("INSERT INTO footer_links (text, href, position) VALUES (?, ?, ?)", [
        link.text,
        link.href,
        i,
      ])
    }

    await connection.commit()
    console.log("Conteúdo do site migrado com sucesso!")
  } catch (error) {
    await connection.rollback()
    throw error
  }
}
