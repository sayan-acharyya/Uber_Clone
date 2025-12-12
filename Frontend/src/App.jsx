import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import UserSignup from './Pages/UserSignup.jsx'
import Userlogin from './Pages/Userlogin.jsx'
import CaptainSignup from './Pages/CaptainSignup.jsx'
import Captainlogin from './Pages/Captainlogin.jsx'
function App() {
   return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/login' element={<Userlogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/captain-login' element={<Captainlogin/>}/>
      </Routes>
    </div>
  )


}

export default App