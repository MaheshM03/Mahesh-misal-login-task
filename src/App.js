import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './Components/Navigation'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Users from './Pages/Users'
import { useState, createContext } from 'react'
export const UserState = createContext()


export default function App() {
  const [login, setlogin] = useState({})

  return <UserState.Provider value={login, setlogin}>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </BrowserRouter>
  </UserState.Provider>
}
