import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    device: 'all', // 'all', 'mobile', 'desktop', 'tablet'
    state: 'all', // 'all' o nombre del estado
    collection: 'all', // 'all' o ID de colección
    category: 'all', // 'all' o nombre de categoría
    includeTestOrders: false,
    granularity: 'auto', // 'auto', 'hour', 'day', 'week', 'month'
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  const resetFilters = () => {
    setFilters({
      device: 'all',
      state: 'all',
      collection: 'all',
      category: 'all',
      includeTestOrders: false,
      granularity: 'auto',
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.device !== 'all') count++;
    if (filters.state !== 'all') count++;
    if (filters.collection !== 'all') count++;
    if (filters.category !== 'all') count++;
    if (filters.includeTestOrders) count++;
    return count;
  };

  const getActiveFiltersLabels = () => {
    const labels = [];
    if (filters.device !== 'all') {
      const deviceLabels = {
        mobile: 'Móvil',
        desktop: 'Desktop',
        tablet: 'Tablet',
      };
      labels.push(`Dispositivo: ${deviceLabels[filters.device]}`);
    }
    if (filters.state !== 'all') {
      labels.push(`Estado: ${filters.state}`);
    }
    if (filters.collection !== 'all') {
      labels.push(`Colección: ${filters.collection}`);
    }
    if (filters.category !== 'all') {
      labels.push(`Categoría: ${filters.category}`);
    }
    if (filters.includeTestOrders) {
      labels.push('Incluye órdenes de prueba');
    }
    return labels;
  };

  const value = {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    getActiveFiltersCount,
    getActiveFiltersLabels,
  };

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within FiltersProvider');
  }
  return context;
};

export default useFilters;
