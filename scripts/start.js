/**
 * Universal Cross-Platform Launcher for English & STEM Academy
 * Runs both Backend (Express :3333) and Frontend (Vite :4444) concurrently
 * Auto-detects and installs missing dependencies for fresh clones on new machines!
 */

const { spawn, execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const npxCmd = isWindows ? 'npx.cmd' : 'npx';
const rootDir = path.resolve(__dirname, '..');
const serverDir = path.join(rootDir, 'server');
const clientDir = path.join(rootDir, 'client');

console.clear?.();
console.log('\x1b[36m%s\x1b[0m', '==============================================================');
console.log('\x1b[1m\x1b[33m%s\x1b[0m', '   🦞 English & STEM Academy (Data Center & Engineering Prep) ');
console.log('\x1b[36m%s\x1b[0m', '==============================================================');
console.log('   🌐 Frontend:   \x1b[32mhttp://localhost:4444\x1b[0m');
console.log('   ⚙️  Backend:    \x1b[34mhttp://localhost:3333/api\x1b[0m');
console.log('   💳 SCB Top-up: \x1b[35mธนาคารไทยพาณิชย์ บัญชี 415-043181-2\x1b[0m');
console.log('\x1b[36m%s\x1b[0m', '==============================================================\n');

// 0. Self-healing check for new computer / fresh clone
function ensureEnvironment() {
  // Check server/.env
  const envPath = path.join(serverDir, '.env');
  const envExamplePath = path.join(serverDir, '.env.example');
  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    console.log('\x1b[33m[SETUP] สร้างไฟล์ server/.env จาก .env.example อัตโนมัติ...\x1b[0m');
    fs.copyFileSync(envExamplePath, envPath);
  }

  // Check server node_modules
  const serverModules = path.join(serverDir, 'node_modules');
  if (!fs.existsSync(serverModules)) {
    console.log('\x1b[33m[SETUP] กำลังติดตั้ง Dependencies สำหรับ Server (ครั้งแรก)... กรุณารอสักครู่\x1b[0m');
    try {
      execSync(`${npmCmd} install`, { cwd: serverDir, stdio: 'inherit' });
      execSync(`${npxCmd} prisma generate`, { cwd: serverDir, stdio: 'inherit' });
      console.log('\x1b[32m[SETUP] ติดตั้ง Server สำเร็จ!\x1b[0m\n');
    } catch (e) {
      console.error('\x1b[31m[SETUP ERR] ติดตั้ง Server ไม่สำเร็จ:\x1b[0m', e.message);
    }
  }

  // Check client node_modules
  const clientModules = path.join(clientDir, 'node_modules');
  if (!fs.existsSync(clientModules)) {
    console.log('\x1b[33m[SETUP] กำลังติดตั้ง Dependencies สำหรับ Client (ครั้งแรก)... กรุณารอสักครู่\x1b[0m');
    try {
      execSync(`${npmCmd} install`, { cwd: clientDir, stdio: 'inherit' });
      console.log('\x1b[32m[SETUP] ติดตั้ง Client สำเร็จ!\x1b[0m\n');
    } catch (e) {
      console.error('\x1b[31m[SETUP ERR] ติดตั้ง Client ไม่สำเร็จ:\x1b[0m', e.message);
    }
  }
}

ensureEnvironment();

// 1. Launch Backend Server
const serverProc = spawn(npmCmd, ['--prefix', 'server', 'run', 'dev'], {
  cwd: rootDir,
  shell: true,
  stdio: 'pipe',
  env: { ...process.env, FORCE_COLOR: 'true' },
});

serverProc.stdout.on('data', (data) => {
  const lines = data.toString().trimEnd().split('\n');
  lines.forEach((line) => {
    if (line.trim()) console.log(`\x1b[35m[SERVER]\x1b[0m ${line}`);
  });
});

serverProc.stderr.on('data', (data) => {
  const lines = data.toString().trimEnd().split('\n');
  lines.forEach((line) => {
    if (line.trim()) console.error(`\x1b[31m[SERVER ERR]\x1b[0m ${line}`);
  });
});

// 2. Launch Frontend Client
const clientProc = spawn(npmCmd, ['--prefix', 'client', 'run', 'dev'], {
  cwd: rootDir,
  shell: true,
  stdio: 'pipe',
  env: { ...process.env, FORCE_COLOR: 'true' },
});

clientProc.stdout.on('data', (data) => {
  const lines = data.toString().trimEnd().split('\n');
  lines.forEach((line) => {
    if (line.trim()) console.log(`\x1b[36m[CLIENT]\x1b[0m ${line}`);
  });
});

clientProc.stderr.on('data', (data) => {
  const lines = data.toString().trimEnd().split('\n');
  lines.forEach((line) => {
    if (line.trim()) console.error(`\x1b[33m[CLIENT ERR]\x1b[0m ${line}`);
  });
});

// Auto open browser after 2.5s
setTimeout(() => {
  try {
    const url = 'http://localhost:4444';
    if (process.platform === 'win32') {
      spawn('cmd', ['/c', 'start', url], { stdio: 'ignore' });
    } else if (process.platform === 'darwin') {
      spawn('open', [url], { stdio: 'ignore' });
    } else {
      spawn('xdg-open', [url], { stdio: 'ignore' });
    }
  } catch (e) {}
}, 2500);

// Cleanup on exit
function cleanup() {
  console.log('\n\x1b[33mกำลังปิดระบบ Academy ทั้งหมด...\x1b[0m');
  try {
    if (isWindows) {
      if (serverProc.pid) spawn('taskkill', ['/pid', serverProc.pid, '/f', '/t']);
      if (clientProc.pid) spawn('taskkill', ['/pid', clientProc.pid, '/f', '/t']);
    } else {
      serverProc.kill('SIGTERM');
      clientProc.kill('SIGTERM');
    }
  } catch (e) {}
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
