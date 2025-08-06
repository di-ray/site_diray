// Test TinaCMS connection with exact settings query
const CLIENT_ID = 'ebb20b99-d45a-4ba2-8f1e-8461e821fde9';
const TOKEN = '2c23294c4d1c8174c22fa5ca648cc30f1b75f9fc';

async function testTinaConnection() {
  const branch = 'dependabot/npm_and_yarn/multi-544f560e85';
  const url = `https://content.tinajs.io/1.6/content/${CLIENT_ID}/github/${branch}`;
  
  console.log('Testing TinaCMS connection');
  console.log('URL:', url);
  console.log('Token:', TOKEN);
  
  // Test settings query specifically
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': TOKEN
      },
      body: JSON.stringify({
        query: `{
          settings(relativePath: "index.json") {
            navigation {
              logo
            }
            footer {
              text
            }
          }
        }`
      })
    });
    
    const data = await response.json();
    console.log('\nSettings Query:');
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }

  // Test page query
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
    console.log('\nPage Query:');
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testTinaConnection();