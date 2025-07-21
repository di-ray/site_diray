import mysql from "mysql2/promise"

// Classe singleton para gerenciar a conexão com o banco de dados
export class DatabaseConnection {
  private static instance: DatabaseConnection
  private connection: mysql.Connection | null = null
  private connectionPromise: Promise<mysql.Connection> | null = null
  private isConnecting = false
  private connectionAttempts = 0
  private readonly MAX_ATTEMPTS = 3

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  public async getConnection(): Promise<mysql.Connection> {
    // Se já temos uma conexão estabelecida, retorne-a
    if (this.connection) {
      return this.connection
    }

    // Se já estamos tentando conectar, aguarde a promessa existente
    if (this.connectionPromise) {
      return this.connectionPromise
    }

    // Inicie uma nova tentativa de conexão
    this.isConnecting = true
    this.connectionPromise = this.connect()

    try {
      // Aguarde a conexão ser estabelecida
      this.connection = await this.connectionPromise
      console.log("✅ Database connection established and ready")
      return this.connection
    } catch (error) {
      console.error("❌ Failed to establish database connection:", error)
      this.connectionPromise = null
      this.isConnecting = false
      throw error
    }
  }

  private async connect(): Promise<mysql.Connection> {
    this.connectionAttempts++
    console.log(`🔄 Attempting to connect to database (attempt ${this.connectionAttempts}/${this.MAX_ATTEMPTS})...`)

    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectTimeout: 30000, // 30 segundos
        ssl: process.env.DB_SSL === "true" ? {} : undefined,
        multipleStatements: true,
        dateStrings: true,
      })

      // Teste a conexão com uma query simples
      await connection.execute("SELECT 1 AS connection_test")
      console.log("✅ Database connection test successful")

      // Configurar evento para reconectar em caso de erro
      connection.on("error", async (err) => {
        console.error("Database connection error:", err)
        if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNRESET") {
          console.log("🔄 Reconnecting to database...")
          this.connection = null
          this.connectionPromise = null
          this.isConnecting = false
          this.connectionAttempts = 0
        }
      })

      return connection
    } catch (error) {
      console.error("❌ Database connection attempt failed:", error)

      // Se ainda não atingimos o número máximo de tentativas, tente novamente
      if (this.connectionAttempts < this.MAX_ATTEMPTS) {
        console.log(`🔄 Retrying in 2 seconds...`)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return this.connect()
      }

      throw error
    }
  }

  public async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.end()
      this.connection = null
      this.connectionPromise = null
      this.isConnecting = false
      this.connectionAttempts = 0
      console.log("Database connection closed")
    }
  }
}
