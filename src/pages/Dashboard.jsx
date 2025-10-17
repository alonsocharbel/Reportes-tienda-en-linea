import React from 'react';
import { Users, MousePointerClick, ShoppingCart, TrendingUp, Eye, Zap } from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Chart from '../components/common/Chart';
import { useMetrics } from '../hooks/useMetrics';
import { formatNumber, formatPercent, formatCurrency } from '../utils/formatters';
import colors from '../styles/colors';

const Dashboard = () => {
  const { data, deltas } = useMetrics();

  // Preparar datos para la gráfica de sesiones
  const sessionsChartData = data.sessionsTimeline.map((item, index) => ({
    date: item.date,
    sesiones: item.value,
    usuarios: data.usersTimeline[index]?.value || 0,
  }));

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resumen Ejecutivo</h1>
        <p className="text-gray-600 mt-1">
          Vista general del rendimiento de tu tienda en línea
        </p>
      </div>

      {/* KPIs Grid - Top 6 métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sesiones */}
        <MetricCard
          title="Sesiones"
          value={formatNumber(data.sessions)}
          subtitle={`${formatNumber(data.users)} usuarios únicos`}
          delta={deltas.sessions.percent}
          trend={deltas.sessions.percent > 0 ? 'up' : deltas.sessions.percent < 0 ? 'down' : 'neutral'}
          icon={Users}
          tooltip="Número total de sesiones en el período seleccionado"
        />

        {/* Tasa de Conversión */}
        <MetricCard
          title="Tasa de Conversión"
          value={formatPercent(data.conversionRate)}
          subtitle={`${formatNumber(data.orders)} órdenes`}
          delta={deltas.conversionRate.percent}
          trend={deltas.conversionRate.percent > 0 ? 'up' : deltas.conversionRate.percent < 0 ? 'down' : 'neutral'}
          status={data.conversionRate > 2.5 ? 'good' : data.conversionRate > 1 ? 'warning' : 'error'}
          icon={TrendingUp}
          tooltip="Porcentaje de sesiones que resultaron en una compra"
        >
          {/* Mini KPIs del embudo */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="text-gray-600">ATC%</div>
              <div className="font-bold text-gray-900">
                {formatPercent((data.funnel.addToCarts / data.funnel.sessions) * 100)}
              </div>
            </div>
            <div>
              <div className="text-gray-600">Checkout%</div>
              <div className="font-bold text-gray-900">
                {formatPercent((data.funnel.checkouts / data.funnel.sessions) * 100)}
              </div>
            </div>
            <div>
              <div className="text-gray-600">Purchase%</div>
              <div className="font-bold text-gray-900">
                {formatPercent((data.funnel.purchases / data.funnel.sessions) * 100)}
              </div>
            </div>
          </div>
        </MetricCard>

        {/* GMV */}
        <MetricCard
          title="Ventas Netas"
          value={formatCurrency(data.netSales)}
          subtitle={`AOV: ${formatCurrency(data.netSales / data.orders)}`}
          delta={15.3}
          trend="up"
          status="good"
          icon={ShoppingCart}
          tooltip="Ventas netas (después de descuentos y devoluciones)"
        />

        {/* Usuarios Activos Ahora */}
        <MetricCard
          title="Usuarios Activos Ahora"
          value={data.liveUsers.current}
          subtitle="En vivo - últimos 5 minutos"
          icon={Zap}
          tooltip="Usuarios navegando activamente en este momento"
        >
          {/* Mini sparkline */}
          <div className="h-16">
            <Chart
              data={data.liveUsers.timeline}
              type="area"
              lines={[
                { dataKey: 'users', color: colors.brand.DEFAULT }
              ]}
              xDataKey="time"
              showGrid={false}
              showLegend={false}
              showTooltip={false}
              height={64}
            />
          </div>
        </MetricCard>

        {/* Core Web Vitals */}
        <MetricCard
          title="LCP (p75)"
          value={`${(data.avgLCP / 1000).toFixed(2)}s`}
          subtitle="Largest Contentful Paint"
          status={data.avgLCP <= 2500 ? 'good' : data.avgLCP <= 4000 ? 'warning' : 'error'}
          icon={Zap}
          tooltip="Tiempo de carga del elemento más grande"
        />

        {/* Tasa de Devoluciones */}
        <MetricCard
          title="Tasa de Devoluciones"
          value={formatPercent(data.avgReturnRate)}
          subtitle="Por unidades vendidas"
          status={data.avgReturnRate < 10 ? 'good' : data.avgReturnRate < 15 ? 'warning' : 'error'}
          trend={data.avgReturnRate < 10 ? 'down' : 'up'}
          icon={TrendingUp}
          tooltip="Porcentaje de productos devueltos"
        />
      </div>

      {/* Gráfica de Sesiones y Usuarios */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Tráfico en el Tiempo</h2>
          <p className="text-sm text-gray-600">Evolución de sesiones y usuarios únicos</p>
        </div>
        <Chart
          data={sessionsChartData}
          type="line"
          lines={[
            { dataKey: 'sesiones', name: 'Sesiones', color: colors.brand.DEFAULT },
            { dataKey: 'usuarios', name: 'Usuarios', color: colors.blueLink },
          ]}
          height={350}
          formatter={(value) => formatNumber(value)}
        />
      </div>

      {/* Embudo de Conversión Visual */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Embudo de Conversión</h2>
          <p className="text-sm text-gray-600">Flujo de usuarios a través del proceso de compra</p>
        </div>
        
        <div className="space-y-3">
          {/* Sesiones */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Sesiones (Landing)</span>
              <span className="text-sm font-bold text-gray-900">{formatNumber(data.funnel.sessions)}</span>
            </div>
            <div className="w-full h-8 bg-brand rounded" style={{ width: '100%' }}></div>
            <div className="text-xs text-gray-600 mt-1">100%</div>
          </div>

          {/* PDP Views */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Viewed Product (PDP)</span>
              <span className="text-sm font-bold text-gray-900">{formatNumber(data.funnel.pdpViews)}</span>
            </div>
            <div className="w-full h-8 bg-brand-600 rounded" style={{ width: `${(data.funnel.pdpViews / data.funnel.sessions) * 100}%` }}></div>
            <div className="text-xs text-gray-600 mt-1">
              {formatPercent((data.funnel.pdpViews / data.funnel.sessions) * 100)} del tráfico
            </div>
          </div>

          {/* Add to Cart */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Added to Cart (ATC)</span>
              <span className="text-sm font-bold text-gray-900">{formatNumber(data.funnel.addToCarts)}</span>
            </div>
            <div className="w-full h-8 bg-warning rounded" style={{ width: `${(data.funnel.addToCarts / data.funnel.sessions) * 100}%` }}></div>
            <div className="text-xs text-gray-600 mt-1">
              {formatPercent((data.funnel.addToCarts / data.funnel.sessions) * 100)} del tráfico
            </div>
          </div>

          {/* Checkout */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Reached Checkout</span>
              <span className="text-sm font-bold text-gray-900">{formatNumber(data.funnel.checkouts)}</span>
            </div>
            <div className="w-full h-8 bg-yellow rounded" style={{ width: `${(data.funnel.checkouts / data.funnel.sessions) * 100}%` }}></div>
            <div className="text-xs text-gray-600 mt-1">
              {formatPercent((data.funnel.checkouts / data.funnel.sessions) * 100)} del tráfico
            </div>
          </div>

          {/* Purchased */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Purchased</span>
              <span className="text-sm font-bold text-gray-900">{formatNumber(data.funnel.purchases)}</span>
            </div>
            <div className="w-full h-8 bg-ok rounded" style={{ width: `${(data.funnel.purchases / data.funnel.sessions) * 100}%` }}></div>
            <div className="text-xs text-gray-600 mt-1">
              {formatPercent((data.funnel.purchases / data.funnel.sessions) * 100)} del tráfico (CR)
            </div>
          </div>
        </div>

        {/* Insight automático */}
        <div className="mt-4 p-3 bg-brand-50 rounded-lg">
          <p className="text-sm text-gray-900">
            <strong>💡 Insight:</strong> Mayor caída: Landing → PDP (-{formatPercent(100 - (data.funnel.pdpViews / data.funnel.sessions) * 100)}%). 
            Considera mejorar la navegación y destacar productos populares en el home.
          </p>
        </div>
      </div>

      {/* Grid de Métricas Adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Productos Vistos */}
        <div className="bg-white border border-gray-400 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top 5 Productos Más Vistos</h2>
          <div className="space-y-3">
            {data.topProducts.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-sm font-bold text-gray-700">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                    <div className="text-xs text-gray-600">{formatCurrency(product.price)}</div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm font-bold text-gray-900">{formatNumber(product.views)}</div>
                  <div className="text-xs text-gray-600">vistas</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sesiones por Dispositivo */}
        <div className="bg-white border border-gray-400 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Sesiones por Dispositivo</h2>
          <div className="space-y-3">
            {Object.entries(data.deviceData).map(([device, stats]) => {
              const deviceLabels = {
                mobile: 'Móvil',
                desktop: 'Desktop',
                tablet: 'Tablet',
                other: 'Otros',
              };
              const totalSessions = Object.values(data.deviceData).reduce((sum, d) => sum + d.sessions, 0);
              const percent = (stats.sessions / totalSessions) * 100;

              return (
                <div key={device}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{deviceLabels[device]}</span>
                    <span className="text-sm font-bold text-gray-900">{formatNumber(stats.sessions)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-brand h-2 rounded-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-600">{formatPercent(percent)}</span>
                    <span className="text-xs text-gray-600">CR: {formatPercent(stats.cr)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
