// Self-hosted TinaCMS - não usa API Cloud
import { databaseRequest } from "./databaseClient";

export const client = {
  queries: {
    page: (args) => databaseRequest({ query: queries.page, variables: args }),
    solution: (args) => databaseRequest({ query: queries.solution, variables: args }),
    solutionConnection: (args) => databaseRequest({ query: queries.solutionConnection, variables: args }),
    settings: (args) => databaseRequest({ query: queries.settings, variables: args }),
    faqConnection: (args) => databaseRequest({ query: queries.faqConnection, variables: args }),
    calculator: (args) => databaseRequest({ query: queries.calculator, variables: args })
  }
};

// Importar queries do types se necessário
import { queries } from "./types";

export default client;
  