import React from 'react';
import MetricCard from '../components/common/MetricCard';
import Chart from '../components/common/Chart';
import DataTable from '../components/common/DataTable';
import { useMetrics } from '../hooks/useMetrics';
import { formatCurrency, formatPercent, formatNumber } from '../utils/formatters';
import { DollarSign, TrendingUp, TrendingDown, Package } from 'lucide-react';
import colors from '../styles/colors';

const Financial = () => {
  const { data } = useMetrics();

  const cogsColumns = [
    { key: 'name', label: 'Producto', sortable: true },
    { 
      key: 'sales', 
      label: 'Unidades', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
    { 
      key: 'netSales', 
      label: 'Ventas Netas', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatCurrency(val, true)
    },
    { 
      key: 'cogs', 
      label: 'COGS', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatCurrency(val, true)
    },
    { 
      key: 'grossProfit', 
      label: 'Ganancia Bruta', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatCurrency(val, true)
    },
    { 
      key: 'margin', 
      label: 'Margen %', 
      sortable: true, 
      align: 'right',
      formatter: (val, row) => {
        const color = val >= 40 ? 'text-ok' : val >= 20 ? 'text-warning' : 'text-error';
        return <span className={`font-bold ${color}`}>{formatPercent(val)}</span>;
      }
    },
  ];

  const returnsColumns = [
    { key: 'name', label: 'Producto', sortable: true },
    { 
      key: 'sold', 
      label: 'Vendidos', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
    { 
      key: 'returned', 
      label: 'Devueltos', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
    { 
      key: 'rate', 
      label: 'Tasa %', 
      sortable: true, 
      align: 'right',
      formatter: (val, row) => {
        const color = val < 10 ? 'text-ok' : val < 15 ? 'text-warning' : 'text-error';
        return <span className={`font-bold ${color}`}>{formatPercent(val)}</span>;
      }
    },
    { key: 'reason', label: 'Razón Principal', sortable: false },
  ];

  // Calcular totales
  const totalGross = data.salesData.reduce((sum, d) => sum + d.gross, 0);
  const totalNet = data.salesData.reduce((sum, d) => sum + d.net, 0);
  const totalDiscounts = data.salesData.reduce((sum, d) => sum + d.discounts, 0);
  const totalReturns = data.salesData.reduce((sum, d) => sum + d.returns, 0);
  
  const totalCOGS = data.cogsData.reduce((sum, p) => sum + p.cogs, 0);
  const totalGrossProfit = totalNet - totalCOGS;
  const grossMargin = (totalGrossProfit / totalNet) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Métricas Financieras</h1>
        <p className="text-gray-600 mt-1">
          Análisis de ventas, márgenes y rentabilidad
        </p>
      </div>

      {/* KPIs Financieros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Ventas Brutas"
          value={formatCurrency(totalGross, true)}
          subtitle="Antes de descuentos"
          icon={DollarSign}
        />

        <MetricCard
          title="Ventas Netas"
          value={formatCurrency(totalNet, true)}
          subtitle={`${formatPercent((totalNet / totalGross) * 100)} del total`}
          icon={TrendingUp}
          status="good"
        />

        <MetricCard
          title="Ganancia Bruta"
          value={formatCurrency(totalGrossProfit, true)}
          subtitle={`Margen: ${formatPercent(grossMargin)}`}
          icon={TrendingUp}
          status={grossMargin >= 40 ? 'good' : grossMargin >= 20 ? 'warning' : 'error'}
        />

        <MetricCard
          title="Tasa de Devoluciones"
          value={formatPercent(data.avgReturnRate)}
          subtitle="Promedio por producto"
          icon={TrendingDown}
          status={data.avgReturnRate < 10 ? 'good' : data.avgReturnRate < 15 ? 'warning' : 'error'}
        />
      </div>

      {/* Gráfica de Ventas */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Evolución de Ventas</h2>
        <Chart
          data={data.salesData}
          type="area"
          lines={[
            { dataKey: 'gross', name: 'Ventas Brutas', color: colors.brand.DEFAULT },
            { dataKey: 'net', name: 'Ventas Netas', color: colors.ok },
          ]}
          height={350}
          formatter={(value) => formatCurrency(value, true)}
        />
        
        {/* Breakdown */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Breakdown del Período:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Ventas Brutas</div>
              <div className="font-bold text-gray-900">{formatCurrency(totalGross)}</div>
            </div>
            <div>
              <div className="text-gray-600">− Descuentos</div>
              <div className="font-bold text-error">−{formatCurrency(totalDiscounts)}</div>
            </div>
            <div>
              <div className="text-gray-600">− Devoluciones</div>
              <div className="font-bold text-error">−{formatCurrency(totalReturns)}</div>
            </div>
            <div>
              <div className="text-gray-600">= Ventas Netas</div>
              <div className="font-bold text-ok">{formatCurrency(totalNet)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla COGS y Margen */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">COGS y Ganancia Bruta por Producto</h2>
          <p className="text-sm text-gray-600">Análisis de costos y márgenes</p>
        </div>
        <DataTable
          data={data.cogsData}
          columns={cogsColumns}
          searchable={true}
          exportable={true}
        />
      </div>

      {/* Tabla de Devoluciones */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Tasa de Devoluciones por Producto</h2>
          <p className="text-sm text-gray-600">Productos con mayor tasa de devoluciones</p>
        </div>
        <DataTable
          data={data.returnsData.sort((a, b) => b.rate - a.rate)}
          columns={returnsColumns}
          exportable={true}
        />
      </div>

      {/* Alertas */}
      {data.cogsData.some(p => p.margin < 20) && (
        <div className="bg-red-50 border-l-4 border-error p-4 rounded">
          <p className="text-sm text-gray-900">
            <strong>⚠️ Alerta:</strong> {data.cogsData.filter(p => p.margin < 20).length} producto(s) con margen crítico (&lt;20%). 
            Revisa tu estrategia de pricing o costos de adquisición.
          </p>
        </div>
      )}
    </div>
  );
};

export default Financial;
