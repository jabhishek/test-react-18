import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

import { Spinner } from '@chakra-ui/react';
import { AppHeader } from './components/AppHeader';
import Analyze from './components/AnalyzeSecurity';

const LazyHome = React.lazy(() => import('./pages/Home'));
const LazyBackTest = React.lazy(() => import('./pages/BackTest'));
const LazyPortfolios = React.lazy(() => import('./pages/Portfolios/index'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<Spinner />}>
                <LazyHome />
              </React.Suspense>
            }
          />
          <Route
            path="/back-test"
            element={
              <React.Suspense fallback={<Spinner />}>
                <LazyBackTest />
              </React.Suspense>
            }
          />
          <Route
            path="/portfolios"
            element={
              <React.Suspense fallback={<Spinner />}>
                <LazyPortfolios />
              </React.Suspense>
            }
          />
          <Route path="/analyze/:id" element={<Analyze />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
