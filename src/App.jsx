import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SharedLayout from './pages/SharedLayout'
import Error from './pages/Error'
import ProtectedRoute from './pages/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import { AppProvider } from './context'
import Verify from './pages/Verify'
import SharedSignup from './pages/SharedSignup'
import Register from './pages/Register'
import Complete from './pages/Complete'
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<SharedLayout />}> */}
          <Route
            path="/"
            element={<SharedLayout />}
          >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SharedSignup />}>
              <Route index element={<Signup />} />
              <Route path="verify" element={<Verify />} />
              <Route path="register" element={<Register />} />
              <Route path="complete" element={<Complete />} />
            </Route>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App
