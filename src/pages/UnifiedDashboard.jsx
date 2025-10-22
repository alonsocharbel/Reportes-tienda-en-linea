import React from 'react';
import { Users, MousePointerClick, ShoppingCart, TrendingUp, Eye, Zap, Package, DollarSign, TrendingDown, Search, MapPin, UserCheck } from 'lucide-react';
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

  const stateColumns = [
    { key: 'state', label: 'Estado', sortable: true },
    { 
      key: 'sessions', 
      label: 'Sesiones', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
    { 
      key: 'percent', 
      label: '% del Total', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatPercent(val)
    },
    { 
      key: 'cr', 
      label: 'CR', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatPercent(val)
    },
    { 
      key: 'gmv', 
      label: 'GMV', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatCurrency(val, true)
    },
    { 
      key: 'orders', 
      label: 'Órdenes', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
  ];

  const searchConversionColumns = [
    { key: 'term', label: 'Término', sortable: true },
    { 
      key: 'searches', 
      label: 'Búsquedas', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
    { 
      key: 'conversions', 
      label: 'Conversiones', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatNumber(val)
    },
    { 
      key: 'cr', 
      label: 'CR', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatPercent(val)
    },
    { 
      key: 'gmv', 
      label: 'GMV Generado', 
      sortable: true, 
      align: 'right',
      formatter: (val) => formatCurrency(val, true)
    },
  ];

  // Calcular totales financieros
  const totalGross = data.salesData.reduce((sum, d) => sum + d.gross, 0);
  const totalNet = data.salesData.reduce((sum, d) => sum + d.net, 0);
  const totalDiscounts = data.salesData.reduce((sum, d) => sum + d.discounts, 0);
  const totalReturns = data.salesData.reduce((sum, d) => sum + d.returns, 0);
  const totalCOGS = data.cogsData.reduce((sum, p) => sum + p.cogs, 0);
  const totalGrossProfit = totalNet - totalCOGS;
  const grossMargin = (totalGrossProfit / totalNet) * 100;

  // Métrica #21: Conversión de Checkout
  const checkoutConversion = (data.funnel.purchases / data.funnel.checkouts) * 100;

  // Métrica #22: Conversiones desde Búsqueda
  const searchConversions = data.searchConversions || [];
  const totalSearchConversions = searchConversions.reduce((sum, s) => sum + s.conversions, 0);
  const searchCR = data.searchCR || 0;
  const searchVsGlobalMultiplier = searchCR / data.conversionRate;

  // Métrica #23: Clientes Nuevos vs Habituales
  const newCustomers = data.customerSegmentation?.new || { orders: 0, gmv: 0, aov: 0 };
  const returningCustomers = data.customerSegmentation?.returning || { orders: 0, gmv: 0, aov: 0 };
  const totalCustomerOrders = newCustomers.orders + returningCustomers.orders;
  const newCustomerPercent = (newCustomers.orders / totalCustomerOrders) * 100;
  const returningCustomerPercent = (returningCustomers.orders / totalCustomerOrders) * 100;
  const aovDifference = returningCustomers.aov > newCustomers.aov 
    ? ((returningCustomers.aov - newCustomers.aov) / newCustomers.aov) * 100
    : ((newCustomers.aov - returningCustomers.aov) / returningCustomers.aov) * 100;

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

          {/* Métrica #21: Conversión de Checkout */}
          <MetricCard
            title="Conversión de Checkout"
            value={formatPercent(checkoutConversion)}
            subtitle={`${formatNumber(data.funnel.purchases)} de ${formatNumber(data.funnel.checkouts)} checkouts`}
            status={checkoutConversion >= 70 ? 'good' : checkoutConversion >= 50 ? 'warning' : 'error'}
            icon={ShoppingCart}
            tooltip="Porcentaje de sesiones que llegaron a checkout y completaron la compra. <50%: revisar costos/envío; 50-70%: probar simplificación; >70%: saludable"
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

        {/* Métrica #3: % Nuevos vs Recurrentes (VISITANTES) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white border border-gray-400 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Métrica #19: Visitantes Únicos a lo Largo del Tiempo</h3>
            <p className="text-sm text-gray-600 mb-4">Ratio de sesiones por visitante indica nivel de engagement</p>
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

          <div className="bg-white border border-gray-400 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Métrica #3: Nuevos vs Recurrentes</h3>
            <p className="text-xs text-gray-600 mb-4">
              <strong>Nota:</strong> Mide VISITANTES, no compradores. Para compradores ver Métrica 23.
            </p>

            {/* Dona visual */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={colors.brand[200]}
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={colors.brand.DEFAULT}
                    strokeWidth="20"
                    strokeDasharray={`${(data.newVisitors / data.users) * 251.2} 251.2`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPercent((data.newVisitors / data.users) * 100)}
                    </div>
                    <div className="text-xs text-gray-600">Nuevos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.brand.DEFAULT }}></div>
                  <span className="text-sm text-gray-700">Nuevos</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{formatNumber(data.newVisitors)}</div>
                  <div className="text-xs text-gray-600">{formatPercent((data.newVisitors / data.users) * 100)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.brand[200] }}></div>
                  <span className="text-sm text-gray-700">Recurrentes</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{formatNumber(data.users - data.newVisitors)}</div>
                  <div className="text-xs text-gray-600">{formatPercent(((data.users - data.newVisitors) / data.users) * 100)}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
              ℹ️ Si el visitante borró cookies o usa otro dispositivo, puede contabilizar como nuevo.
            </div>
          </div>
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

        <div className="bg-white border border-gray-400 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Términos Buscados</h3>
          <DataTable
            data={data.searchTerms}
            columns={searchColumns}
            searchable={true}
            exportable={true}
          />
        </div>

        {/* Métrica #22: Conversiones desde Búsqueda */}
        <div className="bg-white border border-gray-400 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Métrica #22: Conversiones desde Búsqueda</h3>
            <p className="text-sm text-gray-600">Compras realizadas en sesiones donde el usuario utilizó la búsqueda interna</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <MetricCard
              title="Conversiones con Búsqueda"
              value={formatNumber(totalSearchConversions)}
              subtitle="En el período"
              icon={Search}
            />

            <MetricCard
              title="Search CR"
              value={formatPercent(searchCR)}
              subtitle="Tasa de conversión con búsqueda"
              status={searchCR > data.conversionRate ? 'good' : 'warning'}
              icon={TrendingUp}
            />

            <MetricCard
              title="Search CR vs CR Global"
              value={`×${searchVsGlobalMultiplier.toFixed(1)}`}
              subtitle={`Sesiones con búsqueda convierten ${searchVsGlobalMultiplier.toFixed(1)}x más`}
              status="good"
              icon={TrendingUp}
            />
          </div>

          <h4 className="text-md font-bold text-gray-900 mb-3">Top Términos por Conversión</h4>
          <DataTable
            data={searchConversions}
            columns={searchConversionColumns}
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

        {/* Métrica #17: Sesiones por Estado (México) */}
        <div className="bg-white border border-gray-400 rounded-lg p-6 mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Métrica #17: Sesiones por Estado (México)</h3>
            <p className="text-sm text-gray-600">Distribución geográfica basada en geolocalización de IP</p>
            <div className="inline-block mt-2 px-3 py-1 bg-yellow-50 border border-warning rounded-full text-xs text-gray-700">
              ⚠️ Navegación basada en consentimiento
            </div>
          </div>

          {/* Mapa de Calor Simplificado */}
          <div className="mb-6 p-6 bg-gray-50 rounded-lg">
            <div className="text-center text-gray-600 mb-4">
              <MapPin className="inline-block w-12 h-12 mb-2" />
              <p className="text-sm">Mapa de calor de México (Vista simplificada)</p>
              <p className="text-xs text-gray-500 mt-1">Los estados con mayor tráfico se muestran en tonos más oscuros</p>
            </div>

            {/* Top 5 Estados visualizado */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {data.stateData && data.stateData.slice(0, 5).map((state, idx) => {
                const maxSessions = data.stateData[0]?.sessions || 1;
                const intensity = (state.sessions / maxSessions) * 100;
                return (
                  <div key={state.state} className="text-center">
                    <div 
                      className="w-full h-16 rounded-lg mb-2 flex items-center justify-center text-white font-bold"
                      style={{ 
                        backgroundColor: colors.brand.DEFAULT,
                        opacity: intensity / 100
                      }}
                    >
                      {state.state}
                    </div>
                    <div className="text-xs font-medium text-gray-900">{formatNumber(state.sessions)}</div>
                    <div className="text-xs text-gray-600">sesiones</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabla completa */}
          <h4 className="text-md font-bold text-gray-900 mb-3">Detalle por Estado</h4>
          <DataTable
            data={data.stateData || []}
            columns={stateColumns}
            searchable={true}
            exportable={true}
          />
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

        {/* Métrica #20: Clientes Nuevos en el Tiempo */}
        <div className="bg-white border border-gray-400 rounded-lg p-6 mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Métrica #20: Clientes Nuevos en el Tiempo</h3>
            <p className="text-sm text-gray-600">Clientes que realizaron su primera compra en la tienda</p>
          </div>

          <Chart
            data={data.newCustomersTimeline || []}
            type="line"
            lines={[
              { dataKey: 'newCustomers', name: 'Clientes Nuevos', color: colors.ok },
              { dataKey: 'percentOfOrders', name: '% de Órdenes de Nuevos', color: colors.warning, yAxisId: 'right' },
            ]}
            height={300}
            formatter={(value, name) => 
              name === '% de Órdenes de Nuevos' ? formatPercent(value) : formatNumber(value)
            }
          />

          <div className="mt-4 p-3 bg-brand-50 rounded-lg text-sm">
            <strong>💡 Nota:</strong> Esta métrica muestra nuevos clientes en el canal web. 
            Clientes con compras previas en tiendas físicas cuentan como "nuevos" en web.
          </div>
        </div>

        {/* Métrica #23: Clientes Nuevos vs Habituales (COMPRADORES) */}
        <div className="bg-white border border-gray-400 rounded-lg p-6 mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Métrica #23: Clientes Nuevos vs Habituales</h3>
            <p className="text-sm text-gray-600">
              <strong>Nota:</strong> Basado en COMPRADORES (órdenes), no visitantes. Para visitantes ver Métrica 3.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dona */}
            <div className="flex items-center justify-center">
              <div className="relative w-56 h-56">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={colors.brand[200]}
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={colors.ok}
                    strokeWidth="20"
                    strokeDasharray={`${(newCustomerPercent / 100) * 251.2} 251.2`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPercent(newCustomerPercent)}
                    </div>
                    <div className="text-sm text-gray-600">Nuevos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desglose */}
            <div className="lg:col-span-2 space-y-4">
              {/* Nuevos */}
              <div className="p-4 bg-green-50 border border-ok rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5 text-ok" />
                    <h4 className="font-bold text-gray-900">Clientes Nuevos</h4>
                  </div>
                  <div className="text-lg font-bold text-ok">{formatPercent(newCustomerPercent)}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Órdenes</div>
                    <div className="font-bold text-gray-900">{formatNumber(newCustomers.orders)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">GMV</div>
                    <div className="font-bold text-gray-900">{formatCurrency(newCustomers.gmv, true)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">AOV</div>
                    <div className="font-bold text-gray-900">{formatCurrency(newCustomers.aov)}</div>
                  </div>
                </div>
              </div>

              {/* Habituales */}
              <div className="p-4 bg-blue-50 border border-blueLink rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blueLink" />
                    <h4 className="font-bold text-gray-900">Clientes Habituales</h4>
                  </div>
                  <div className="text-lg font-bold text-blueLink">{formatPercent(returningCustomerPercent)}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Órdenes</div>
                    <div className="font-bold text-gray-900">{formatNumber(returningCustomers.orders)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">GMV</div>
                    <div className="font-bold text-gray-900">{formatCurrency(returningCustomers.gmv, true)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">AOV</div>
                    <div className="font-bold text-gray-900">{formatCurrency(returningCustomers.aov)}</div>
                  </div>
                </div>
              </div>

              {/* Insight de AOV */}
              {aovDifference > 25 && (
                <div className="p-3 bg-yellow-50 border-l-4 border-warning rounded">
                  <p className="text-sm text-gray-900">
                    <strong>💡 Insight:</strong> Clientes {returningCustomers.aov > newCustomers.aov ? 'habituales' : 'nuevos'} gastan{' '}
                    {formatPercent(aovDifference)} más por orden ({formatCurrency(Math.max(returningCustomers.aov, newCustomers.aov))} vs{' '}
                    {formatCurrency(Math.min(returningCustomers.aov, newCustomers.aov))}).
                  </p>
                </div>
              )}
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
