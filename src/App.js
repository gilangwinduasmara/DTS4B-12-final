import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BrowsePage from './pages/BrowsePage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // router
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'}/>} />
        <Route path="/login" element={
          <ProtectedRoute loginOnly={false}>
            <LoginPage />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute loginOnly={false}>
            <RegisterPage />
          </ProtectedRoute>
        } />
        <Route path="/browse" element={
          <ProtectedRoute loginOnly={true}>
            <BrowsePage />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
