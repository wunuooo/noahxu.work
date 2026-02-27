# deploy.ps1
# 这个脚本会自动完成提交、打包和部署到 wunuooo.github.io 的所有步骤。

# --- 配置区 ---
# 目标项目 (wunuooo.github.io) 的提交信息
$commitMessage = "Deploy: Sync updates from development project"
# 目标项目 (wunuooo.github.io) 的路径
$destinationRepoPath = "D:\Projects\wunuooo.github.io"

# --- 脚本开始 ---
$ErrorActionPreference = "Stop"
$currentRepoPath = $PSScriptRoot
Write-Host "(Step 1/5) 正在提交当前项目 (noahxu.work)..."
try {
    Set-Location $currentRepoPath
    git add .
    git commit -m "feat: Automated deployment preparation"
    git push
    Write-Host "(Success) ...提交成功！"
} catch {
    Write-Host "(Error) 错误：提交当前项目失败。"
    exit 1
}
Write-Host "(Step 2/5) 正在打包当前项目..."
try {
    Stop-Process -Name "node" -ErrorAction SilentlyContinue
    npm run build
    Write-Host "(Success) ...打包成功！"
} catch {
    Write-Host "(Error) 错误：
pm run build 执行失败。"
    exit 1
}
Write-Host "(Step 3/5) 正在将 'build' 文件夹复制到目标仓库 (并保护 .git)..."
$sourceBuildPath = Join-Path $currentRepoPath "build"
if (-not (Test-Path $destinationRepoPath)) {
    Write-Host "(Error) 错误：找不到目标仓库路径 '$destinationRepoPath'。"
    exit 1
}
try {
    robocopy $sourceBuildPath $destinationRepoPath /E /PURGE /XD .git
    Write-Host "(Success) ...复制完成！"
} catch {
    Write-Host "(Error) 错误：复制文件失败。"
    exit 1
}
Write-Host "(Step 4/5) 正在进入目标仓库并提交..."
try {
    Set-Location $destinationRepoPath
    git add .
    $status = git status --porcelain
    if ($status) {
        git commit -m $commitMessage
        Write-Host "(Success) ...已提交更新。"
    } else {
        Write-Host "(Info) ...没有检测到文件变动，无需提交。"
    }
} catch {
    Write-Host "(Error) 错误：提交目标仓库时失败。"
    exit 1
}
Write-Host "(Step 5/5) 正在推送到目标仓库的 GitHub..."
try {
    git push
    Write-Host "(Success) ...推送成功！"
} catch {
    Write-Host "(Error) 错误：推送到远程仓库失败。"
    exit 1
}
Write-Host "部署成功完成！"
