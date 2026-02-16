@echo off
setlocal enabledelayedexpansion

echo 🎉 Setting up Nyaya-Mitra FREE Version...

if exist backend\server-free.js (
  copy /Y backend\server-free.js backend\server.js >nul
  echo ✔ Copied backend\server-free.js to backend\server.js
) else (
  echo ⚠ backend\server-free.js not found, keeping existing backend\server.js
)

if exist backend\controllers\documentController-free.js (
  copy /Y backend\controllers\documentController-free.js backend\controllers\documentController.js >nul
  echo ✔ Copied backend\controllers\documentController-free.js to backend\controllers\documentController.js
) else (
  echo ⚠ backend\controllers\documentController-free.js not found, keeping existing documentController.js
)

if exist frontend\src\App-free.jsx (
  copy /Y frontend\src\App-free.jsx frontend\src\App.jsx >nul
  echo ✔ Copied frontend\src\App-free.jsx to frontend\src\App.jsx
) else (
  echo ⚠ frontend\src\App-free.jsx not found, keeping existing App.jsx
)

if not exist backend\.env (
  echo PORT=5000> backend\.env
  echo NODE_ENV=development>> backend\.env
  echo # FREE mode active>> backend\.env
  echo CORS_ORIGIN=http://localhost:5173>> backend\.env
  echo MAX_FILE_SIZE=10485760>> backend\.env
  echo ✔ Created backend\.env
)

if not exist frontend\.env (
  echo VITE_API_URL=http://localhost:5000> frontend\.env
  echo ✔ Created frontend\.env
)

echo FREE MODE ACTIVE> FREE_MODE_ACTIVE.txt

echo ✅ Nyaya-Mitra FREE Version is ready!
echo Next steps: install dependencies in backend and frontend, then run dev servers.
endlocal
