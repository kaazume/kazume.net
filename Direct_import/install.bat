@echo off
setlocal enabledelayedexpansion

:: Check if running with administrator privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting administrator privileges...
    powershell Start-Process -Verb RunAs -FilePath "%0" -ArgumentList "%*" && exit /b
)

:: Set variables
set "folderPath=C:\Direct_import"
set "downloadURL=https://kazume.net/Direct_import/v0.1/app.exe"
set "registryKey=HKEY_CLASSES_ROOT\Direct_import"
set "registrySubkey=shell\open\command"
set "defaultValue=\"C:\Direct_import\app.exe\" \"%%1\""

:: Create folder if it doesn't exist
if not exist "%folderPath%" (
    echo Creating folder: %folderPath%
    mkdir "%folderPath%"
)

:: Download the file
echo Downloading file from: %downloadURL%
powershell -Command "(New-Object Net.WebClient).DownloadFile('%downloadURL%', '%folderPath%\app.exe')"

:: Set registry values
echo Setting registry values...
reg add "%registryKey%" /ve /d "%defaultValue%" /f

echo Script completed successfully.
exit /b 0
