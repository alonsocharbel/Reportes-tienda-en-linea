import React from 'react';
import MetricCard from '../components/common/MetricCard';
import DataTable from '../components/common/DataTable';
import { useMetrics } from '../hooks/useMetrics';
import { formatNumber, formatPercent, formatCurrency } from '../utils/formatters';
import { Package, ShoppingCart, TrendingUp } from 'lucide-react';

const Products = () => {
  const { data } = useMetrics();

  const productColumns = [
    { 
      key: 'name', 
      label: 'Producto', 
      sortable: true,
    },
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Productos & Colecciones</h1>
        <p className="text-gray-600 mt-1">
          Análisis de rendimiento de productos y colecciones
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Productos Más Vistos */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Productos Más Vistos</h2>
          <p className="text-sm text-gray-600">Ranking de productos con mayor número de visualizaciones</p>
        </div>
        <DataTable
          data={data.topProducts}
          columns={productColumns}
          searchable={true}
          exportable={true}
        />
      </div>

      {/* Colecciones Más Visitadas */}
      <div className="bg-white border border-gray-400 rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Colecciones Más Visitadas</h2>
          <p className="text-sm text-gray-600">Páginas de listado de productos (PLPs)</p>
        </div>
        <DataTable
          data={data.collections}
          columns={collectionColumns}
        />
      </div>
    </div>
  );
};

export default Products;
