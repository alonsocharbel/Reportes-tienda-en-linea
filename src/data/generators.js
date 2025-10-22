// Generadores de datos mock para todas las métricas
import { subDays, startOfDay, format, addHours } from 'date-fns';

// Helper: generar número aleatorio
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => Math.random() * (max - min) + min;

// Helper: generar tendencia (puede subir, bajar o ser estable)
const generateTrend = (baseValue, days, trend = 'stable') => {
  const data = [];
  let value = baseValue;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = startOfDay(subDays(new Date(), i));
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Variación diaria (menor en fines de semana)
    const variance = isWeekend ? 0.8 : 1.0;
    const dailyVariance = randomFloat(0.9, 1.1) * variance;
    
    // Aplicar tendencia
    if (trend === 'up') {
      value *= 1.002; // Crece 0.2% diario
    } else if (trend === 'down') {
      value *= 0.998; // Decrece 0.2% diario
    }
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      value: Math.round(value * dailyVariance),
    });
  }
  
  return data;
};

// Estados de México
export const ESTADOS_MEXICO = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México',
  'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
  'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora',
  'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

// Productos de ejemplo
const SAMPLE_PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro', price: 24999, category: 'Electrónica', brand: 'Apple' },
  { id: 2, name: 'Samsung Galaxy S24', price: 19999, category: 'Electrónica', brand: 'Samsung' },
  { id: 3, name: 'MacBook Air M3', price: 29999, category: 'Computadoras', brand: 'Apple' },
  { id: 4, name: 'Sony WH-1000XM5', price: 7999, category: 'Audio', brand: 'Sony' },
  { id: 5, name: 'AirPods Pro', price: 5499, category: 'Audio', brand: 'Apple' },
  { id: 6, name: 'iPad Pro 12.9"', price: 26999, category: 'Tablets', brand: 'Apple' },
  { id: 7, name: 'Nintendo Switch OLED', price: 7999, category: 'Gaming', brand: 'Nintendo' },
  { id: 8, name: 'PlayStation 5', price: 13999, category: 'Gaming', brand: 'Sony' },
  { id: 9, name: 'Xbox Series X', price: 12999, category: 'Gaming', brand: 'Microsoft' },
  { id: 10, name: 'GoPro Hero 12', price: 9999, category: 'Cámaras', brand: 'GoPro' },
];

// Generar más productos
const generateProducts = (count = 100) => {
  const products = [...SAMPLE_PRODUCTS];
  const categories = ['Electrónica', 'Computadoras', 'Audio', 'Gaming', 'Hogar', 'Deportes'];
  const brands = ['Samsung', 'LG', 'Sony', 'Apple', 'Microsoft', 'Nintendo', 'HP', 'Dell'];
  
  for (let i = 11; i <= count; i++) {
    products.push({
      id: i,
      name: `Producto ${i}`,
      price: randomInt(500, 30000),
      category: categories[randomInt(0, categories.length - 1)],
      brand: brands[randomInt(0, brands.length - 1)],
    });
  }
  
  return products;
};

export const PRODUCTS = generateProducts(100);

// Generar sesiones y usuarios
export const generateTrafficData = (days = 365) => {
  const sessions = generateTrend(12000, days, 'up');
  const users = sessions.map(s => ({
    date: s.date,
    value: Math.round(s.value * 0.6), // 60% son usuarios únicos
  }));
  
  return { sessions, users };
};

// Generar datos de conversión
export const generateConversionData = (days = 365) => {
  const baseRate = 2.3; // 2.3% base
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = startOfDay(subDays(new Date(), i));
    const rate = baseRate + randomFloat(-0.5, 0.5);
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      rate: Math.max(0, rate),
    });
  }
  
  return data;
};

// Generar embudo de conversión
export const generateFunnelData = (sessions) => {
  const pdpViews = Math.round(sessions * randomFloat(0.65, 0.75));
  const addToCarts = Math.round(pdpViews * randomFloat(0.25, 0.35));
  const checkouts = Math.round(addToCarts * randomFloat(0.60, 0.70));
  const purchases = Math.round(checkouts * randomFloat(0.65, 0.75));
  
  return {
    sessions,
    pdpViews,
    addToCarts,
    checkouts,
    purchases,
  };
};

