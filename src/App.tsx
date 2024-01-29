import './App.css'
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const IdPage = React.lazy(() => import('./pages/id-page'))
const LoginPage = React.lazy(() => import('./pages/login-page'))
const ProfilePage = React.lazy(() => import('./pages/profile-page'))

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
        <Route
          path='/profile' 
          element={
            <Suspense fallback="Profile ...">
              <ProfilePage />
            </Suspense>
          }
        />
        <Route
          path='/id' 
          element={
            <Suspense fallback="Id ...">
              <IdPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App
