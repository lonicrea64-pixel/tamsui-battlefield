param(
  [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"

if (-not $SkipInstall) {
  Write-Host "[1/3] Install dependencies"
  npm install
}

Write-Host "[2/3] Run tests"
npm run test

Write-Host "[3/3] Build frontend and backend"
npm run build

Write-Host "Preflight check passed."
