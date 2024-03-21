import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import OthersProfile from './pages/OthersProfile'
function App() {
  


  return (
    <>
    <Router>
      <Toaster/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />
        <Route path='/profile' element = {<Profile/>} />
        <Route path='/profile/:userId' element = {<OthersProfile/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
