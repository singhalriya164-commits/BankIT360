@echo off
echo ========================================================
echo   Starting BankIT360 Platform in Chrome...
echo ========================================================
start "" /b cmd /c "timeout /t 2 /nobreak >nul && (start \"\" \"C:\Program Files\Google\Chrome\Application\chrome.exe\" --profile-directory=\"Profile 5\" \"http://localhost:5173/\" || start http://localhost:5173/)"
npm run dev

