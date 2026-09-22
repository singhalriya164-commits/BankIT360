Write-Host "Starting BankIT360 Platform in Riya Singhal Chrome..." -ForegroundColor Cyan
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList '--profile-directory="Profile 5"', 'http://localhost:5173/'
npm run dev
