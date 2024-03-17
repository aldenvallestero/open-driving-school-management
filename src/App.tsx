import './App.css'
import { UserContext } from './contexts/Context'
import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Header = React.lazy(() => import('./components/header-component'))

const IdPage = React.lazy(() => import('./pages/id-page'))
const AdminPage = React.lazy(() => import('./pages/admin-page'))
const StudentPage = React.lazy(() => import('./pages/student-page'))
const SchoolRegisterPage = React.lazy(() => import('./pages/school-register-page'))
const StudentRegisterPage = React.lazy(() => import('./pages/student-register-page'))
const SchoolLoginPage = React.lazy(() => import('./pages/school-login-page'))
const StudentLoginPage = React.lazy(() => import('./pages/student-login-page'))
const CoursePage = React.lazy(() => import('./pages/course-page'))
const LogoutPage = React.lazy(() => import('./pages/logout-page'))

function App() {

  const [user, setUser] = useState<undefined | null | string>()

  useEffect(() => {
    if (user) {
      localStorage.setItem('token', user)
    }

    if (!user) {
      const token: string | null = localStorage.getItem('token')
      if (token) setUser(token)
    }
  }, [user])

  return (

    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Suspense fallback="Header ...">
          <Header />
        </Suspense>
        <Routes>
          <Route
            path='/student/login'
            element={
              <Suspense fallback="Student Login ...">
                <StudentLoginPage />
              </Suspense>
            }
            />
          <Route
            path='/school/login'
            element={
              <Suspense fallback="School Login ...">
                <SchoolLoginPage />
              </Suspense>
            }
            />
          <Route
            path='/student/:studentId'
            element={
              <Suspense fallback="Student ...">
                <StudentPage />
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
          <Route
            path='school/register'
            element={
              <Suspense fallback="School Register ...">
                <SchoolRegisterPage />
              </Suspense>
            }
          />
          <Route
            path='student/register'
            element={
              <Suspense fallback="Student Register ...">
                <StudentRegisterPage />
              </Suspense>
            }
          />
          <Route
            path='/admin'
            element={
              <Suspense fallback="Admin ...">
                <AdminPage />
              </Suspense>
            }
          />
          <Route
            path='/course'
            element={
              <Suspense fallback="Course ...">
                <CoursePage />
              </Suspense>
            }
          />
          <Route
            path='/logout'
            element={
              <Suspense fallback="Logout ...">
                <LogoutPage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
