import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Package, 
  Zap, 
  DollarSign,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import colors from '../../styles/colors';

const Sidebar = ({ isOpen, onToggle }) => {
  const navItems = [
    {
      path: '/dashboard',
      label: 'Resumen',
      icon: LayoutDashboard,
      description: 'Vista general'
    },
    {
      path: '/traffic',
      label: 'Tráfico',
      icon: TrendingUp,
      description: 'Sesiones & Conversión'
    },
    {
      path: '/products',
      label: 'Productos',
      icon: Package,
      description: 'Top productos & búsquedas'
    },
    {
      path: '/performance',
      label: 'Performance',
      icon: Zap,
      description: 'Core Web Vitals'
    },
    {
      path: '/financial',
      label: 'Financiero',
      icon: DollarSign,
      description: 'Ventas & Márgenes'
    }
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-400 flex flex-col transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-400 flex items-center justify-between">
        {isOpen ? (
          <div>
            <h2 className="text-xl font-bold" style={{ color: colors.brand.DEFAULT }}>
              T1
            </h2>
            <p className="text-xs text-gray-600">Reportería</p>
          </div>
        ) : (
          <h2 className="text-2xl font-bold mx-auto" style={{ color: colors.brand.DEFAULT }}>
            T1
          </h2>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand font-semibold'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{item.label}</div>
                  <div className="text-xs text-gray-600 truncate">{item.description}</div>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="m-4 p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Footer */}
      {isOpen && (
        <div className="p-4 border-t border-gray-400 text-xs text-gray-600">
          <p>T1 Tienda © 2025</p>
          <p className="mt-1">v1.0.0 - MVP</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
