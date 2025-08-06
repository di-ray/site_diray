import { BackendAuthProvider } from "@tinacms/datalayer";

// Custom auth provider for self-hosted TinaCMS
export const LocalBackendAuthProvider = (): BackendAuthProvider => ({
  initialize: async () => {},
  isAuthorized: async (req, res) => {
    // Always return true for local development
    // For production, you would check authentication here
    return {
      isAuthorized: true as const,
    };
  },
});