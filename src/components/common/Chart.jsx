import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import colors from '../../styles/colors';
import { format } from 'date-fns';

const Chart = ({
  data,
  type = 'line', // 'line', 'area', 'bar'
  lines = [], // Array of { dataKey, name, color }
  xDataKey = 'date',
  yAxisLabel,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  formatter,
  tooltipFormatter,
  className = '',
}) => {
  // Formatear fecha para eje X
  const formatXAxis = (value) => {
    try {
      const date = new Date(value);
      return format(date, 'dd MMM');
    } catch {
      return value;
    }
  };

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-400 rounded-lg shadow-lg p-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">
            {formatXAxis(label)}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 mb-1">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-gray-700">{entry.name}:</span>
              </div>
              <span className="text-xs font-bold text-gray-900">
                {tooltipFormatter ? tooltipFormatter(entry.value) : formatter ? formatter(entry.value) : entry.value.toLocaleString('es-MX')}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Renderizar según el tipo de gráfica
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    const xAxisProps = {
      dataKey: xDataKey,
      tick: { fontSize: 12, fill: '#6B7280' },
      tickFormatter: formatXAxis,
      stroke: colors.gray[400],
    };

    const yAxisProps = {
      tick: { fontSize: 12, fill: '#6B7280' },
      tickFormatter: formatter,
      stroke: colors.gray[400],
      label: yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', style: { fontSize: 12 } } : undefined,
    };

    const gridProps = showGrid ? {
      strokeDasharray: '3 3',
      stroke: colors.gray[400],
    } : false;

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {showLegend && <Legend />}
            {lines.map((line, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color || colors.brand.DEFAULT}
                fill={line.color || colors.brand.DEFAULT}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {showLegend && <Legend />}
            {lines.map((line, index) => (
              <Bar
                key={index}
                dataKey={line.dataKey}
                name={line.name}
                fill={line.color || colors.brand.DEFAULT}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      default: // line
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {showLegend && <Legend />}
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color || colors.brand.DEFAULT}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
