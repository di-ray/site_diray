const fs = require('fs');
const path = require('path');

// Files to process
const filesToProcess = [
  'components/blocks/engagement.tsx',
  'components/blocks/faq.tsx',
  'components/blocks/footer.tsx',
  'components/blocks/header.tsx',
  'components/blocks/hero.tsx',
  'components/blocks/logo-carousel.tsx',
  'components/blocks/more-solutions.tsx',
  'components/blocks/more-solutions-home.tsx',
  'components/blocks/solution-timeline.tsx',
  'components/blocks/what-you-receive-section.tsx',
  'components/blocks/why-diray.tsx',
  'components/page.tsx',
  'components/solutions/solutions-section.tsx'
];

function processFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;
  
  // Replace tinaField(props, with tinaField(props as any,
  content = content.replace(/tinaField\(props,/g, 'tinaField(props as any,');
  
  // Replace tinaField({ with tinaField({ ... } as any,
  content = content.replace(/tinaField\(\{([^}]+)\},/g, 'tinaField({ $1 } as any,');
  
  // Replace tinaField(variable, with tinaField(variable as any,
  // But not props since we already handled that
  content = content.replace(/tinaField\(([a-zA-Z_][a-zA-Z0-9_]*),/g, (match, variable) => {
    if (variable === 'props') {
      return match; // Already handled
    }
    return `tinaField(${variable} as any,`;
  });
  
  // Replace tinaField(variable) with tinaField(variable as any)
  content = content.replace(/tinaField\(([a-zA-Z_][a-zA-Z0-9_]*)\)/g, (match, variable) => {
    if (variable === 'props') {
      return `tinaField(${variable} as any)`;
    }
    return `tinaField(${variable} as any)`;
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`⏭️  No changes needed for ${filePath}`);
  }
}

console.log('Fixing tinaField type issues in all components...\n');

filesToProcess.forEach(processFile);

console.log('\n✨ All files processed!');