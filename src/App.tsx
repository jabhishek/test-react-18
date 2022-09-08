import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { AppHeader } from './components/AppHeader';
import Analyze from './components/AnalyzeSecurity';

const LazyBackTest = React.lazy(() => import('./pages/BackTest'));
const LazyPortfolios = React.lazy(() => import('./pages/Portfolios/index'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppHeader />
        <Routes>
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
