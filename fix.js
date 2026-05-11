const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\${/g, '${');
content = content.replace(/\\\\n/g, '\\n');
fs.writeFileSync('src/App.jsx', content);
console.log("Fixed backslashes in App.jsx");
