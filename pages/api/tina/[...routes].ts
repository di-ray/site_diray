import { TinaNodeBackend } from "@tinacms/datalayer";

import databaseClient from "../../../tina/__generated__/databaseClient";

const handler = TinaNodeBackend({
  databaseClient,
});

export default (req, res) => {
  // Modify the request here if you need to
  return handler(req, res);
};
