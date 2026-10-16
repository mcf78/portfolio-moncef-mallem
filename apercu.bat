@echo off
rem Double-clic : ouvre le portfolio en local dans le navigateur.
rem Chaque fichier enregistre s'affiche instantanement, sans rien faire.
rem Fermer cette fenetre arrete l'apercu.
cd /d "%~dp0"
if not exist node_modules (
  echo Premiere utilisation : installation des outils, patiente 1 a 2 minutes...
  call npm install
)
call npm run dev -- --open
