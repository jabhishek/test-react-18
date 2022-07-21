import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { AppHeader } from './components/AppHeader';

const LazyHome = React.lazy(() => import('./pages/Home/Home'));

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
