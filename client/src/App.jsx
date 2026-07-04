import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/ui/Toast/Toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import ProviderDetail from './pages/ProviderDetail';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/services" element={<Services />} />
              <Route path="/providers/:id" element={<ProviderDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/provider"
                element={
                  <ProtectedRoute roles={['provider', 'admin']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
