// Test TinaCMS connection
const CLIENT_ID = '98caf0e5-1fae-4233-94d1-384207c7ba74';
const TOKEN = '91059217f8835f37ad428b0d5dfc77a2c217ebc2';

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