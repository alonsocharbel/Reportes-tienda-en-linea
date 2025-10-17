#!/bin/bash

# 🚀 Deploy to GitHub - Reportes Tienda en Línea
# Repository: https://github.com/alonsocharbel/Reportes-tienda-en-linea.git

echo "🎯 Iniciando deploy a GitHub..."
echo ""

# Navegar al directorio del proyecto
cd /Users/alonso/Documents/Reportes-Tienda-en-Linea

# Verificar si git está inicializado
if [ ! -d ".git" ]; then
    echo "📦 Inicializando repositorio Git..."
    git init
    echo "✅ Git inicializado"
else
    echo "✅ Repositorio Git ya existe"
fi

# Agregar todos los archivos
echo ""
echo "📦 Agregando archivos al staging area..."
git add .

# Mostrar estado
echo ""
echo "📊 Archivos a subir:"
git status --short

# Hacer commit
echo ""
echo "💾 Creando commit..."
git commit -m "🎉 Initial commit - Dashboard T1Tienda con 26 métricas

- 26 métricas implementadas
- 5 módulos principales
- Sistema de diseño T1
- Responsive design completo
- Datos simulados para demostración"

# Configurar remote
echo ""
echo "🔗 Configurando remote con tu repositorio..."
REPO_URL="https://github.com/alonsocharbel/Reportes-tienda-en-linea.git"

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
echo "⚠️  IMPORTANTE: Se abrirá el navegador para autenticarte con GitHub"
echo ""

git push -u origin main

# Verificar si el push fue exitoso
if [ $? -eq 0 ]; then
    echo ""
    echo "✅✅✅ ¡CÓDIGO SUBIDO EXITOSAMENTE! ✅✅✅"
    echo ""
    echo "🎉 Tu repositorio está en:"
    echo "   https://github.com/alonsocharbel/Reportes-tienda-en-linea"
    echo ""
    echo "📋 PRÓXIMOS PASOS:"
    echo "   1. Ve a https://vercel.com"
    echo "   2. Inicia sesión con tu cuenta de GitHub"
    echo "   3. Click en 'Add New...' → 'Project'"
    echo "   4. Selecciona 'Reportes-tienda-en-linea'"
    echo "   5. Click en 'Deploy'"
    echo "   6. ¡Listo en 2 minutos! 🚀"
    echo ""
    echo "📖 Para más detalles, lee: DEPLOYMENT.md"
    echo ""
else
    echo ""
    echo "❌ Error al subir el código"
    echo ""
    echo "💡 SOLUCIONES:"
    echo "   1. Verifica que tengas acceso al repositorio"
    echo "   2. Asegúrate de estar autenticado en GitHub"
    echo "   3. Si usas 2FA, necesitarás un Personal Access Token"
    echo "      Créalo en: https://github.com/settings/tokens"
    echo ""
fi
