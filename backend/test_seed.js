const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/seed/demo',
  method: 'POST'
};

const req = http.request(options, (res) => {
  let data = '';
  console.log(`STATUS: ${res.statusCode}`);
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('BODY:', data);
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
  process.exit(1);
});

req.end();
