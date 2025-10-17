# 🚀 Guía de Deployment - GitHub + Vercel

## Parte 1: Subir a GitHub

### Opción A: Crear repositorio desde GitHub (Recomendado)

1. **Ve a GitHub.com y crea un nuevo repositorio**
   - Ve a: https://github.com/new
   - Nombre: `reportes-tienda-en-linea` (o el que prefieras)
   - Descripción: "Dashboard de Reportería T1Tienda - 26 métricas clave"
   - **Importante**: NO inicialices con README, .gitignore o licencia (ya los tienes)
   - Visibilidad: Private (recomendado) o Public
   - Click en "Create repository"

2. **En tu terminal, navega al proyecto**
   ```bash
   cd /Users/alonso/Documents/Reportes-Tienda-en-Linea
   ```

3. **Inicializa Git (si no está inicializado)**
   ```bash
   git init
   ```

4. **Agrega todos los archivos**
   ```bash
   git add .
   ```

5. **Haz el primer commit**
   ```bash
   git commit -m "🎉 Initial commit - Dashboard T1Tienda con 26 métricas"
   ```

6. **Conecta con tu repositorio de GitHub**
   ```bash
   # Reemplaza [tu-usuario] con tu usuario de GitHub
   git remote add origin https://github.com/[tu-usuario]/reportes-tienda-en-linea.git
   ```

7. **Sube el código**
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Opción B: GitHub CLI (más rápido si tienes gh instalado)

```bash
cd /Users/alonso/Documents/Reportes-Tienda-en-Linea

# Inicializar Git
git init
git add .
git commit -m "🎉 Initial commit - Dashboard T1Tienda con 26 métricas"

# Crear repositorio y subir en un solo comando
gh repo create reportes-tienda-en-linea --private --source=. --push
```

---

## Parte 2: Deploy en Vercel

### Opción A: Desde la interfaz web de Vercel (Recomendado para principiantes)

1. **Ve a Vercel y regístrate/inicia sesión**
   - Ve a: https://vercel.com
   - Inicia sesión con tu cuenta de GitHub

2. **Importa tu proyecto**
   - Click en "Add New..." → "Project"
   - Busca y selecciona tu repositorio `reportes-tienda-en-linea`
   - Click en "Import"

3. **Configura el proyecto**
   Vercel detectará automáticamente que es un proyecto Vite y configurará:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   
   ✅ No necesitas cambiar nada, solo confirma.

4. **Deploy**
   - Click en "Deploy"
   - Espera 1-2 minutos mientras Vercel construye tu app
   - ¡Listo! 🎉 Tendrás una URL como: `https://reportes-tienda-en-linea.vercel.app`

### Opción B: Vercel CLI (más rápido si tienes vercel CLI instalado)

```bash
# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# En la carpeta del proyecto
cd /Users/alonso/Documents/Reportes-Tienda-en-Linea

# Deploy
vercel

# Sigue las instrucciones en pantalla:
# - Link to existing project? No
# - Project name: reportes-tienda-en-linea
# - Which directory: ./ (presiona Enter)
# - Override settings? No

# Para production:
vercel --prod
```

---

## 📋 Checklist Post-Deploy

Después de desplegar, verifica:

- [ ] El sitio carga correctamente en la URL de Vercel
- [ ] Todas las páginas funcionan (Dashboard, Tráfico, Productos, Performance, Financiero)
- [ ] Los filtros de fecha funcionan
- [ ] Las gráficas se renderizan correctamente
- [ ] El responsive funciona en móvil
- [ ] No hay errores en la consola del navegador

---

## 🔄 Flujo de trabajo después del deploy inicial

Cada vez que hagas cambios:

```bash
# 1. Haz tus cambios en el código
# 2. Guarda los cambios
git add .
git commit -m "✨ Descripción de tus cambios"
git push

# 3. Vercel desplegará automáticamente 🚀
```

Vercel detecta automáticamente los push a `main` y redespliega tu app.

---

## 🎯 URLs Importantes

Después del deploy, tendrás:

- **Production**: `https://reportes-tienda-en-linea.vercel.app`
- **Dashboard de Vercel**: `https://vercel.com/[tu-usuario]/reportes-tienda-en-linea`
- **GitHub Repo**: `https://github.com/[tu-usuario]/reportes-tienda-en-linea`

---

## 🔧 Configuración Avanzada (Opcional)

### Custom Domain
En Vercel Dashboard → Settings → Domains:
- Agrega tu dominio personalizado (ej: `reportes.t1.com`)

### Environment Variables
En Vercel Dashboard → Settings → Environment Variables:
- Agrega variables de producción si las necesitas

### Analytics
En Vercel Dashboard → Analytics:
- Activa Vercel Analytics para métricas reales

---

## ❓ Troubleshooting

### Error: "Module not found"
```bash
# Limpia e instala dependencias
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "🔧 Fix dependencies"
git push
```

### Error: "Build failed"
- Revisa los logs en Vercel Dashboard
- Asegúrate que `npm run build` funcione localmente primero
- Verifica que todas las dependencias estén en `package.json`

### Error 404 en rutas
- Ya está configurado en `vercel.json` con rewrites
- Si persiste, contacta soporte de Vercel

---

## 🎉 ¡Listo!

Tu dashboard está en línea y listo para compartir. Cualquier cambio que hagas y subas a GitHub se desplegará automáticamente en Vercel.

**Comparte tu URL con el equipo**: `https://reportes-tienda-en-linea.vercel.app`
