const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Normalize path separators
    const normalizedPath = filePath.replace(/\\/g, '/');
    const depth = normalizedPath.split('/').length - 2;
    const up = '../'.repeat(depth) || './';
    
    let modified = false;
    
    // Fix AuthContext
    const newAuth = content.replace(/['"][^'"]*context\/AuthContext['"]/g, '"' + up + 'context/AuthContext"');
    if (newAuth !== content) { content = newAuth; modified = true; }
    
    // Fix AuxContext
    const newAux = content.replace(/['"][^'"]*context\/AuxContext['"]/g, '"' + up + 'context/AuxContext"');
    if (newAux !== content) { content = newAux; modified = true; }
    
    // Fix api
    const newApi = content.replace(/['"][^'"]*services\/api['"]/g, '"' + up + 'services/api"');
    if (newApi !== content) { content = newApi; modified = true; }
    
    // Fix Icons
    const newIcons = content.replace(/['"][^'"]*components\/common\/Icons['"]/g, '"' + up + 'components/common/Icons"');
    if (newIcons !== content) { content = newIcons; modified = true; }
    
    // Fix departmentJobs
    const newDept = content.replace(/['"][^'"]*services\\/departmentJobs['"]/g, '"' + up + 'services/departmentJobs"');
    if (newDept !== content) { content = newDept; modified = true; }
    // Fix logo
    const newLogo = content.replace(/['"][^'"]*assets\/logo\.png['"]/g, '"' + up + 'assets/logo.png"');
    if (newLogo !== content) { content = newLogo; modified = true; }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed', filePath);
    }
  }
});
