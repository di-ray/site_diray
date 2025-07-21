import { exec } from "child_process"
import * as path from "path"

// Função para executar um comando
function runCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Executando: ${command}`)
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar comando: ${error.message}`)
        console.error(stderr)
        reject(error)
        return
      }
      console.log(stdout)
      resolve()
    })
  })
}

async function main() {
  try {
    // Caminho para o script de migração
    const migrationScript = path.join(__dirname, "migrate-all-content.ts")

    // Executar o script de migração usando ts-node
    await runCommand(`npx ts-node ${migrationScript}`)

    console.log("Migração concluída com sucesso!")
  } catch (error) {
    console.error("Erro durante o processo de migração:", error)
    process.exit(1)
  }
}

main()
