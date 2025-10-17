import React, { useState } from 'react';
import { Calendar, Filter, RefreshCw, X } from 'lucide-react';
import { useDateRange } from '../../hooks/useDateRange';
import { useFilters } from '../../hooks/useFilters';
import colors from '../../styles/colors';

const Header = () => {
  const { formatDateRange, presets, setPreset, dateRange } = useDateRange();
  const { filters, resetFilters, getActiveFiltersCount } = useFilters();
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const activeFiltersCount = getActiveFiltersCount();

  return (
    <header className="bg-white border-b border-gray-400 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Title + Last Update */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard de Reportería
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Actualizado hace 2 minutos • Última actualización: {new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })} hrs
          </p>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center space-x-3">
          {/* Date Range Selector */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-400 rounded-lg hover:border-gray-800 transition-colors"
            >
              <Calendar size={18} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-900">
                {formatDateRange()}
              </span>
            </button>

            {/* Dropdown de rangos */}
            {showDatePicker && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-400 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-600 px-2 py-1 mb-1">
                    RANGOS RÁPIDOS
                  </div>
                  {Object.entries(presets).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setPreset(key);
                        setShowDatePicker(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-200 transition-colors ${
                        dateRange.preset === key ? 'bg-brand-50 text-brand font-medium' : 'text-gray-900'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filters Button */}
          <button className="relative flex items-center space-x-2 px-4 py-2 bg-white border border-gray-400 rounded-lg hover:border-gray-800 transition-colors">
            <Filter size={18} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Reset Filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="p-2 text-gray-600 hover:text-brand transition-colors"
              title="Limpiar filtros"
            >
              <X size={18} />
            </button>
          )}

          {/* Refresh Button */}
          <button className="p-2 text-gray-600 hover:text-brand transition-colors">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Active Filters Chips */}
      {activeFiltersCount > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.device !== 'all' && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-brand-50 text-brand text-xs rounded-full">
              <span>Dispositivo: {filters.device}</span>
              <button
                onClick={() => useFilters().updateFilter('device', 'all')}
                className="ml-1 hover:text-brand-800"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {filters.state !== 'all' && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-brand-50 text-brand text-xs rounded-full">
              <span>Estado: {filters.state}</span>
              <button
                onClick={() => useFilters().updateFilter('state', 'all')}
                className="ml-1 hover:text-brand-800"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Warning Banner - Cookie Consent */}
      <div className="mt-3 bg-warningLight border-l-4 border-yellow px-4 py-2 rounded">
        <p className="text-xs text-gray-900">
          <strong>Nota:</strong> Las métricas de navegación y conversión se calculan solo con usuarios que aceptaron cookies de analítica. Las ventas provienen del backoffice.
        </p>
      </div>
    </header>
  );
};

export default Header;
