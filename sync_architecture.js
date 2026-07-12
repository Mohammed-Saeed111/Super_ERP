const fs = require('fs');
const path = require('path');

const refDir = "C:\\Users\\Admin\\OneDrive\\Desktop\\New folder\\Super-CRM";
const targetDir = "C:\\Users\\Admin\\OneDrive\\Desktop\\Super-CRM";

const ignoreList = ['node_modules', '.git', 'dist', 'build', 'coverage'];

let stats = {
  totalFoldersCompared: 0,
  totalFilesCompared: 0,
  missingFoldersCreated: [],
  placeholderFilesCreated: [],
  existingFilesPreserved: [],
  extraFiles: []
};

function walk(dir, baseDir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (ignoreList.includes(file)) continue;
      const fullPath = path.join(dir, file);
      const relPath = path.relative(baseDir, fullPath);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results.push({ type: 'dir', relPath });
        results = results.concat(walk(fullPath, baseDir));
      } else {
        results.push({ type: 'file', relPath });
      }
    }
  } catch (err) {
    // console.error("Error reading directory", dir, err);
  }
  return results;
}

const refItems = walk(refDir, refDir);
const targetItems = walk(targetDir, targetDir);

const refMap = new Map(refItems.map(item => [item.relPath, item]));
const targetMap = new Map(targetItems.map(item => [item.relPath, item]));

for (const item of refItems) {
  if (item.type === 'dir') {
    stats.totalFoldersCompared++;
    if (!targetMap.has(item.relPath)) {
      stats.missingFoldersCreated.push(item.relPath);
      fs.mkdirSync(path.join(targetDir, item.relPath), { recursive: true });
    }
  } else {
    stats.totalFilesCompared++;
    if (!targetMap.has(item.relPath)) {
      stats.placeholderFilesCreated.push(item.relPath);
      const targetFilePath = path.join(targetDir, item.relPath);
      fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });
      fs.writeFileSync(targetFilePath, `// TODO: Implement placeholder for ${path.basename(item.relPath)}\n`);
    } else {
      stats.existingFilesPreserved.push(item.relPath);
    }
  }
}

for (const item of targetItems) {
  if (item.type === 'file' && !refMap.has(item.relPath)) {
    stats.extraFiles.push(item.relPath);
  }
}

console.log(JSON.stringify(stats));
