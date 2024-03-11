# Start backend
cd .\backend
Start-Process npm -ArgumentList "start"

# Start frontend
Start-Process cmd "/k cd ..\frontend && npm run dev"
