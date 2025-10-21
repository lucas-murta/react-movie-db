# Script para testar deploy S3 localmente
# Simula o ambiente do GitHub Actions

Write-Host "🚀 Testando Deploy S3 Localmente" -ForegroundColor Green

# Verificar se as variáveis de ambiente estão definidas
$requiredVars = @("AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION", "S3_BUCKET")
$missingVars = @()

foreach ($var in $requiredVars) {
    if (-not (Get-ChildItem Env: | Where-Object Name -eq $var)) {
        $missingVars += $var
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host "❌ Variáveis de ambiente faltando:" -ForegroundColor Red
    foreach ($var in $missingVars) {
        Write-Host "   - $var" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "Configure as variáveis antes de executar:" -ForegroundColor Cyan
    Write-Host '$env:AWS_ACCESS_KEY_ID = "sua-access-key"' -ForegroundColor Gray
    Write-Host '$env:AWS_SECRET_ACCESS_KEY = "sua-secret-key"' -ForegroundColor Gray
    Write-Host '$env:AWS_REGION = "us-east-1"' -ForegroundColor Gray
    Write-Host '$env:S3_BUCKET = "seu-bucket-name"' -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Variáveis de ambiente configuradas" -ForegroundColor Green

# Verificar se AWS CLI está instalado
try {
    aws --version | Out-Null
    Write-Host "✅ AWS CLI encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI não encontrado" -ForegroundColor Red
    Write-Host "Instale o AWS CLI: https://aws.amazon.com/cli/" -ForegroundColor Yellow
    exit 1
}

# Build do projeto
Write-Host "🔨 Fazendo build do projeto..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build concluído" -ForegroundColor Green

# Verificar se pasta dist existe
if (-not (Test-Path "dist")) {
    Write-Host "❌ Pasta dist não encontrada" -ForegroundColor Red
    exit 1
}

# Teste de conexão AWS
Write-Host "🔍 Testando conexão AWS..." -ForegroundColor Blue
try {
    aws sts get-caller-identity | Out-Null
    Write-Host "✅ Conexão AWS OK" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro na conexão AWS" -ForegroundColor Red
    Write-Host "Verifique suas credenciais" -ForegroundColor Yellow
    exit 1
}

# Dry run do sync
Write-Host "🧪 Executando dry-run do sync..." -ForegroundColor Blue
aws s3 sync dist/ s3://$env:S3_BUCKET/ --delete --dryrun

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dry-run bem-sucedido!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para executar o deploy real, execute:" -ForegroundColor Cyan
    Write-Host "aws s3 sync dist/ s3://$env:S3_BUCKET/ --delete" -ForegroundColor Gray
} else {
    Write-Host "❌ Erro no dry-run" -ForegroundColor Red
}