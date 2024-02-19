import { useState } from 'react'
import {Router,Routes,Route,Navigate, BrowserRouter} from "react-router-dom"
import Layout from './layouts/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import AddHotel from './pages/AddHotel'
import MyHotels from './pages/MyHotels'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>}/>
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>}/>
        <Route path='/register' element={<Layout><Register/></Layout>}/>
        <Route path='/login' element={<Layout><Login/></Layout>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/add-hotel' element={<Layout><AddHotel/></Layout>}/>
          <Route path='/my-hotels' element={<Layout><MyHotels/></Layout>}/>
        </Route>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
