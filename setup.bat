@echo off
chcp 65001 > nul
title ติดตั้งระบบ English & STEM Academy
echo ===============================================================
echo    🦞 กำลังติดตั้ง Dependencies สำหรับเครื่องใหม่...
echo ===============================================================

echo [1/3] กำลังติดตั้ง Server Dependencies...
cd server
call npm install
call npx prisma generate
cd ..

echo [2/3] กำลังติดตั้ง Client Dependencies...
cd client
call npm install
cd ..

echo [3/3] ตรวจสอบฐานข้อมูล SQLite...
if not exist "server\.env" (
    copy "server\.env.example" "server\.env"
)

echo ===============================================================
echo    ✅ ติดตั้งสำเร็จทั้งหมดแล้ว!
echo    👉 กดดับเบิลคลิกไฟล์ start.bat เพื่อเริ่มใช้งานได้เลย
echo ===============================================================
pause