// Generar términos de búsqueda
export const generateSearchTerms = () => {
  const terms = [
    { term: 'iphone', searches: 4523, noResults: 45, ctr: 68.5 },
    { term: 'macbook', searches: 3821, noResults: 12, ctr: 72.3 },
    { term: 'airpods', searches: 3156, noResults: 8, ctr: 75.1 },
    { term: 'playstation', searches: 2943, noResults: 23, ctr: 65.2 },
    { term: 'nintendo switch', searches: 2701, noResults: 15, ctr: 70.8 },
    { term: 'samsung tv', searches: 2456, noResults: 89, ctr: 55.3 },
    { term: 'laptop', searches: 2234, noResults: 145, ctr: 48.7 },
    { term: 'audifonos', searches: 1987, noResults: 67, ctr: 61.2 },
    { term: 'camara', searches: 1823, noResults: 234, ctr: 42.1 },
    { term: 'teclado mecanico', searches: 1654, noResults: 312, ctr: 38.5 },
    { term: 'mouse gamer', searches: 1543, noResults: 89, ctr: 56.7 },
    { term: 'monitor 4k', searches: 1432, noResults: 176, ctr: 44.3 },
    { term: 'tablet', searches: 1321, noResults: 45, ctr: 64.8 },
    { term: 'smartwatch', searches: 1256, noResults: 98, ctr: 52.1 },
    { term: 'bocina bluetooth', searches: 1187, noResults: 67, ctr: 58.9 },
  ];
  
  return terms.map(t => ({
    ...t,
    noResultsRate: (t.noResults / t.searches) * 100,
  }));
};

// Generar productos más vistos
export const generateTopProducts = () => {
  return PRODUCTS.slice(0, 20).map((product, index) => ({
    ...product,
    views: randomInt(5000, 15000) - (index * 200),
    atc: randomInt(800, 2500) - (index * 50),
    atcRate: randomFloat(15, 35),
    sales: randomInt(200, 800) - (index * 20),
  }));
};

// Generar colecciones
export const generateCollections = () => {
  const collections = [
    { name: 'Black Friday', visits: 45234 },
    { name: 'Nuevos Productos', visits: 38765 },
    { name: 'Gaming', visits: 34521 },
    { name: 'Apple', visits: 29876 },
    { name: 'Ofertas', visits: 25432 },
  ];
  
  return collections;
};

// Generar Core Web Vitals
export const generateCoreWebVitals = (days = 30) => {
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = startOfDay(subDays(new Date(), i));
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      lcp: randomFloat(1800, 3200), // ms
      inp: randomFloat(150, 350), // ms
      cls: randomFloat(0.05, 0.20), // score
    });
  }
  
  return data;
};

// Generar URLs para Core Web Vitals
export const generateURLPerformance = () => {
  const urls = [
    { url: '/', name: 'Home', views: 125000 },
    { url: '/productos', name: 'Productos', views: 98000 },
    { url: '/producto/iphone-15', name: 'iPhone 15', views: 45000 },
    { url: '/checkout', name: 'Checkout', views: 12000 },
    { url: '/carrito', name: 'Carrito', views: 23000 },
  ];
  
  return urls.map(u => ({
    ...u,
    lcp: randomFloat(1800, 3500),
    inp: randomFloat(100, 400),
    cls: randomFloat(0.05, 0.25),
    score: randomInt(60, 95),
  }));
};

// Generar sesiones por dispositivo
export const generateDeviceData = () => {
  const total = 45678;
  
  return {
    mobile: {
      sessions: Math.round(total * 0.62),
      cr: 1.8,
      gmv: 2145678,
      aov: 856,
    },
    desktop: {
      sessions: Math.round(total * 0.32),
      cr: 3.2,
      gmv: 1876543,
      aov: 1243,
    },
    tablet: {
      sessions: Math.round(total * 0.05),
      cr: 2.1,
      gmv: 234567,
      aov: 987,
    },
    other: {
      sessions: Math.round(total * 0.01),
      cr: 1.2,
      gmv: 45678,
      aov: 678,
    },
  };
};

// Generar sesiones por estado
export const generateStateData = () => {
  // Distribución realista: CDMX, Nuevo León, Jalisco tienen más
  const weights = {
    'Ciudad de México': 0.22,
    'Nuevo León': 0.12,
    'Jalisco': 0.10,
    'México': 0.08,
  };
  
  const total = 45678;
  const states = [];
  let remaining = total;
  
  ESTADOS_MEXICO.forEach((estado, index) => {
    const weight = weights[estado] || (remaining / (ESTADOS_MEXICO.length - index)) / total;
    const sessions = Math.round(total * weight * randomFloat(0.8, 1.2));
    
    states.push({
      estado,
      sessions: Math.min(sessions, remaining),
      cr: randomFloat(1.5, 3.5),
      gmv: sessions * randomFloat(800, 1500),
      orders: Math.round(sessions * randomFloat(0.015, 0.035)),
    });
    
    remaining -= sessions;
  });
  
  return states.sort((a, b) => b.sessions - a.sessions);
};

