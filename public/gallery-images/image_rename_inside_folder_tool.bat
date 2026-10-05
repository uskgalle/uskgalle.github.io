@echo off
setlocal EnableDelayedExpansion

set count=1

for %%f in (*.png *.jpg *.jpeg *.webp) do (
    ren "%%f" "__temp_!count!%%~xf"
    set /a count+=1
)

set count=1

for %%f in (__temp_*) do (
    ren "%%f" "!count!%%~xf"
    set /a count+=1
)

echo.
echo Done! Renamed images from 1 to %count%.
pause