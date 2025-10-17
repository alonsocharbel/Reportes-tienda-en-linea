// Cálculos de métricas

// Calcular tasa de conversión
export const calculateConversionRate = (conversions, sessions) => {
  if (!sessions || sessions === 0) return 0;
  return (conversions / sessions) * 100;
};

// Calcular AOV (Average Order Value)
export const calculateAOV = (revenue, orders) => {
  if (!orders || orders === 0) return 0;
  return revenue / orders;
};

// Calcular ratio sesiones/usuario
export const calculateSessionsPerUser = (sessions, users) => {
  if (!users || users === 0) return 0;
  return sessions / users;
};

// Calcular ATC% (Add to Cart %)
export const calculateATCRate = (addToCarts, views) => {
  if (!views || views === 0) return 0;
  return (addToCarts / views) * 100;
};

// Calcular tasa de búsquedas sin resultados
export const calculateNoResultsRate = (noResults, totalSearches) => {
  if (!totalSearches || totalSearches === 0) return 0;
  return (noResults / totalSearches) * 100;
};

// Calcular percentil
export const calculatePercentile = (arr, percentile) => {
  if (!arr || arr.length === 0) return 0;
  
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[index];
};

// Calcular p75 (percentil 75)
export const calculateP75 = (arr) => calculatePercentile(arr, 75);

// Calcular gross margin
export const calculateGrossMargin = (netSales, cogs) => {
  if (!netSales || netSales === 0) return 0;
  const grossProfit = netSales - cogs;
  return (grossProfit / netSales) * 100;
};

// Calcular tasa de devoluciones
export const calculateReturnRate = (returns, sales) => {
  if (!sales || sales === 0) return 0;
  return (returns / sales) * 100;
};

// Calcular embudo de conversión
export const calculateFunnel = (data) => {
  const { sessions, pdpViews, addToCarts, checkouts, purchases } = data;
  
  return {
    sessions: { value: sessions, percent: 100 },
    pdpViews: { 
      value: pdpViews, 
      percent: (pdpViews / sessions) * 100,
      dropOff: sessions - pdpViews,
      dropOffPercent: ((sessions - pdpViews) / sessions) * 100
    },
    addToCarts: { 
      value: addToCarts, 
      percent: (addToCarts / sessions) * 100,
      dropOff: pdpViews - addToCarts,
      dropOffPercent: ((pdpViews - addToCarts) / pdpViews) * 100
    },
    checkouts: { 
      value: checkouts, 
      percent: (checkouts / sessions) * 100,
      dropOff: addToCarts - checkouts,
      dropOffPercent: ((addToCarts - checkouts) / addToCarts) * 100
    },
    purchases: { 
      value: purchases, 
      percent: (purchases / sessions) * 100,
      dropOff: checkouts - purchases,
      dropOffPercent: ((checkouts - purchases) / checkouts) * 100
    },
  };
};

// Agregar datos por granularidad
export const aggregateByGranularity = (data, granularity) => {
  // Esta función agrupará datos diarios en semanas/meses según la granularidad
  // Por ahora retorna los datos tal cual, se puede extender después
  return data;
};

// Generar datos de comparación
export const generateComparison = (current, previous) => {
  if (!current || !previous) return null;
  
  const delta = current - previous;
  const percentChange = previous !== 0 ? ((delta / previous) * 100) : 0;
  
  return {
    current,
    previous,
    delta,
    percentChange,
    isImprovement: delta >= 0,
  };
};

export default {
  calculateConversionRate,
  calculateAOV,
  calculateSessionsPerUser,
  calculateATCRate,
  calculateNoResultsRate,
  calculatePercentile,
  calculateP75,
  calculateGrossMargin,
  calculateReturnRate,
  calculateFunnel,
  aggregateByGranularity,
  generateComparison,
};
