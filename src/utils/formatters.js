// Utilidades para formatear números, monedas, porcentajes, fechas, etc.

/**
 * Formatea un número con separadores de miles
 * @param {number} value 
 * @returns {string}
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('es-MX').format(Math.round(value));
};

/**
 * Formatea un porcentaje
 * @param {number} value - Valor en porcentaje (ej: 2.5 para 2.5%)
 * @param {number} decimals - Número de decimales
 * @returns {string}
 */
export const formatPercent = (value, decimals = 1) => {
  if (value === null || value === undefined) return '—';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formatea una moneda en MXN
 * @param {number} value 
 * @param {boolean} compact - Si es true, usa formato compacto (1.5K, 2.3M)
 * @returns {string}
 */
export const formatCurrency = (value, compact = false) => {
  if (value === null || value === undefined) return '—';
  
  if (compact) {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
  }
  
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formatea bytes a formato legible
 * @param {number} bytes 
 * @returns {string}
 */
export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Formatea milisegundos a segundos
 * @param {number} ms 
 * @returns {string}
 */
export const formatMilliseconds = (ms) => {
  if (ms === null || ms === undefined) return '—';
  return `${(ms / 1000).toFixed(2)}s`;
};

/**
 * Formatea una fecha relativa (hace X tiempo)
 * @param {Date|string} date 
 * @returns {string}
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.abs(now - then);
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Hace menos de 1 minuto';
  if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
  return `Hace ${days} día${days > 1 ? 's' : ''}`;
};

/**
 * Formatea un delta con signo y color
 * @param {number} value 
 * @param {boolean} isPercent 
 * @returns {object}
 */
export const formatDelta = (value, isPercent = true) => {
  if (value === null || value === undefined) return { text: '—', color: 'gray' };
  
  const sign = value > 0 ? '+' : '';
  const text = isPercent ? `${sign}${value.toFixed(1)}%` : `${sign}${formatNumber(value)}`;
  const color = value > 0 ? 'green' : value < 0 ? 'red' : 'gray';
  
  return { text, color };
};

/**
 * Formatea un ratio (ej: 2.3 sesiones/usuario)
 * @param {number} numerator 
 * @param {number} denominator 
 * @param {number} decimals 
 * @returns {string}
 */
export const formatRatio = (numerator, denominator, decimals = 1) => {
  if (!denominator || denominator === 0) return '—';
  return (numerator / denominator).toFixed(decimals);
};

/**
 * Trunca texto largo
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Formatea un rango de fechas
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @returns {string}
 */
export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const startStr = start.toLocaleDateString('es-MX', options);
  const endStr = end.toLocaleDateString('es-MX', options);
  
  return `${startStr} - ${endStr}`;
};

export default {
  formatNumber,
  formatPercent,
  formatCurrency,
  formatBytes,
  formatMilliseconds,
  formatRelativeTime,
  formatDelta,
  formatRatio,
  truncateText,
  formatDateRange,
};
