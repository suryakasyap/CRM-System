@echo off
setlocal EnableDelayedExpansion

:start
echo ===================================
echo    CRM System Backend Launcher
echo ===================================
echo.

REM Set working directory to the script location
cd /d "%~dp0"

REM Check if Java is installed
java -version >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo ERROR: Java is not installed or not in PATH.
  echo Please install Java 17 or higher and try again.
  goto :error
)

REM Check if Maven is installed
mvn -version >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo ERROR: Maven is not installed or not in PATH.
  echo Please install Maven 3.6 or higher and try again.
  goto :error
)

REM Display menu
:menu
echo CRM Backend Launcher Menu:
echo.
echo 1. Start all services (recommended)
echo 2. Clean build and start all services
echo 3. Start Auth Service only
echo 4. Start Customer Service only
echo 5. Start API Gateway only
echo 6. Exit
echo.
echo Enter your choice (1-6):

REM Read a single keypress without displaying it
choice /c 123456 /n >nul

REM choice sets ERRORLEVEL to the index of the selected option
set CHOICE_VALUE=%ERRORLEVEL%

if %CHOICE_VALUE%==1 (
  echo Option 1 selected: Starting all services
  goto start_all
)
if %CHOICE_VALUE%==2 (
  echo Option 2 selected: Clean build and start all services
  goto clean_build
)
if %CHOICE_VALUE%==3 (
  echo Option 3 selected: Starting Auth Service
  goto start_auth
)
if %CHOICE_VALUE%==4 (
  echo Option 4 selected: Starting Customer Service
  goto start_customer
)
if %CHOICE_VALUE%==5 (
  echo Option 5 selected: Starting API Gateway
  goto start_gateway
)
if %CHOICE_VALUE%==6 (
  echo Option 6 selected: Exiting
  goto :eof
)

:clean_build
echo.
echo Building the CRM System Backend...
call mvn clean install -DskipTests

if %ERRORLEVEL% neq 0 (
  echo.
  echo Build failed! Please check the errors above.
  goto :error
)

echo.
echo Build successful!
goto start_all

:start_all
echo.
echo Starting all backend services...
echo.
echo To stop the services, close their terminal windows.
echo.

REM Check if ports are already in use
netstat -ano | findstr :8081 >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo WARNING: Port 8081 is already in use. Auth Service might fail to start.
)

netstat -ano | findstr :8082 >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo WARNING: Port 8082 is already in use. Customer Service might fail to start.
)

netstat -ano | findstr :8080 >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo WARNING: Port 8080 is already in use. API Gateway might fail to start.
)

echo.
echo Starting Auth Service...
start "Auth Service" cmd /k "cd auth-service && mvn spring-boot:run"
echo Auth Service window opened...
timeout /t 10 /nobreak >nul 2>&1
echo.

echo Starting Customer Service...
start "Customer Service" cmd /k "cd customer-service && mvn spring-boot:run"
echo Customer Service window opened...
timeout /t 10 /nobreak >nul 2>&1
echo.

echo Starting API Gateway...
start "API Gateway" cmd /k "cd api-gateway && mvn spring-boot:run"
echo API Gateway window opened...
echo.

echo All services are starting! This may take a moment...
echo.
echo Service URLs:
echo - Auth Service: http://localhost:8081
echo - Customer Service: http://localhost:8082
echo - API Gateway: http://localhost:8080 (Use this for API calls)
echo.
echo Default admin credentials:
echo - Username: admin
echo - Password: admin123
echo.
echo Press any key to return to the menu...
pause >nul
cls
goto menu

:start_auth
echo.
echo Starting Auth Service...
start "Auth Service" cmd /k "cd auth-service && mvn spring-boot:run"
echo.
echo Auth Service starting at http://localhost:8081
echo.
echo Press any key to return to the menu...
pause >nul
cls
goto menu

:start_customer
echo.
echo Starting Customer Service...
start "Customer Service" cmd /k "cd customer-service && mvn spring-boot:run"
echo.
echo Customer Service starting at http://localhost:8082
echo.
echo Press any key to return to the menu...
pause >nul
cls
goto menu

:start_gateway
echo.
echo Starting API Gateway...
start "API Gateway" cmd /k "cd api-gateway && mvn spring-boot:run"
echo.
echo API Gateway starting at http://localhost:8080
echo.
echo Press any key to return to the menu...
pause >nul
cls
goto menu

:error
echo.
echo Press any key to exit...
pause >nul
exit /b 1 