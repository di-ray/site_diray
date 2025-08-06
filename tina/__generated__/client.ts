// Placeholder client para build
export const client = {
  queries: {
    page: async (args?: any) => ({ data: { page: { blocks: [] } }, query: "", variables: {} }),
    solution: async (args?: any) => ({ data: { solution: null }, query: "", variables: {} }),
    solutionConnection: async (args?: any) => ({ data: { solutionConnection: { edges: [] } }, query: "", variables: {} }),
    settings: async (args?: any) => ({ data: { settings: { navigation: null, footer: null } }, query: "", variables: {} }),
    faqConnection: async (args?: any) => ({ data: { faqConnection: { edges: [] } }, query: "", variables: {} }),
    calculator: async (args?: any) => ({ data: { calculator: null }, query: "", variables: {} })
  }
};

export default client;
  