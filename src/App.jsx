import React from 'react';
import Header from './components/layout/Header';
import UnifiedDashboard from './pages/UnifiedDashboard';
import { DateRangeProvider } from './hooks/useDateRange';
import { FiltersProvider } from './hooks/useFilters';

function App() {
  return (
    <DateRangeProvider>
      <FiltersProvider>
        <div className="min-h-screen bg-gray-100">
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <main className="container mx-auto px-4 py-6 max-w-7xl">
            <UnifiedDashboard />
          </main>
        </div>
      </FiltersProvider>
    </DateRangeProvider>
  );
}

export default App;
