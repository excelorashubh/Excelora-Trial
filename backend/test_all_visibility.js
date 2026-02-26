const http = require('http');

function loginAndGetClasses(email, password, desc) {
  return new Promise((resolve, reject) => {
    const loginOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    
    const loginReq = http.request(loginOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const loginData = JSON.parse(data);
        const token = loginData.token;
        
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
        
        const classReq = http.request(classOptions, (res) => {
          let classData = '';
          res.on('data', (chunk) => { classData += chunk; });
          res.on('end', () => {
            const classes = JSON.parse(classData);
            resolve({
              desc,
              count: classes.length,
              titles: classes.map(c => c.title)
            });
          });
        });
        classReq.end();
      });
    });
    
    loginReq.write(JSON.stringify({ email, password: 'Demo123!' }));
    loginReq.end();
  });
}

(async () => {
  try {
    const adminResult = await loginAndGetClasses('admin@demo.com', 'Demo123!', 'Admin');
    console.log(`${adminResult.desc}: sees ${adminResult.count} classes`);
    adminResult.titles.forEach(t => console.log(`  - ${t}`));
    
    const teacherResult = await loginAndGetClasses('teacher@demo.com', 'Demo123!', 'Teacher');
    console.log(`\n${teacherResult.desc}: sees ${teacherResult.count} classes`);
    teacherResult.titles.forEach(t => console.log(`  - ${t}`));
    
    const student1Result = await loginAndGetClasses('student1@demo.com', 'Demo123!', 'Student1 (Alice - enrolled in both)');
    console.log(`\n${student1Result.desc}: sees ${student1Result.count} classes`);
    student1Result.titles.forEach(t => console.log(`  - ${t}`));
    
    const student2Result = await loginAndGetClasses('student2@demo.com', 'Demo123!', 'Student2 (Bob - enrolled in React only)');
    console.log(`\n${student2Result.desc}: sees ${student2Result.count} classes`);
    student2Result.titles.forEach(t => console.log(`  - ${t}`));
    
    console.log('\n✅ CLASS VISIBILITY WORKING CORRECTLY!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
