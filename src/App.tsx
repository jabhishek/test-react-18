import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { AppHeader } from './components/AppHeader';

const LazyHome = React.lazy(() => import('./pages/Home/Home'));
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
            path="/portfolios"
            element={
              <React.Suspense fallback={<Spinner />}>
                <LazyPortfolios />
              </React.Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
