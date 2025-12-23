const fs = require('fs');
const path = require('path');

const itemsToClean = [
  '.next',
  'out',
  '*.tsbuildinfo'
];

function removeItem(item) {
  const itemPath = path.resolve(process.cwd(), item);
  
  try {
    if (fs.existsSync(itemPath)) {
      if (fs.statSync(itemPath).isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`✓ Removed directory: ${item}`);
      } else {
        fs.unlinkSync(itemPath);
        console.log(`✓ Removed file: ${item}`);
      }
    }
  } catch (error) {
    // Silently continue if item doesn't exist or can't be removed
  }
}

// Handle glob patterns
if (itemsToClean.some(item => item.includes('*'))) {
  const globPatterns = itemsToClean.filter(item => item.includes('*'));
  const exactItems = itemsToClean.filter(item => !item.includes('*'));
  
  // Remove exact items first
  exactItems.forEach(removeItem);
  
  // Handle glob patterns (tsbuildinfo files)
  const cwd = process.cwd();
  try {
    const files = fs.readdirSync(cwd);
    files.forEach(file => {
      if (file.endsWith('.tsbuildinfo')) {
        removeItem(file);
      }
    });
  } catch (error) {
    // Ignore readdir errors
  }
} else {
  itemsToClean.forEach(removeItem);
}

console.log('✓ Clean complete!');
