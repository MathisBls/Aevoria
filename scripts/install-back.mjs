import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const services = [
  'back/src/api-gateway',
  'back/src/services/user-service',
  'back/src/services/catalog-service',
  'back/src/services/order-service',
  'back/src/services/review-service',
  'back/src/services/blog-service',
];

console.log('Installing dependencies for backend services...\n');

let hasErrors = false;

for (const service of services) {
  const servicePath = join(rootDir, service);
  console.log(`Installing dependencies for ${service}...`);
  
  try {
    execSync('npm install', {
      cwd: servicePath,
      stdio: 'inherit',
    });
    console.log(`${service} installed successfully\n`);
  } catch (error) {
    console.error(`${service} installation failed\n`);
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('\nSome services failed to install dependencies');
  process.exit(1);
} else {
  console.log('\nAll backend services dependencies installed successfully');
  process.exit(0);
}

