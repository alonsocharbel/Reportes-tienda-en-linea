#!/bin/bash

# 🚀 Script de Deploy para GitHub
# T1 Tienda - Dashboard de Reportería

echo "🎯 Iniciando proceso de subida a GitHub..."
echo ""

# Verificar si git está inicializado
if [ ! -d ".git" ]; then
    echo "📦 Inicializando repositorio Git..."
    git init
    echo "✅ Git inicializado"
else
    echo "✅ Repositorio Git ya existe"
fi

# Verificar git status
echo ""
echo "📊 Estado actual del repositorio:"
git status --short

# Preguntar al usuario el nombre de usuario de GitHub
echo ""
read -p "👤 Ingresa tu usuario de GitHub: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ Error: Debes ingresar un usuario de GitHub"
    exit 1
fi

# Preguntar el nombre del repositorio
echo ""
read -p "📁 Ingresa el nombre del repositorio (default: reportes-tienda-en-linea): " REPO_NAME
REPO_NAME=${REPO_NAME:-reportes-tienda-en-linea}

# Confirmar
echo ""
echo "📋 Resumen:"
echo "   Usuario: $GITHUB_USER"
echo "   Repositorio: $REPO_NAME"
echo "   URL: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
read -p "¿Continuar? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "❌ Cancelado por el usuario"
    exit 0
fi

# Agregar todos los archivos
echo ""
echo "📦 Agregando archivos..."
git add .

# Hacer commit
echo ""
echo "💾 Creando commit..."
git commit -m "🎉 Initial commit - Dashboard T1Tienda con 26 métricas"

# Configurar remote
echo ""
echo "🔗 Configurando remote..."
REPO_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

# Verificar si remote ya existe
if git remote | grep -q "origin"; then
    echo "⚠️  Remote 'origin' ya existe. Actualizando URL..."
    git remote set-url origin $REPO_URL
else
    git remote add origin $REPO_URL
fi

echo "✅ Remote configurado: $REPO_URL"

# Cambiar a branch main
echo ""
echo "🌿 Configurando branch main..."
git branch -M main

# Push
echo ""
echo "🚀 Subiendo código a GitHub..."
echo ""
echo "⚠️  IMPORTANTE: Necesitarás autenticarte con GitHub"
echo "   Si usas 2FA, necesitarás un Personal Access Token"
echo "   Crear token en: https://github.com/settings/tokens"
echo ""
read -p "Presiona Enter para continuar..."

git push -u origin main

# Verificar si el push fue exitoso
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Código subido exitosamente!"
    echo ""
    echo "🎉 Tu repositorio está en:"
    echo "   https://github.com/$GITHUB_USER/$REPO_NAME"
    echo ""
    echo "📋 Próximos pasos:"
    echo "   1. Ve a https://vercel.com"
    echo "   2. Importa tu repositorio"
    echo "   3. Deploy automático"
    echo ""
    echo "📖 Para más detalles, lee: DEPLOYMENT.md"
else
    echo ""
    echo "❌ Error al subir el código"
    echo "   Verifica tu usuario, contraseña/token y que el repositorio exista"
    echo ""
    echo "💡 Soluciones comunes:"
    echo "   1. Asegúrate de crear el repositorio en GitHub primero"
    echo "   2. Usa un Personal Access Token en lugar de contraseña"
    echo "   3. Verifica tu conexión a internet"
fi
