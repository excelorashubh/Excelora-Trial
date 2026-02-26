const http = require('http');

function makeRequest(method, path, token = null) {
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
    
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: data
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

(async () => {
  try {
    // Login as student1
    console.log('Logging in as student1...');
    const loginRes = await makeRequest('POST', '/api/auth/login');
    // Need to send body
    
    const http2 = require('http');
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    
    const loginReq = http2.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const loginData = JSON.parse(data);
        const token = loginData.token;
        
        console.log('Student logged in successfully');
        console.log('Fetching student classes...');
        
        // Now fetch classes
        const classOptions = {
          hostname: 'localhost',
          port: 5000,
          path: '/api/classes',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        
        const classReq = http2.request(classOptions, (res) => {
          let classData = '';
          res.on('data', (chunk) => { classData += chunk; });
          res.on('end', () => {
            const classes = JSON.parse(classData);
            console.log(`\nStudent can see ${classes.length} classes:`);
            classes.forEach(c => {
              console.log(`  - ${c.title} (${c.subject})`);
            });
            process.exit(0);
          });
        });
        classReq.end();
      });
    });
    
    loginReq.write(JSON.stringify({
      email: 'student1@demo.com',
      password: 'Demo123!'
    }));
    loginReq.end();
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
