const http = require('http');

// First login as teacher
function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  try {
    // Login as teacher
    console.log('Logging in as teacher...');
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      email: 'teacher@demo.com',
      password: 'Demo123!'
    });
    
    console.log('Login Response Status:', loginRes.status);
    console.log('Login Response Body:', loginRes.body);
    
    const loginData = JSON.parse(loginRes.body);
    console.log('Login Data:', loginData);
    console.log('Token:', loginData.token ? 'Received' : 'NOT RECEIVED');
    
    const token = loginData.token;
    
    // Get classes for teacher
    console.log('\nFetching classes for teacher...');
    const classRes = await makeRequest('GET', '/api/classes', null);
    // Need to add Authorization header manually
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/classes',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log('Classes Status:', res.statusCode);
        const classes = JSON.parse(data);
        console.log('Classes Count:', classes.length);
        console.log('Classes:', JSON.stringify(classes, null, 2));
        process.exit(0);
      });
    });
    req.end();
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
