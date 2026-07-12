const fs = require('fs');
const glob = require('glob');

glob('src/**/*.{jsx,js}', (err, files) => {
  files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    const depth = f.split('/').length - 2;
    const up = '../'.repeat(depth) || './';

    content = content.replace(/['"][^'"]*context\/AuthContext['"]/g, '"' + up + 'context/AuthContext"');
    content = content.replace(/['"][^'"]*context\/AuxContext['"]/g, '"' + up + 'context/AuxContext"');
    content = content.replace(/['"][^'"]*services\/api['"]/g, '"' + up + 'services/api"');
    content = content.replace(/['"][^'"]*components\/common\/Icons['"]/g, '"' + up + 'components/common/Icons"');
    content = content.replace(/['"][^'"]*assets\/logo\.png['"]/g, '"' + up + 'assets/logo.png"');

    fs.writeFileSync(f, content);
  });
});
