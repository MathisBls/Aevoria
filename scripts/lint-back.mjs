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

let hasErrors = false;

for (const service of services) {
  const servicePath = join(rootDir, service);
  console.log(`\nLinting ${service}...`);
  
  try {
    execSync('npm run lint', {
      cwd: servicePath,
      stdio: 'inherit',
    });
  } catch (error) {
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('\nSome services have linting errors');
  process.exit(1);
} else {
  console.log('\nAll backend services passed linting');
  process.exit(0);
}

