// Test TinaCMS connection
const CLIENT_ID = 'ebb20b99-d45a-4ba2-8f1e-8461e821fde9';
const TOKEN = '03e16881262879a322f1d5f6a714dc6f32201dc1';

async function testTinaConnection() {
  // Try different branches
  const branches = ['dependabot/npm_and_yarn/multi-544f560e85', 'master', 'main'];
  
  for (const branch of branches) {
    const url = `https://content.tinajs.io/1.6/content/${CLIENT_ID}/github/${branch}`;
    
    console.log(`\nTesting branch: ${branch}`);
    console.log('URL:', url);
    
    // Try with just X-API-KEY header
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': TOKEN
        },
        body: JSON.stringify({
          query: `{
            page(relativePath: "home.mdx") {
              title
            }
          }`
        })
      });
      
      const data = await response.json();
      console.log('Status:', response.status);
      console.log('Response:', JSON.stringify(data, null, 2));
      
      if (response.status === 200) {
        console.log(`✅ SUCCESS with branch: ${branch}`);
        break;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

testTinaConnection();