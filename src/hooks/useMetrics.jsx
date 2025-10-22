import { useMemo } from 'react';
import { useDateRange } from './useDateRange';
import { useFilters } from './useFilters';
import generators from '../data/generators';
import { differenceInDays } from 'date-fns';

export const useMetrics = () => {
  const { dateRange, previousPeriod } = useDateRange();
  const { filters } = useFilters();

  // Calcular número de días del rango
  const daysInRange = useMemo(() => {
    return differenceInDays(dateRange.endDate, dateRange.startDate) + 1;
  }, [dateRange]);

  // Generar todos los datos (simulados)
  const data = useMemo(() => {
    // Tráfico
    const trafficData = generators.generateTrafficData(365);
    const conversionData = generators.generateConversionData(365);
    
    // Filtrar por rango de fechas actual
    const filteredSessions = trafficData.sessions.filter(d => {
      const date = new Date(d.date);
      return date >= dateRange.startDate && date <= dateRange.endDate;
    });
    
    const filteredUsers = trafficData.users.filter(d => {
      const date = new Date(d.date);
      return date >= dateRange.startDate && date <= dateRange.endDate;
    });
    
    // Calcular totales
    const totalSessions = filteredSessions.reduce((sum, d) => sum + d.value, 0);
    const totalUsers = filteredUsers.reduce((sum, d) => sum + d.value, 0);
    
    // Ajustar por filtro de dispositivo
    let deviceMultiplier = 1;
    if (filters.device === 'mobile') deviceMultiplier = 0.62;
    else if (filters.device === 'desktop') deviceMultiplier = 0.32;
    else if (filters.device === 'tablet') deviceMultiplier = 0.05;
    
    const adjustedSessions = Math.round(totalSessions * deviceMultiplier);
    
    // Generar embudo
    const funnelData = generators.generateFunnelData(adjustedSessions);
    
    // Generar otros datos
    const searchTerms = generators.generateSearchTerms();
    const topProducts = generators.generateTopProducts();
    const collections = generators.generateCollections();
    const coreWebVitals = generators.generateCoreWebVitals(daysInRange);
    const urlPerformance = generators.generateURLPerformance();
    const deviceData = generators.generateDeviceData();
    const stateData = generators.generateStateData();
    const liveUsers = generators.generateLiveUsers();
    const salesData = generators.generateSalesData(daysInRange);
    const cogsData = generators.generateCOGSData();
    const returnsData = generators.generateReturnsData();
    const newCustomersTimeline = generators.generateNewCustomersTimeline(daysInRange);
    const customerSegmentation = generators.generateCustomerSegmentation();
    const searchConversions = generators.generateSearchConversions();
    
    // Calcular nuevos visitantes (70% de los usuarios totales)
    const newVisitors = Math.round(totalUsers * 0.70);
    
    return {
      // Tráfico
      sessions: adjustedSessions,
      users: Math.round(totalUsers * deviceMultiplier),
      sessionsTimeline: filteredSessions,
      usersTimeline: filteredUsers,
      
      // Conversión
      conversionRate: (funnelData.purchases / funnelData.sessions) * 100,
      orders: funnelData.purchases,
      funnel: funnelData,
      
      // Búsqueda
      searchTerms,
      noResultsRate: (searchTerms.reduce((sum, t) => sum + t.noResults, 0) / searchTerms.reduce((sum, t) => sum + t.searches, 0)) * 100,
      
      // Productos
      topProducts,
      collections,
      
      // Performance
      coreWebVitals,
      urlPerformance,
      avgLCP: coreWebVitals.reduce((sum, d) => sum + d.lcp, 0) / coreWebVitals.length,
      avgINP: coreWebVitals.reduce((sum, d) => sum + d.inp, 0) / coreWebVitals.length,
      avgCLS: coreWebVitals.reduce((sum, d) => sum + d.cls, 0) / coreWebVitals.length,
      
      // Segmentación
      deviceData,
      stateData,
      
      // Live View
      liveUsers,
      
      // Financiero
      salesData,
      grossSales: salesData.reduce((sum, d) => sum + d.gross, 0),
      netSales: salesData.reduce((sum, d) => sum + d.net, 0),
      cogsData,
      returnsData,
      avgReturnRate: returnsData.reduce((sum, d) => sum + d.rate, 0) / returnsData.length,
      
      // Clientes
      newVisitors,
      newCustomersTimeline,
      customerSegmentation,
      
      // Búsqueda con conversiones
      searchConversions,
      searchCR: searchConversions.length > 0 ? searchConversions.reduce((sum, s) => sum + s.cr, 0) / searchConversions.length : 0,
    };
  }, [dateRange, filters, daysInRange]);

  // Calcular datos del período anterior para comparaciones
  const previousData = useMemo(() => {
    const trafficData = generators.generateTrafficData(365);
    
    const filteredSessions = trafficData.sessions.filter(d => {
      const date = new Date(d.date);
      return date >= previousPeriod.startDate && date <= previousPeriod.endDate;
    });
    
    const totalSessions = filteredSessions.reduce((sum, d) => sum + d.value, 0);
    
    let deviceMultiplier = 1;
    if (filters.device === 'mobile') deviceMultiplier = 0.62;
    else if (filters.device === 'desktop') deviceMultiplier = 0.32;
    else if (filters.device === 'tablet') deviceMultiplier = 0.05;
    
    const adjustedSessions = Math.round(totalSessions * deviceMultiplier);
    const funnelData = generators.generateFunnelData(adjustedSessions);
    
    return {
      sessions: adjustedSessions,
      orders: funnelData.purchases,
      conversionRate: (funnelData.purchases / funnelData.sessions) * 100,
    };
  }, [previousPeriod, filters]);

  // Calcular deltas (comparación vs período anterior)
  const deltas = useMemo(() => {
    return {
      sessions: {
        value: data.sessions - previousData.sessions,
        percent: previousData.sessions > 0 ? ((data.sessions - previousData.sessions) / previousData.sessions) * 100 : 0,
      },
      conversionRate: {
        value: data.conversionRate - previousData.conversionRate,
        percent: previousData.conversionRate > 0 ? ((data.conversionRate - previousData.conversionRate) / previousData.conversionRate) * 100 : 0,
      },
      orders: {
        value: data.orders - previousData.orders,
        percent: previousData.orders > 0 ? ((data.orders - previousData.orders) / previousData.orders) * 100 : 0,
      },
    };
  }, [data, previousData]);

  return {
    data,
    previousData,
    deltas,
    daysInRange,
  };
};

export default useMetrics;
