import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ < AuthLayout /> }>
            <Route index element={ < Login /> }/>
            <Route path="register" element={ < Registrar /> }/>
            <Route path='confirm/:token' element={ < ConfirmarCuenta /> }/>
            <Route path='forgot-password' element={ < ForgotPassword /> }/>
            <Route path='new-password/:token' element={ < NewPassword /> }/>
            <Route path='admin' element={ < Admin /> }/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
