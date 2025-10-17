# ✅ Checklist Pre-Deployment

## 🔍 Verificación antes de subir a GitHub

### Archivos y Configuración
- [x] `.gitignore` configurado correctamente
- [x] `README.md` actualizado con documentación
- [x] `package.json` con todos los scripts necesarios
- [x] `vercel.json` creado para configuración de Vercel
- [x] `.env.example` creado (sin credenciales reales)
- [ ] Sin archivos `.env` con credenciales reales en el repo

### Código
- [x] Todos los archivos JSX tienen extensión `.jsx`
- [x] No hay errores de sintaxis
- [ ] El proyecto compila sin errores: `npm run build`
- [ ] El proyecto corre sin errores: `npm run dev`
- [ ] No hay console.errors visibles
- [ ] Todas las importaciones funcionan correctamente

### Funcionalidad
- [ ] Todas las páginas cargan correctamente
  - [ ] Dashboard
  - [ ] Tráfico
  - [ ] Productos  
  - [ ] Performance
  - [ ] Financiero
- [ ] Los filtros de fecha funcionan
- [ ] Los filtros de dispositivo funcionan
- [ ] Las gráficas se renderizan
- [ ] Las tablas muestran datos
- [ ] El responsive funciona en móvil

### Limpieza
- [ ] Sin `node_modules` en el repositorio (verificar .gitignore)
- [ ] Sin archivos de sistema (.DS_Store, etc.)
- [ ] Sin TODO o comentarios de desarrollo visibles
- [ ] Sin console.log innecesarios

---

## 🚀 Verificación Post-Deploy (Vercel)

### Después de desplegar en Vercel, verifica:

- [ ] El sitio carga en la URL de Vercel
- [ ] No hay errores 404
- [ ] Las rutas funcionan (refresh en /traffic, /products, etc.)
- [ ] Los assets cargan (imágenes, fuentes, iconos)
- [ ] No hay errores en la consola del navegador
- [ ] El performance es aceptable (< 3s LCP)
- [ ] Funciona en diferentes navegadores:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] Responsive en diferentes dispositivos:
  - [ ] Desktop (1920x1080)
  - [ ] Tablet (768x1024)
  - [ ] Mobile (375x667)

---

## 📝 Comandos de Verificación

Ejecuta estos comandos antes de hacer deploy:

```bash
# 1. Limpiar e instalar dependencias
rm -rf node_modules package-lock.json
npm install

# 2. Verificar que build funciona
npm run build

# 3. Verificar que dev funciona
npm run dev
# Abre http://localhost:3000 y prueba todas las páginas

# 4. Verificar preview del build
npm run preview
# Abre http://localhost:4173 y prueba todas las páginas
```

---

## ⚠️ Problemas Comunes

### Build falla
```bash
# Solución: Verificar dependencias
npm install
npm run build -- --debug
```

### Rutas no funcionan en Vercel
- ✅ Ya está resuelto con `vercel.json` con rewrites

### Assets no cargan
- Verificar rutas en `index.html`
- Verificar que `public` esté en el lugar correcto

---

## 🎯 ¿Todo listo?

Si todos los checkboxes están marcados, ¡estás listo para desplegar!

```bash
# Opción 1: Usar el script automatizado
chmod +x deploy-github.sh
./deploy-github.sh

# Opción 2: Manual (sigue DEPLOYMENT.md)
```

¡Éxito! 🚀
