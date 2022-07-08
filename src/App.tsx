import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button } from './components/Button';

const LazyHome = React.lazy(() => import('./pages/Home/Home'));

function App() {
  return (
    <div>
      Home
      <Button text={'Submit'} onClick={() => console.log('Clicked')} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<div>Loading..</div>}>
                <LazyHome text={'/messages'} />
              </React.Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
