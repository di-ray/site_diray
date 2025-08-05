// Custom auth provider for self-hosted TinaCMS
export const LocalBackendAuthProvider = () => ({
  initialize: async () => {},
  isAuthorized: async (req, res) => {
    // Always return true for local development
    if (process.env.TINA_PUBLIC_IS_LOCAL === "true") {
      return {
        isAuthorized: true,
      };
    }
    
    // For production, check NextAuth session
    try {
      const { getServerSession } = await import("next-auth/next");
      const authOptions = (await import("../pages/api/auth/[...nextauth]")).authOptions;
      const session = await getServerSession(req, res, authOptions);
      
      return {
        isAuthorized: !!session,
      };
    } catch (e) {
      console.error("Auth error:", e);
      return {
        isAuthorized: false,
      };
    }
  },
  getUser: async (req) => {
    return {
      id: "local-user",
      name: "Local User",
      email: "local@example.com",
    };
  },
  getToken: async (req) => {
    return {
      id_token: "local-token",
    };
  },
});