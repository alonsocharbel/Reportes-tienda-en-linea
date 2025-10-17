import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Traffic from './pages/Traffic';
import Products from './pages/Products';
import Performance from './pages/Performance';
import Financial from './pages/Financial';
import { DateRangeProvider } from './hooks/useDateRange';
import { FiltersProvider } from './hooks/useFilters';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <DateRangeProvider>
        <FiltersProvider>
          <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/traffic" element={<Traffic />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/performance" element={<Performance />} />
                  <Route path="/financial" element={<Financial />} />
                </Routes>
              </main>
            </div>
          </div>
        </FiltersProvider>
      </DateRangeProvider>
    </Router>
  );
}

export default App;
