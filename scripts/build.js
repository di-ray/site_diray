const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if TinaCMS credentials are available
const hasTinaCredentials = !!(process.env.TINA_TOKEN && process.env.NEXT_PUBLIC_TINA_CLIENT_ID);

console.log('Starting build process...');

if (hasTinaCredentials) {
  console.log('TinaCMS credentials found, running full build...');
  try {
    execSync('tinacms build --partial-reindex', { stdio: 'inherit' });
    execSync('node scripts/fix-tina-client.js', { stdio: 'inherit' });
  } catch (error) {
    console.error('TinaCMS build failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('TinaCMS credentials not found, creating mock client...');
  
  // Create __generated__ directory if it doesn't exist
  const generatedDir = path.join(__dirname, '..', 'tina', '__generated__');
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }
  
  // Create a mock client that won't fail during build
  const mockClient = `// Mock client for builds without TinaCMS credentials
export const client = {
  queries: {
    page: async (args) => ({ data: { page: { blocks: [] } }, query: "", variables: {} }),
    solution: async (args) => ({ data: { solution: null }, query: "", variables: {} }),
    solutionConnection: async (args) => ({ 
      data: { solutionConnection: { edges: [] } }, 
      query: "", 
      variables: {} 
    }),
    settings: async (args) => ({ 
      data: { 
        settings: {
          navigation: null,
          footer: null
        } 
      }, 
      query: "", 
      variables: {} 
    }),
    faqConnection: async (args) => ({ 
      data: { faqConnection: { edges: [] } }, 
      query: "", 
      variables: {} 
    }),
    calculator: async (args) => ({
      data: { calculator: null },
      query: "",
      variables: {}
    }),
  }
};

export default client;
`;

  const databaseClient = `export const client = {
  queries: {
    page: async (args) => ({ data: { page: { blocks: [] } }, query: "", variables: {} }),
    solution: async (args) => ({ data: { solution: null }, query: "", variables: {} }),
    solutionConnection: async (args) => ({ 
      data: { solutionConnection: { edges: [] } }, 
      query: "", 
      variables: {} 
    }),
    settings: async (args) => ({ 
      data: { 
        settings: {
          navigation: null,
          footer: null
        } 
      }, 
      query: "", 
      variables: {} 
    }),
    faqConnection: async (args) => ({ 
      data: { faqConnection: { edges: [] } }, 
      query: "", 
      variables: {} 
    }),
    calculator: async (args) => ({
      data: { calculator: null },
      query: "",
      variables: {}
    }),
  }
};

export default client;
`;

  // Write mock files
  fs.writeFileSync(path.join(generatedDir, 'client.ts'), mockClient);
  fs.writeFileSync(path.join(generatedDir, 'databaseClient.ts'), databaseClient);
  
  // Create empty types file if it doesn't exist
  const typesFile = path.join(generatedDir, 'types.ts');
  if (!fs.existsSync(typesFile)) {
    fs.writeFileSync(typesFile, `
export type PageQuery = {
  page: {
    blocks?: Array<any>
  }
}

export type SolutionQuery = {
  solution: any
}
`);
  }
  
  console.log('Mock TinaCMS client created.');
}

// Now run Next.js build
console.log('Running Next.js build...');
try {
  execSync('next build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Next.js build failed:', error.message);
  process.exit(1);
}