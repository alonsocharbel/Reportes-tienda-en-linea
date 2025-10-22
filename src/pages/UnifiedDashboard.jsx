import React from 'react';
import { Users, MousePointerClick, ShoppingCart, TrendingUp, Eye, Zap, Package, DollarSign, TrendingDown } from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Chart from '../components/common/Chart';
import DataTable from '../components/common/DataTable';
import { useMetrics } from '../hooks/useMetrics';
import { formatNumber, formatPercent, formatCurrency } from '../utils/formatters';
import colors from '../styles/colors';

const UnifiedDashboard = () => {
  const { data, deltas } = useMetrics();

  // Preparar datos para gráficas
  const sessionsChartData = data.sessionsTimeline.map((item, index) => ({
    date: item.date,
    sesiones: item.value,
    usuarios: data.usersTimeline[index]?.value || 0,
  }));

  // Columnas para tablas
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

  const productColumns = [
    { key: 'name', label: 'Producto', sortable: true },
    { 
      key: 'views', 
      label: 'Vistas', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
    { 
      key: 'atc', 
      label: 'Agregados al Carrito', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
    { 
      key: 'atcRate', 
      label: 'ATC%', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatPercent(val)
    },
    { 
      key: 'price', 
      label: 'Precio', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatCurrency(val)
    },
  ];

  const collectionColumns = [
    { key: 'name', label: 'Colección', sortable: true },
    { 
      key: 'visits', 
      label: 'Visitas', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
  ];

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

  // Calcular totales financieros
  const totalGross = data.salesData.reduce((sum, d) => sum + d.gross, 0);
  const totalNet = data.salesData.reduce((sum, d) => sum + d.net, 0);
  const totalDiscounts = data.salesData.reduce((sum, d) => sum + d.discounts, 0);
  const totalReturns = data.salesData.reduce((sum, d) => sum + d.returns, 0);
  const totalCOGS = data.cogsData.reduce((sum, p) => sum + p.cogs, 0);
  const totalGrossProfit = totalNet - totalCOGS;
  const grossMargin = (totalGrossProfit / totalNet) * 100;

  return (
    <div className="space-y-8">
      {/* ========== RESUMEN EJECUTIVO ========== */}
      <section>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Reportería - T1 Tienda</h1>
          <p className="text-gray-600 mt-1">
            Vista completa de todas las métricas clave de tu tienda en línea
          </p>
        </div>

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

          {/* Ventas Netas */}
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

          {/* Ganancia Bruta */}
          <MetricCard
            title="Ganancia Bruta"
            value={formatCurrency(totalGrossProfit, true)}
            subtitle={`Margen: ${formatPercent(grossMargin)}`}
            icon={TrendingUp}
            status={grossMargin >= 40 ? 'good' : grossMargin >= 20 ? 'warning' : 'error'}
          />

          {/* Tasa de Devoluciones */}
          <MetricCard
            title="Tasa de Devoluciones"
            value={formatPercent(data.avgReturnRate)}
            subtitle="Por unidades vendidas"
            status={data.avgReturnRate < 10 ? 'good' : data.avgReturnRate < 15 ? 'warning' : 'error'}
            trend={data.avgReturnRate < 10 ? 'down' : 'up'}
            icon={TrendingDown}
            tooltip="Porcentaje de productos devueltos"
          />
        </div>
      </section>

      {/* ========== EMBUDO DE CONVERSIÓN ========== */}
      <section className="bg-white border border-gray-400 rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Embudo de Conversión</h2>
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

        <div className="mt-4 p-3 bg-brand-50 rounded-lg">
          <p className="text-sm text-gray-900">
            <strong>💡 Insight:</strong> Mayor caída: Landing → PDP (-{formatPercent(100 - (data.funnel.pdpViews / data.funnel.sessions) * 100)}%). 
            Considera mejorar la navegación y destacar productos populares en el home.
          </p>
        </div>
      </section>

      {/* ========== TRÁFICO ========== */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Tráfico & Conversión</h2>
          <p className="text-sm text-gray-600">Evolución de sesiones y usuarios únicos</p>
        </div>

        <div className="bg-white border border-gray-400 rounded-lg p-6">
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
      </section>

      {/* ========== BÚSQUEDA INTERNA ========== */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Búsqueda Interna</h2>
          <p className="text-sm text-gray-600">Análisis de términos más buscados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

        <div className="bg-white border border-gray-400 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Términos Buscados</h3>
          <DataTable
            data={data.searchTerms}
            columns={searchColumns}
            searchable={true}
            exportable={true}
          />
        </div>
      </section>

      {/* ========== PRODUCTOS Y COLECCIONES ========== */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Productos & Colecciones</h2>
          <p className="text-sm text-gray-600">Rendimiento de productos y colecciones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MetricCard
            title="Total Productos Vistos"
            value={formatNumber(data.topProducts.reduce((sum, p) => sum + p.views, 0))}
            icon={Package}
          />
          
          <MetricCard
            title="Total ATC"
            value={formatNumber(data.topProducts.reduce((sum, p) => sum + p.atc, 0))}
            icon={ShoppingCart}
          />
          
          <MetricCard
            title="ATC% Promedio"
            value={formatPercent(data.topProducts.reduce((sum, p) => sum + p.atcRate, 0) / data.topProducts.length)}
            status="good"
            icon={TrendingUp}
          />
        </div>

        <div className="bg-white border border-gray-400 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Productos Más Vistos</h3>
          <DataTable
            data={data.topProducts}
            columns={productColumns}
            searchable={true}
            exportable={true}
          />
        </div>

        <div className="bg-white border border-gray-400 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Colecciones Más Visitadas</h3>
          <DataTable
            data={data.collections}
            columns={collectionColumns}
          />
        </div>
      </section>

      {/* ========== SEGMENTACIÓN ========== */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Segmentación</h2>
          <p className="text-sm text-gray-600">Análisis por dispositivo y ubicación</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sesiones por Dispositivo */}
          <div className="bg-white border border-gray-400 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Sesiones por Dispositivo</h3>
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

          {/* Top 5 Productos Vistos */}
          <div className="bg-white border border-gray-400 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top 5 Productos Más Vistos</h3>
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
        </div>
      </section>

      {/* ========== FINANCIERO ========== */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Métricas Financieras</h2>
          <p className="text-sm text-gray-600">Análisis de ventas, márgenes y rentabilidad</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
        <div className="bg-white border border-gray-400 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Evolución de Ventas</h3>
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
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Breakdown del Período:</h4>
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

        {/* Tabla COGS */}
        <div className="bg-white border border-gray-400 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">COGS y Ganancia Bruta por Producto</h3>
          <DataTable
            data={data.cogsData}
            columns={cogsColumns}
            searchable={true}
            exportable={true}
          />
        </div>

        {/* Tabla de Devoluciones */}
        <div className="bg-white border border-gray-400 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tasa de Devoluciones por Producto</h3>
          <DataTable
            data={data.returnsData.sort((a, b) => b.rate - a.rate)}
            columns={returnsColumns}
            exportable={true}
          />
        </div>

        {/* Alerta */}
        {data.cogsData.some(p => p.margin < 20) && (
          <div className="mt-6 bg-red-50 border-l-4 border-error p-4 rounded">
            <p className="text-sm text-gray-900">
              <strong>⚠️ Alerta:</strong> {data.cogsData.filter(p => p.margin < 20).length} producto(s) con margen crítico (&lt;20%). 
              Revisa tu estrategia de pricing o costos de adquisición.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default UnifiedDashboard;
