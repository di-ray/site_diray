import { DatabaseConnection } from "../lib/db-connection"

async function testDatabaseConnection() {
  console.log("🔄 Iniciando teste de conexão com o banco de dados...")
  console.log("📊 Configurações:")
  console.log(`   Host: ${process.env.DB_HOST}`)
  console.log(`   Porta: ${process.env.DB_PORT || 3306}`)
  console.log(`   Banco: ${process.env.DB_NAME}`)
  console.log(`   Usuário: ${process.env.DB_USER?.substring(0, 3)}***`)
  console.log(`   SSL: ${process.env.DB_SSL === "true" ? "Sim" : "Não"}`)

  try {
    const dbConnection = DatabaseConnection.getInstance()
    const connection = await dbConnection.getConnection()

    console.log("✅ Conexão estabelecida com sucesso!")

    // Testar uma consulta simples
    const [result] = await connection.execute("SELECT 1 as test")
    console.log("✅ Consulta de teste executada com sucesso:", result)

    // Testar tabelas existentes
    const [tables] = await connection.execute("SHOW TABLES")
    console.log("📋 Tabelas encontradas no banco de dados:")
    console.log(tables)

    // Fechar conexão
    await dbConnection.closeConnection()
    console.log("✅ Conexão fechada com sucesso")
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error)
  }
}

// Executar o teste
testDatabaseConnection()
