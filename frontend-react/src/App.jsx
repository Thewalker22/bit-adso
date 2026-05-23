import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Registro from './pages/Registro'

import './App.css'

function App() {
  
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/registro' element={<Registro />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />

      <Route path='/' element={<Navigate to='/login'/>}/>
    </Routes>
   </BrowserRouter>
  
  )
}

export default App
