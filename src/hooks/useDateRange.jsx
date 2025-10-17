import React, { createContext, useContext, useState, useMemo } from 'react';
import { subDays, startOfDay, endOfDay, startOfMonth, endOfMonth, subMonths, startOfQuarter, startOfYear, format } from 'date-fns';

const DateRangeContext = createContext();

export const DateRangeProvider = ({ children }) => {
  const [dateRange, setDateRange] = useState({
    preset: 'last30days',
    startDate: startOfDay(subDays(new Date(), 30)),
    endDate: endOfDay(new Date()),
  });

  // Calcular período anterior (mismo número de días)
  const previousPeriod = useMemo(() => {
    const diff = Math.ceil((dateRange.endDate - dateRange.startDate) / (1000 * 60 * 60 * 24));
    return {
      startDate: startOfDay(subDays(dateRange.startDate, diff)),
      endDate: endOfDay(subDays(dateRange.endDate, diff)),
    };
  }, [dateRange]);

  // Presets de rangos
  const presets = {
    today: {
      label: 'Hoy',
      startDate: startOfDay(new Date()),
      endDate: endOfDay(new Date()),
    },
    yesterday: {
      label: 'Ayer',
      startDate: startOfDay(subDays(new Date(), 1)),
      endDate: endOfDay(subDays(new Date(), 1)),
    },
    last7days: {
      label: 'Últimos 7 días',
      startDate: startOfDay(subDays(new Date(), 7)),
      endDate: endOfDay(new Date()),
    },
    last30days: {
      label: 'Últimos 30 días',
      startDate: startOfDay(subDays(new Date(), 30)),
      endDate: endOfDay(new Date()),
    },
    last90days: {
      label: 'Últimos 90 días',
      startDate: startOfDay(subDays(new Date(), 90)),
      endDate: endOfDay(new Date()),
    },
    last365days: {
      label: 'Últimos 365 días',
      startDate: startOfDay(subDays(new Date(), 365)),
      endDate: endOfDay(new Date()),
    },
    thisMonth: {
      label: 'Este mes',
      startDate: startOfMonth(new Date()),
      endDate: endOfDay(new Date()),
    },
    lastMonth: {
      label: 'Mes pasado',
      startDate: startOfMonth(subMonths(new Date(), 1)),
      endDate: endOfMonth(subMonths(new Date(), 1)),
    },
    thisQuarter: {
      label: 'Este trimestre',
      startDate: startOfQuarter(new Date()),
      endDate: endOfDay(new Date()),
    },
    thisYear: {
      label: 'Este año (YTD)',
      startDate: startOfYear(new Date()),
      endDate: endOfDay(new Date()),
    },
  };

  const setPreset = (presetKey) => {
    const preset = presets[presetKey];
    if (preset) {
      setDateRange({
        preset: presetKey,
        startDate: preset.startDate,
        endDate: preset.endDate,
      });
    }
  };

  const setCustomRange = (startDate, endDate) => {
    setDateRange({
      preset: 'custom',
      startDate: startOfDay(startDate),
      endDate: endOfDay(endDate),
    });
  };

  const formatDateRange = () => {
    if (dateRange.preset !== 'custom') {
      return presets[dateRange.preset].label;
    }
    return `${format(dateRange.startDate, 'dd MMM yyyy')} - ${format(dateRange.endDate, 'dd MMM yyyy')}`;
  };

  const value = {
    dateRange,
    previousPeriod,
    presets,
    setPreset,
    setCustomRange,
    formatDateRange,
  };

  return (
    <DateRangeContext.Provider value={value}>
      {children}
    </DateRangeContext.Provider>
  );
};

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error('useDateRange must be used within DateRangeProvider');
  }
  return context;
};

export default useDateRange;
