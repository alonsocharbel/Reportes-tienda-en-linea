#!/bin/bash

# 🔄 Script de Actualización - Dashboard Unificado
# Elimina react-router-dom y reinstala dependencias

echo "🔄 Actualizando proyecto a Dashboard Unificado..."
echo ""

cd /Users/alonso/Documents/Reportes-Tienda-en-Linea

echo "📦 Eliminando node_modules..."
rm -rf node_modules

echo "📦 Eliminando package-lock.json..."
rm -f package-lock.json

echo "📦 Instalando dependencias..."
npm install

echo ""
echo "✅ ¡Actualización completada!"
echo ""
echo "🚀 Para iniciar el servidor de desarrollo:"
echo "   npm run dev"
echo ""
echo "📦 Para hacer build de producción:"
echo "   npm run build"
echo ""
