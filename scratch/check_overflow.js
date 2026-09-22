const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

// Find all width/min-width rules that might exceed mobile screens
const lines = css.split('\n');
lines.forEach((line, index) => {
  if (line.match(/(min-width:\s*\d{3,}px|width:\s*\d{4,}px)/i)) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
