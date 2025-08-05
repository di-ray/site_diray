import { TinaNodeBackend } from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider } from "tinacms-authjs/dist/tinacms";

import databaseClient from "../../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? new AuthJsBackendAuthProvider({
        secret: process.env.NEXTAUTH_SECRET!,
      })
    : new AuthJsBackendAuthProvider({
        secret: process.env.NEXTAUTH_SECRET!,
      }),
  databaseClient,
});

export default (req, res) => {
  // Modify the request here if you need to
  return handler(req, res);
};
