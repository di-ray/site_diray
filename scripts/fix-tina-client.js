const fs = require('fs');
const path = require('path');

// Path to the generated client file
const clientPath = path.join(__dirname, '..', 'tina', '__generated__', 'client.ts');

// Check if file exists
if (fs.existsSync(clientPath)) {
  // Read the file
  let content = fs.readFileSync(clientPath, 'utf8');
  
  // Remove cacheDir property from the createClient call
  content = content.replace(/cacheDir:\s*'[^']*',?\s*/g, '');
  
  // Write the file back
  fs.writeFileSync(clientPath, content, 'utf8');
  
  console.log('Fixed TinaCMS client by removing cacheDir property');
} else {
  console.log('TinaCMS client file not found, skipping fix');
}