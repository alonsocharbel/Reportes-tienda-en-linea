# 📊 T1 Tienda - Dashboard de Reportería

Dashboard unificado de análisis y reportería para T1Tienda con 22 métricas clave para comercio electrónico en una sola vista.

![T1 Tienda](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🚀 Características

### Dashboard Unificado
- **Vista única con scroll continuo**: Todas las métricas en una sola página
- **Sin pestañas ni navegación lateral**: Experiencia fluida y directa
- **22 métricas implementadas**: Todo lo necesario para análisis completo

### Módulos Integrados

#### 📈 Resumen Ejecutivo
- Sesiones y usuarios únicos
- Tasa de conversión global
- Ventas netas y AOV
- Usuarios activos en tiempo real
- Ganancia bruta y margen
- Tasa de devoluciones

#### 🎯 Embudo de Conversión
- Landing → PDP → ATC → Checkout → Purchase
- Visualización clara de caídas
- Insights automáticos de optimización

#### 👥 Tráfico & Conversión
- Evolución de sesiones y usuarios
- Gráficas temporales interactivas
- Análisis de tendencias

#### 🔍 Búsqueda Interna
- Top términos buscados
- Tasa de búsquedas sin resultados
- CTR a páginas de producto
- Detección de gaps en catálogo

#### 🛍️ Productos & Colecciones
- Productos más vistos
- Productos más agregados al carrito
- ATC% por producto
- Colecciones más visitadas
- Análisis de rendimiento por SKU

#### 📱 Segmentación
- Distribución por dispositivo (Móvil/Desktop/Tablet)
- Análisis por ubicación
- Conversión por segmento

#### 💰 Métricas Financieras
- Ventas brutas vs netas
- COGS y ganancia bruta por producto
- Márgenes de rentabilidad
- Tasa de devoluciones por producto
- Alertas de márgenes críticos

## 📊 22 Métricas Implementadas

### Bloque A: Tráfico & Conversión
1. Sesiones
2. Usuarios Únicos
3. % Nuevos vs Recurrentes (Visitantes)
4. Tasa de Conversión (CR)
5. Embudo de Conversión

### Bloque B: Búsqueda Interna
6. Top Términos Buscados
7. % Búsquedas Sin Resultados

### Bloque C: Productos & Colecciones
8. Productos Más Vistos
9. Productos Más Agregados al Carrito
10. ATC% por Producto
11. Colecciones Más Visitadas

### Bloque D: Segmentación
12. Sesiones por Dispositivo
13. Sesiones por Estado (México)

### Bloque E: Live View
14. Usuarios Activos Ahora

### Bloque F: Tendencias Temporales
15. Visitantes Únicos a lo Largo del Tiempo
16. Clientes Nuevos en el Tiempo

### Bloque G: Conversión Específica
17. Conversión de Checkout
18. Conversiones desde Búsqueda

### Bloque H: Compradores
19. Clientes Nuevos vs Habituales (Compradores)

### Bloque I: Métricas Financieras
20. Ventas Brutas vs Ventas Netas
21. COGS y Ganancia Bruta
22. Tasa de Devoluciones

## 🛠️ Stack Tecnológico

- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Estilos**: Tailwind CSS 3.4
- **Gráficas**: Recharts 2.10
- **Mapas**: D3.js + D3-geo
- **Iconos**: Lucide React
- **Fechas**: date-fns

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/alonsocharbel/Reportes-tienda-en-linea.git

# Instalar dependencias
cd Reportes-tienda-en-linea
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

## 🌐 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Con Vercel CLI
vercel --prod
```

El proyecto está optimizado para despliegue en Vercel:
- Build automático con `npm run build`
- Optimización de assets
- Caché inteligente
- Edge Network

### URL de Producción
**https://reportes-tienda-en-linea.vercel.app**

## 🔄 Workflow de Desarrollo

```bash
# 1. Hacer cambios en el código
# 2. Guardar cambios en Git
git add .
git commit -m "✨ Descripción del cambio"
git push

# 3. Vercel despliega automáticamente
```

## 📄 Estructura del Proyecto

```
src/
├── components/
│   ├── common/          # Componentes reutilizables
│   │   ├── Chart.jsx
│   │   ├── DataTable.jsx
│   │   └── MetricCard.jsx
│   └── layout/          # Componentes de layout
│       └── Header.jsx
├── data/
│   └── generators.js    # Generadores de datos simulados
├── hooks/
│   ├── useDateRange.jsx # Hook de rangos de fecha
│   ├── useFilters.jsx   # Hook de filtros
│   └── useMetrics.jsx   # Hook de métricas
├── pages/
│   └── UnifiedDashboard.jsx  # Dashboard unificado
├── styles/
│   └── colors.js        # Sistema de colores T1
├── utils/
│   └── formatters.js    # Utilidades de formato
├── App.jsx              # Componente principal
└── main.jsx             # Entry point
```

## 🎯 Mejoras Futuras

- [ ] Integración con API real de T1Tienda
- [ ] Exportación de reportes en PDF/Excel
- [ ] Filtros avanzados por categoría y colección
- [ ] Comparación de períodos personalizados
- [ ] Alertas y notificaciones automáticas
- [ ] Dashboard personalizable (drag & drop de widgets)

## 📄 Licencia

Proyecto privado - T1 Comercios © 2025

## 👥 Equipo

Desarrollado por el equipo de T1 Tienda

---

**Nota**: Este es un proyecto de demostración del dashboard de reportería. Los datos mostrados son simulados y no reflejan métricas reales.
