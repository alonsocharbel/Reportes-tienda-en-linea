import React from 'react';
import MetricCard from '../components/common/MetricCard';
import Chart from '../components/common/Chart';
import DataTable from '../components/common/DataTable';
import { useMetrics } from '../hooks/useMetrics';
import { formatMilliseconds, formatNumber } from '../utils/formatters';
import { Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import colors from '../styles/colors';

const Performance = () => {
  const { data } = useMetrics();

  const urlColumns = [
    { key: 'name', label: 'Página', sortable: true },
    { 
      key: 'views', 
      label: 'Vistas', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
    { 
      key: 'lcp', 
      label: 'LCP (ms)', 
      sortable: true, 
      align: 'right',
      formatter: (val) => Math.round(val)
    },
    { 
      key: 'inp', 
      label: 'INP (ms)', 
      sortable: true, 
      align: 'right',
      formatter: (val) => Math.round(val)
    },
    { 
      key: 'cls', 
      label: 'CLS', 
      sortable: true, 
      align: 'right',
      formatter: (val) => val.toFixed(3)
    },
    { 
      key: 'score', 
      label: 'Score', 
      sortable: true, 
      align: 'right',
      formatter: (val, row) => {
        const color = val >= 90 ? 'text-ok' : val >= 70 ? 'text-warning' : 'text-error';
        return <span className={`font-bold ${color}`}>{val}</span>;
      }
    },
  ];

  // Status de Core Web Vitals
  const getLCPStatus = () => {
    if (data.avgLCP <= 2500) return 'good';
    if (data.avgLCP <= 4000) return 'warning';
    return 'error';
  };

  const getINPStatus = () => {
    if (data.avgINP <= 200) return 'good';
    if (data.avgINP <= 500) return 'warning';
    return 'error';
  };

  const getCLSStatus = () => {
    if (data.avgCLS <= 0.1) return 'good';
    if (data.avgCLS <= 0.25) return 'warning';
    return 'error';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Performance Web</h1>
        <p className="text-gray-600 mt-1">
          Core Web Vitals y métricas de experiencia de usuario
        </p>
      </div>

      {/* Core Web Vitals - KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="LCP (p75)"
          value={formatMilliseconds(data.avgLCP)}
          subtitle="Largest Contentful Paint"
          status={getLCPStatus()}
          icon={Zap}
          tooltip="Tiempo de carga del elemento más grande. Good: ≤2.5s"
        >
          <div className="text-xs text-gray-600 mt-2">
            {data.avgLCP <= 2500 && '✓ Bueno (≤2.5s)'}
            {data.avgLCP > 2500 && data.avgLCP <= 4000 && '⚠️ Necesita mejora (2.5-4s)'}
            {data.avgLCP > 4000 && '❌ Pobre (>4s)'}
          </div>
        </MetricCard>

        <MetricCard
          title="INP (p75)"
          value={formatMilliseconds(data.avgINP)}
          subtitle="Interaction to Next Paint"
          status={getINPStatus()}
          icon={TrendingUp}
          tooltip="Capacidad de respuesta a interacciones. Good: ≤200ms"
        >
          <div className="text-xs text-gray-600 mt-2">
            {data.avgINP <= 200 && '✓ Bueno (≤200ms)'}
            {data.avgINP > 200 && data.avgINP <= 500 && '⚠️ Necesita mejora (200-500ms)'}
            {data.avgINP > 500 && '❌ Pobre (>500ms)'}
          </div>
        </MetricCard>

        <MetricCard
          title="CLS (p75)"
          value={data.avgCLS.toFixed(3)}
          subtitle="Cumulative Layout Shift"
          status={getCLSStatus()}
          icon={AlertTriangle}
          tooltip="Estabilidad visual. Good: ≤0.1"
        >
          <div className="text-xs text-gray-600 mt-2">
            {data.avgCLS <= 0.1 && '✓ Bueno (≤0.1)'}
            {data.avgCLS > 0.1 && data.avgCLS <= 0.25 && '⚠️ Necesita mejora (0.1-0.25)'}
            {data.avgCLS > 0.25 && '❌ Pobre (>0.25)'}
          </div>
        </MetricCard>
      </div>

      {/* Gráfica de Core Web Vitals en el tiempo */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Evolución de LCP</h2>
        <Chart
          data={data.coreWebVitals}
          type="line"
          lines={[
            { dataKey: 'lcp', name: 'LCP (ms)', color: colors.brand.DEFAULT },
          ]}
          height={300}
          formatter={(value) => `${Math.round(value)}ms`}
        />
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
          <strong>Referencia:</strong> Verde (Good) ≤2500ms, Amarillo (Needs Improvement) 2500-4000ms, Rojo (Poor) >4000ms
        </div>
      </div>

      {/* Tabla de URLs a mejorar */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Performance por URL</h2>
          <p className="text-sm text-gray-600">Páginas ordenadas por impacto (tráfico × estado)</p>
        </div>
        <DataTable
          data={data.urlPerformance}
          columns={urlColumns}
          exportable={true}
        />
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 border-l-4 border-blueLink p-4 rounded">
        <p className="text-sm text-gray-900">
          <strong>Nota:</strong> Estos datos se basan en mediciones reales de usuarios (RUM). 
          Los umbrales siguen las guías oficiales de Google para Core Web Vitals.
        </p>
      </div>
    </div>
  );
};

export default Performance;
