$ErrorActionPreference = "Stop"

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$localState = Join-Path $env:LOCALAPPDATA "LuxeTex"
$node = "C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Microsoft\VisualStudio\NodeJs\node.exe"
$next = Join-Path $projectRoot "node_modules\next\dist\bin\next"
$cloudflared = Join-Path $localState "cloudflared.exe"
$tokenFile = Join-Path $localState "named-tunnel.token"
$pidFile = Join-Path $localState "named-tunnel.pid"

New-Item -ItemType Directory -Path $localState -Force | Out-Null

function Test-LuxeTexWebsite {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri "http://localhost:3000/" -TimeoutSec 5
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

if (-not (Test-LuxeTexWebsite)) {
  if (-not (Test-Path -LiteralPath $node)) {
    throw "Node.js was not found at $node"
  }

  if (-not (Test-Path -LiteralPath $next)) {
    throw "Next.js was not found. Run npm install in $projectRoot first."
  }

  Start-Process `
    -WindowStyle Hidden `
    -FilePath $node `
    -ArgumentList @($next, "dev") `
    -WorkingDirectory $projectRoot `
    -RedirectStandardOutput (Join-Path $localState "website.stdout.log") `
    -RedirectStandardError (Join-Path $localState "website.stderr.log")

  for ($attempt = 1; $attempt -le 30; $attempt++) {
    Start-Sleep -Seconds 1
    if (Test-LuxeTexWebsite) {
      break
    }
  }

  if (-not (Test-LuxeTexWebsite)) {
    throw "The LuxeTex website did not start on localhost:3000."
  }
}

$configuredConnector = $null
if (Test-Path -LiteralPath $pidFile) {
  $savedProcessId = Get-Content -LiteralPath $pidFile -Raw -ErrorAction SilentlyContinue
  if ($savedProcessId -match "^\d+$") {
    $configuredConnector = Get-Process -Id ([int]$savedProcessId) -ErrorAction SilentlyContinue
  }
}

if (-not $configuredConnector) {
  if (-not (Test-Path -LiteralPath $tokenFile)) {
    throw "The private Cloudflare tunnel token file was not found."
  }

  if (-not (Test-Path -LiteralPath $cloudflared)) {
    throw "The Cloudflared executable was not found at $cloudflared"
  }

  $token = (Get-Content -LiteralPath $tokenFile -Raw).Trim()
  if (-not $token) {
    throw "The private Cloudflare tunnel token file is empty."
  }

  $connector = Start-Process `
    -WindowStyle Hidden `
    -FilePath $cloudflared `
    -ArgumentList @("tunnel", "run", "--token", $token, "--url", "http://localhost:3000") `
    -RedirectStandardOutput (Join-Path $localState "named-tunnel.stdout.log") `
    -RedirectStandardError (Join-Path $localState "named-tunnel.stderr.log") `
    -PassThru

  Set-Content `
    -LiteralPath $pidFile `
    -Value $connector.Id
}
