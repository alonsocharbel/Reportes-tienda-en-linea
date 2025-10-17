import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info, AlertTriangle } from 'lucide-react';
import colors from '../../styles/colors';

const MetricCard = ({
  title,
  value,
  subtitle,
  delta,
  deltaLabel = 'vs período anterior',
  trend, // 'up', 'down', 'neutral'
  status, // 'good', 'warning', 'error', 'neutral'
  icon: Icon,
  tooltip,
  children,
  className = '',
  size = 'default', // 'small', 'default', 'large'
  loading = false,
}) => {
  // Determinar color del delta
  const getDeltaColor = () => {
    if (!delta) return 'text-gray-600';
    if (trend === 'up') return 'text-ok';
    if (trend === 'down') return 'text-error';
    return 'text-gray-600';
  };

  // Determinar color del borde según status
  const getStatusBorderColor = () => {
    if (status === 'good') return 'border-l-ok';
    if (status === 'warning') return 'border-l-warning';
    if (status === 'error') return 'border-l-error';
    return 'border-l-transparent';
  };

  // Iconos de trend
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  // Tamaños
  const sizes = {
    small: {
      padding: 'p-3',
      titleSize: 'text-xs',
      valueSize: 'text-lg',
      subtitleSize: 'text-xs',
    },
    default: {
      padding: 'p-4',
      titleSize: 'text-sm',
      valueSize: 'text-2xl',
      subtitleSize: 'text-sm',
    },
    large: {
      padding: 'p-6',
      titleSize: 'text-base',
      valueSize: 'text-4xl',
      subtitleSize: 'text-base',
    },
  };

  const currentSize = sizes[size];

  if (loading) {
    return (
      <div className={`bg-white border border-gray-400 rounded-lg ${currentSize.padding} ${className} animate-pulse`}>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border border-gray-400 ${getStatusBorderColor()} rounded-lg ${currentSize.padding} ${className} border-l-4 hover:shadow-md transition-shadow`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className={`${currentSize.titleSize} font-semibold text-gray-700 uppercase tracking-wide`}>
              {title}
            </h3>
            {tooltip && (
              <button
                className="text-gray-600 hover:text-brand transition-colors"
                title={tooltip}
              >
                <Info size={14} />
              </button>
            )}
          </div>
        </div>
        {Icon && <Icon size={20} className="text-gray-600" />}
      </div>

      {/* Value */}
      <div className={`${currentSize.valueSize} font-bold text-gray-900 mb-1`}>
        {value}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div className={`${currentSize.subtitleSize} text-gray-600 mb-2`}>
          {subtitle}
        </div>
      )}

      {/* Delta */}
      {delta !== undefined && delta !== null && (
        <div className="flex items-center space-x-1">
          <TrendIcon size={16} className={getDeltaColor()} />
          <span className={`text-sm font-medium ${getDeltaColor()}`}>
            {delta > 0 ? '+' : ''}{typeof delta === 'number' ? delta.toFixed(1) : delta}%
          </span>
          <span className="text-xs text-gray-600">{deltaLabel}</span>
        </div>
      )}

      {/* Status Badge */}
      {status && status !== 'neutral' && (
        <div className="mt-3">
          {status === 'warning' && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-warningLight rounded text-xs">
              <AlertTriangle size={14} className="text-warning" />
              <span className="text-gray-900">Requiere atención</span>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-50 rounded text-xs">
              <AlertTriangle size={14} className="text-error" />
              <span className="text-error">Crítico</span>
            </div>
          )}
          {status === 'good' && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded text-xs">
              <span className="text-ok">✓ Saludable</span>
            </div>
          )}
        </div>
      )}

      {/* Children (for custom content like charts) */}
      {children && (
        <div className="mt-4 pt-4 border-t border-gray-400">
          {children}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
