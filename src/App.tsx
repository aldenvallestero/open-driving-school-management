import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const LoginPage = React.lazy(() => import('./pages/login-page'));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/' 
          element={
            <Suspense fallback="Login ...">
              <LoginPage />
            </Suspense>
          }
          />
      </Routes>
    </Router>
  );
}

export default App;
