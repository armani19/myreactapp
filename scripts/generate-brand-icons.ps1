Add-Type -AssemblyName System.Drawing
$brandRoot = Join-Path $PSScriptRoot '../public'
$brandFrames = @{}
foreach ($brandSize in @(16,32,48,64,192,512)) {
  $bitmap = New-Object System.Drawing.Bitmap($brandSize,$brandSize)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#0b1e38'))
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $font = New-Object System.Drawing.Font('Arial',($brandSize * 0.38),[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $format.FormatFlags = [System.Drawing.StringFormatFlags]::NoWrap
  $rectangle = New-Object System.Drawing.RectangleF(0,0,$brandSize,$brandSize)
  $graphics.DrawString('A.M.',$font,[System.Drawing.Brushes]::White,$rectangle,$format)
  $stream = New-Object System.IO.MemoryStream
  $bitmap.Save($stream,[System.Drawing.Imaging.ImageFormat]::Png)
  $brandFrames[$brandSize] = $stream.ToArray()
  if ($brandSize -ge 192) { [System.IO.File]::WriteAllBytes((Join-Path $brandRoot ('logo' + $brandSize + '.png')),$brandFrames[$brandSize]) }
  $stream.Dispose()
  $font.Dispose()
  $format.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}
$iconStream = [System.IO.File]::Create((Join-Path $brandRoot 'favicon.ico'))
$writer = New-Object System.IO.BinaryWriter($iconStream)
$writer.Write([uint16]0)
$writer.Write([uint16]1)
$writer.Write([uint16]4)
$offset = 70
foreach ($brandSize in @(16,32,48,64)) {
  $writer.Write([byte]$brandSize)
  $writer.Write([byte]$brandSize)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([uint16]1)
  $writer.Write([uint16]32)
  $writer.Write([uint32]$brandFrames[$brandSize].Length)
  $writer.Write([uint32]$offset)
  $offset += $brandFrames[$brandSize].Length
}
foreach ($brandSize in @(16,32,48,64)) { $writer.Write([byte[]]$brandFrames[$brandSize]) }
$writer.Dispose()
$iconStream.Dispose()
