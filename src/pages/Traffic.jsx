import React from 'react';
import MetricCard from '../components/common/MetricCard';
import Chart from '../components/common/Chart';
import DataTable from '../components/common/DataTable';
import { useMetrics } from '../hooks/useMetrics';
import { formatNumber, formatPercent } from '../utils/formatters';
import { Users, Eye, MousePointerClick } from 'lucide-react';
import colors from '../styles/colors';

const Traffic = () => {
  const { data, deltas } = useMetrics();

  // Columnas para tabla de búsquedas
  const searchColumns = [
    { key: 'term', label: 'Término', sortable: true },
    { 
      key: 'searches', 
      label: 'Búsquedas', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
    { 
      key: 'noResultsRate', 
      label: '% Sin resultados', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatPercent(val)
    },
    { 
      key: 'ctr', 
      label: 'CTR → PDP', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatPercent(val)
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tráfico & Conversión</h1>
        <p className="text-gray-600 mt-1">
          Análisis detallado de sesiones, usuarios y comportamiento
        </p>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Sesiones"
          value={formatNumber(data.sessions)}
          delta={deltas.sessions.percent}
          trend={deltas.sessions.percent > 0 ? 'up' : 'down'}
          icon={Users}
        />
        
        <MetricCard
          title="Usuarios Únicos"
          value={formatNumber(data.users)}
          subtitle={`Ratio: ${(data.sessions / data.users).toFixed(1)} ses/usr`}
          icon={Eye}
        />
        
        <MetricCard
          title="Tasa de Conversión"
          value={formatPercent(data.conversionRate)}
          delta={deltas.conversionRate.percent}
          trend={deltas.conversionRate.percent > 0 ? 'up' : 'down'}
          status={data.conversionRate > 2.5 ? 'good' : data.conversionRate > 1 ? 'warning' : 'error'}
          icon={MousePointerClick}
        />
      </div>

      {/* Gráfica de Tráfico */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Evolución de Tráfico</h2>
        <Chart
          data={data.sessionsTimeline.map((item, index) => ({
            date: item.date,
            sesiones: item.value,
            usuarios: data.usersTimeline[index]?.value || 0,
          }))}
          type="line"
          lines={[
            { dataKey: 'sesiones', name: 'Sesiones', color: colors.brand.DEFAULT },
            { dataKey: 'usuarios', name: 'Usuarios Únicos', color: colors.blueLink },
          ]}
          height={350}
          formatter={(value) => formatNumber(value)}
        />
      </div>

      {/* Tabla de Términos de Búsqueda */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Top Términos Buscados</h2>
          <p className="text-sm text-gray-600">Análisis de búsqueda interna</p>
        </div>
        <DataTable
          data={data.searchTerms}
          columns={searchColumns}
          searchable={true}
          exportable={true}
        />
      </div>

      {/* Métricas de Búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Búsquedas Sin Resultados"
          value={formatPercent(data.noResultsRate)}
          status={data.noResultsRate < 10 ? 'good' : data.noResultsRate < 15 ? 'warning' : 'error'}
          tooltip="Porcentaje de búsquedas que no devolvieron resultados"
        />
        
        <MetricCard
          title="Total de Búsquedas"
          value={formatNumber(data.searchTerms.reduce((sum, t) => sum + t.searches, 0))}
          subtitle="En el período seleccionado"
        />
      </div>
    </div>
  );
};

export default Traffic;
