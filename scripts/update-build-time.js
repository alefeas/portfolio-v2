const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const now = new Date().toISOString();
const envContent = `NEXT_PUBLIC_BUILD_TIME=${now}\n`;

fs.writeFileSync(envPath, envContent);
console.log(`Build time updated: ${now}`);
