# 🚀 Deploy Rápido - Tu Repositorio

Tu repositorio: **https://github.com/alonsocharbel/Reportes-tienda-en-linea.git**

---

## Opción 1: Script Automatizado (Recomendado) ⚡

Abre tu terminal y ejecuta:

```bash
cd /Users/alonso/Documents/Reportes-Tienda-en-Linea
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

¡Eso es todo! El script hará todo por ti.

---

## Opción 2: Comandos Manuales 📝

Si prefieres hacerlo manual, copia y pega estos comandos UNO POR UNO:

```bash
# 1. Navegar al proyecto
cd /Users/alonso/Documents/Reportes-Tienda-en-Linea

# 2. Inicializar Git (si no está inicializado)
git init

# 3. Agregar todos los archivos
git add .

# 4. Hacer commit
git commit -m "🎉 Initial commit - Dashboard T1Tienda con 26 métricas"

# 5. Agregar el remote (tu repositorio)
git remote add origin https://github.com/alonsocharbel/Reportes-tienda-en-linea.git

# 6. Configurar branch principal
git branch -M main

# 7. Subir el código
git push -u origin main
```

**Nota:** Te pedirá autenticación de GitHub. Usa tu usuario y contraseña (o Personal Access Token si tienes 2FA).

---

## ⚠️ Si tienes 2FA activado

1. Ve a: https://github.com/settings/tokens
2. Click en "Generate new token (classic)"
3. Selecciona los permisos: `repo`, `workflow`
4. Copia el token
5. Cuando Git te pida contraseña, pega el token (no tu contraseña)

---

## ✅ Verificar que subió correctamente

Después de hacer push, ve a tu repositorio:
**https://github.com/alonsocharbel/Reportes-tienda-en-linea**

Deberías ver todos tus archivos ahí.

---

## 🚀 Siguiente paso: Deploy en Vercel

### Opción A: Interfaz Web (Más fácil)

1. Ve a: **https://vercel.com**
2. Inicia sesión con GitHub
3. Click en **"Add New..."** → **"Project"**
4. Busca **"Reportes-tienda-en-linea"**
5. Click en **"Import"**
6. **NO cambies nada**, solo click en **"Deploy"**
7. Espera 1-2 minutos
8. ¡Listo! 🎉

Tu app estará en: `https://reportes-tienda-en-linea.vercel.app`

### Opción B: Vercel CLI (Más rápido si tienes CLI)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
cd /Users/alonso/Documents/Reportes-Tienda-en-Linea
vercel --prod
```

---

## 📊 Resultado Final

Después del deploy tendrás:

✅ **GitHub**: https://github.com/alonsocharbel/Reportes-tienda-en-linea  
✅ **Vercel App**: https://reportes-tienda-en-linea.vercel.app  
✅ **Auto-deploy**: Cada cambio que subas a GitHub se despliega automáticamente

---

## 🆘 Problemas Comunes

### "Authentication failed"
- Usa un Personal Access Token en lugar de contraseña si tienes 2FA
- Genera uno en: https://github.com/settings/tokens

### "Repository not found"
- Verifica que el repositorio exista: https://github.com/alonsocharbel/Reportes-tienda-en-linea
- Verifica que tengas permisos de escritura

### "Updates were rejected"
```bash
# Forzar push (solo si estás seguro)
git push -u origin main --force
```

---

## 🎯 ¿Todo listo?

1. ✅ Código en GitHub: https://github.com/alonsocharbel/Reportes-tienda-en-linea
2. ⏳ Deploy en Vercel: (siguiente paso)
3. 🎉 ¡App en línea!

**¡Vamos! Ejecuta el script o los comandos y avísame cuando esté listo para Vercel! 🚀**