// Generar usuarios activos (live view)
export const generateLiveUsers = () => {
  const now = new Date();
  const data = [];
  
  // Últimos 15 minutos
  for (let i = 15; i >= 0; i--) {
    const time = addHours(now, -(i / 60));
    data.push({
      time: format(time, 'HH:mm'),
      users: randomInt(45, 125),
    });
  }
  
  return {
    current: randomInt(80, 120),
    timeline: data,
  };
};

// Generar ventas (gross vs net)
export const generateSalesData = (days = 30) => {
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = startOfDay(subDays(new Date(), i));
    const gross = randomFloat(450000, 650000);
    const discounts = gross * randomFloat(0.05, 0.12);
    const returns = gross * randomFloat(0.02, 0.05);
    const net = gross - discounts - returns;
    const shipping = net * 0.06;
    const taxes = net * 0.16;
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      gross: Math.round(gross),
      discounts: Math.round(discounts),
      returns: Math.round(returns),
      net: Math.round(net),
      shipping: Math.round(shipping),
      taxes: Math.round(taxes),
      total: Math.round(net + shipping + taxes),
    });
  }
  
  return data;
};

// Generar COGS y margen
export const generateCOGSData = () => {
  return PRODUCTS.slice(0, 20).map(product => {
    const cost = product.price * randomFloat(0.45, 0.65);
    const sales = randomInt(50, 500);
    const netSales = sales * product.price;
    const cogs = sales * cost;
    const grossProfit = netSales - cogs;
    const margin = (grossProfit / netSales) * 100;
    
    return {
      ...product,
      cost: Math.round(cost),
      sales,
      netSales: Math.round(netSales),
      cogs: Math.round(cogs),
      grossProfit: Math.round(grossProfit),
      margin: margin,
    };
  });
};

// Generar tasa de devoluciones
export const generateReturnsData = () => {
  return PRODUCTS.slice(0, 20).map(product => {
    const sold = randomInt(100, 1000);
    const returned = Math.round(sold * randomFloat(0.02, 0.25));
    const rate = (returned / sold) * 100;
    
    return {
      ...product,
      sold,
      returned,
      rate,
      reason: rate > 15 ? 'Talla incorrecta' : 'Defecto de fábrica',
    };
  });
};

// Generar nuevos clientes en el tiempo
export const generateNewCustomersTimeline = (days = 30) => {
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = startOfDay(subDays(new Date(), i));
    const newCustomers = randomInt(40, 120);
    const totalOrders = randomInt(80, 200);
    const percentOfOrders = (newCustomers / totalOrders) * 100;
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      newCustomers,
      percentOfOrders,
    });
  }
  
  return data;
};

// Generar segmentación de clientes (nuevos vs habituales)
export const generateCustomerSegmentation = () => {
  const totalOrders = 1250;
  const newOrders = Math.round(totalOrders * randomFloat(0.60, 0.70));
  const returningOrders = totalOrders - newOrders;
  
  return {
    new: {
      orders: newOrders,
      gmv: newOrders * randomFloat(750, 950),
      aov: randomFloat(750, 950),
    },
    returning: {
      orders: returningOrders,
      gmv: returningOrders * randomFloat(1200, 1500),
      aov: randomFloat(1200, 1500),
    },
  };
};

// Generar conversiones desde búsqueda
export const generateSearchConversions = () => {
  const searchTerms = generateSearchTerms();
  
  return searchTerms.slice(0, 10).map(term => ({
    term: term.term,
    searches: term.searches,
    conversions: Math.round(term.searches * randomFloat(0.05, 0.15)),
    cr: randomFloat(5, 15),
    gmv: Math.round(term.searches * randomFloat(800, 1500)),
  }));
};

export default {
  generateTrafficData,
  generateConversionData,
  generateFunnelData,
  generateSearchTerms,
  generateTopProducts,
  generateCollections,
  generateCoreWebVitals,
  generateURLPerformance,
  generateDeviceData,
  generateStateData,
  generateLiveUsers,
  generateSalesData,
  generateCOGSData,
  generateReturnsData,
  generateNewCustomersTimeline,
  generateCustomerSegmentation,
  generateSearchConversions,
};
