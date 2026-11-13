# Membangun versi web mandiri (PWA) dari prototipe/pasar-pintar.html
# Jalankan di PowerShell:  powershell -ExecutionPolicy Bypass -File .\build-web.ps1
# Hasil: folder web/ (index.html, ikon). manifest.webmanifest dan sw.js sudah ada di folder web/.

$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$src = Join-Path $dir 'pasar-pintar.html'
$out = Join-Path $dir 'web'
New-Item -ItemType Directory -Force $out | Out-Null

# 1. index.html: bagian sebelum <div id="app"> masuk ke <head>, sisanya ke <body>
$isi = [System.IO.File]::ReadAllText($src, [System.Text.Encoding]::UTF8)
$penanda = '<div id="app"></div>'
$pos = $isi.IndexOf($penanda)
if ($pos -lt 0) { throw "Penanda '$penanda' tidak ditemukan di pasar-pintar.html" }
$kepala = $isi.Substring(0, $pos)
$badan = $isi.Substring($pos)

$headExtra = @'
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Belajar Aritmetika Sosial sambil belanja dan berjualan.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png" type="image/png">
<link rel="apple-touch-icon" href="icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Pasar Pintar">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<style>
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0}
img{max-width:100%}
[hidden]{display:none!important}
</style>
<script>window.PP_WEB = true;</script>
'@

$bodyExtra = @'
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
}
</script>
'@

$html = "<!doctype html>`n<html lang=`"id`">`n<head>`n$headExtra$kepala</head>`n<body>`n$badan`n$bodyExtra</body>`n</html>`n"
[System.IO.File]::WriteAllText((Join-Path $out 'index.html'), $html, (New-Object System.Text.UTF8Encoding($false)))

# 2. Ikon PNG 192 dan 512 (kotak hijau toska dengan tulisan "Rp%")
Add-Type -AssemblyName System.Drawing
function Buat-Ikon([int]$ukuran, [string]$file) {
  $bmp = New-Object System.Drawing.Bitmap $ukuran, $ukuran
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml('#0F766E'))
  # lingkaran label harga di tengah (aman untuk ikon maskable)
  $m = [int]($ukuran * 0.2)
  $kuas = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#FFFFFF'))
  $g.FillEllipse($kuas, $m, $m, $ukuran - 2 * $m, $ukuran - 2 * $m)
  $font = New-Object System.Drawing.Font('Segoe UI', [single]($ukuran * 0.2), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = 'Center'; $sf.LineAlignment = 'Center'
  $teks = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#0F766E'))
  $g.DrawString('Rp%', $font, $teks, (New-Object System.Drawing.RectangleF 0, 0, $ukuran, $ukuran), $sf)
  $bmp.Save($file, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}
Buat-Ikon 192 (Join-Path $out 'icon-192.png')
Buat-Ikon 512 (Join-Path $out 'icon-512.png')

Write-Output "Selesai. Folder siap diunggah: $out"
Get-ChildItem $out | Select-Object Name, Length | Format-Table -AutoSize
