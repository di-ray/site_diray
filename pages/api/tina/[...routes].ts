import { TinaNodeBackend } from "@tinacms/datalayer";
import { LocalBackendAuthProvider } from "../../../tina/auth";

import databaseClient from "../../../tina/__generated__/databaseClient";

const handler = TinaNodeBackend({
  authProvider: LocalBackendAuthProvider(),
  databaseClient,
});

export default (req, res) => {
  // Modify the request here if you need to
  return handler(req, res);
};
