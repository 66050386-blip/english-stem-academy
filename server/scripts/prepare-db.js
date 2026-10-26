const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

const dbUrl = process.env.DATABASE_URL || '';
const isPostgres = dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://');

console.log(`\n======================================================`);
console.log(`[Database Auto-Config] Target: ${isPostgres ? 'PostgreSQL (Supabase / Render Cloud)' : 'SQLite (Local Development)'}`);
console.log(`======================================================`);

const currentProvider = schema.includes('provider = "postgresql"') ? 'postgresql' : 'sqlite';
const targetProvider = isPostgres ? 'postgresql' : 'sqlite';

if (currentProvider !== targetProvider) {
  if (isPostgres) {
    schema = schema.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"');
  } else {
    schema = schema.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');
  }
  fs.writeFileSync(schemaPath, schema, 'utf8');
  console.log(`✓ schema.prisma datasource provider set to: "${targetProvider}"`);
} else {
  console.log(`✓ schema.prisma already configured for: "${targetProvider}"`);
}

// 1. Generate Prisma Client
console.log('Generating Prisma Client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
} catch (err) {
  console.warn('⚠️ Prisma generate skipped or locked by local running process (safe in local dev):', err.message);
}

// 2. Automatically sync database schema on Cloud (Render / Supabase)
if (isPostgres) {
  console.log('Synchronizing schema to Supabase PostgreSQL database...');
  try {
    execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });
    console.log('✓ Database schema synchronized successfully with Supabase PostgreSQL!');
    
    console.log('Checking and seeding initial data to Supabase...');
    try {
      execSync('node prisma/seed.js', { stdio: 'inherit' });
      console.log('✓ Initial data and accounts seeded successfully!');
    } catch (seedErr) {
      console.warn('⚠️ Seed notice:', seedErr.message);
    }
  } catch (err) {
    console.warn('⚠️ Note on db push:', err.message);
  }
}
console.log(`======================================================\n`);
