# 📊 T1 Tienda - Dashboard de Reportería

Dashboard de análisis y reportería para T1Tienda con 26 métricas clave para comercio electrónico.

![T1 Tienda](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🚀 Características

### Módulos Principales

- **📈 Resumen Ejecutivo**: Vista general con KPIs principales
- **👥 Tráfico & Conversión**: Análisis de sesiones, usuarios y embudo de conversión
- **🛍️ Productos & Colecciones**: Rendimiento de productos, búsquedas y colecciones
- **⚡ Performance Web**: Core Web Vitals (LCP, INP, CLS)
- **💰 Métricas Financieras**: Ventas, COGS, márgenes y devoluciones

### 26 Métricas Implementadas

#### Bloque A: Tráfico & Conversión
1. Sesiones
2. Usuarios Únicos
3. % Nuevos vs Recurrentes (Visitantes)
4. Tasa de Conversión (CR)
5. Embudo de Conversión

#### Bloque B: Búsqueda Interna
6. Top Términos Buscados
7. % Búsquedas Sin Resultados

#### Bloque C: Productos & Colecciones
8. Productos Más Vistos
9. Productos Más Agregados al Carrito
10. ATC% por Producto
11. Colecciones Más Visitadas

#### Bloque D: Performance Web
12. LCP (Largest Contentful Paint)
13. INP (Interaction to Next Paint)
14. CLS (Cumulative Layout Shift)
15. % URLs Good

#### Bloque E: Segmentación
16. Sesiones por Dispositivo
17. Sesiones por Estado (México)

#### Bloque F: Live View
18. Usuarios Activos Ahora

#### Bloque G: Tendencias Temporales
19. Visitantes Únicos a lo Largo del Tiempo
20. Clientes Nuevos en el Tiempo

#### Bloque H: Conversión Específica
21. Conversión de Checkout
22. Conversiones desde Búsqueda

#### Bloque I: Compradores
23. Clientes Nuevos vs Habituales (Compradores)

#### Bloque J: Métricas Financieras
24. Ventas Brutas vs Ventas Netas
25. COGS y Ganancia Bruta
26. Tasa de Devoluciones

## 🛠️ Stack Tecnológico

- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Routing**: React Router v6
- **Estilos**: Tailwind CSS 3.4
- **Gráficas**: Recharts 2.10
- **Mapas**: D3.js + D3-geo
- **Iconos**: Lucide React
- **Fechas**: date-fns

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/[tu-usuario]/reportes-tienda-en-linea.git

# Instalar dependencias
cd reportes-tienda-en-linea
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor en http://localhost:3000

# Producción
npm run build        # Genera build optimizado
npm run preview      # Preview del build de producción
```

## 🎨 Sistema de Diseño

El proyecto utiliza el sistema de diseño oficial de T1:

### Colores Principales
- **Brand Red**: #DB3B2B
- **Gray**: #C3C3C3
- **Error**: #E04C41
- **Ok**: #39B54A
- **Warning**: #F15A29
- **Blue Link**: #2980B9

### Tipografía
- **Font Family**: Manrope
- **Heading 0**: 48px
- **Heading 1**: 36px
- **Subtitle 1**: 24px
- **Subtitle 2**: 20px
- **Body 1**: 16px
- **Body 2**: 14px
- **Body 3**: 12px

## 📊 Datos de Demostración

Este proyecto utiliza datos simulados para demostración. Los generadores de datos están en `src/data/generators.js`.

## 🔧 Configuración

### Rangos de Fecha Disponibles
- Hoy
- Ayer
- Últimos 7/30/90/365 días
- Este mes / Mes pasado
- Este trimestre
- Este año (YTD)
- Rango personalizado

### Filtros Globales
- Dispositivo (Móvil/Desktop/Tablet)
- Estado (México)
- Colección
- Categoría
- Incluir órdenes de prueba

## 📱 Responsive Design

Completamente responsive con soporte para:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌐 Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

El proyecto está optimizado para despliegue en Vercel:
- Build automático con `npm run build`
- Optimización de assets
- Caché inteligente
- Edge Network

## 📄 Licencia

Proyecto privado - T1 Comercios © 2025

## 👥 Equipo

Desarrollado por el equipo de T1 Tienda

---

**Nota**: Este es un proyecto de demostración del dashboard de reportería. Los datos mostrados son simulados y no reflejan métricas reales.
