@echo off
rem Double-clic : envoie le portfolio sur GitHub. GitHub reconstruit le site
rem et https://mcf78.github.io/ se met a jour tout seul en 1 a 2 minutes.
cd /d "%~dp0"
git add -A
git commit -m "Mise a jour du portfolio" >nul 2>&1
git push -u origin main
if errorlevel 1 (
  echo.
  echo [ERREUR] L'envoi a echoue. Verifie ta connexion et que le depot mcf78.github.io existe sur GitHub.
) else (
  echo.
  echo Envoye ! Attends 1 a 2 minutes puis actualise https://mcf78.github.io/
)
echo.
pause
