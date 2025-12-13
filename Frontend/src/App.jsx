import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import UserSignup from './Pages/UserSignup.jsx'
import Userlogin from './Pages/Userlogin.jsx'
import CaptainSignup from './Pages/CaptainSignup.jsx'
import Captainlogin from './Pages/Captainlogin.jsx'
import Start from './Pages/Start.jsx'
import toast, { Toaster } from 'react-hot-toast';
import UserProtectWrapper from './Pages/UserProtectWrapper.jsx'
import UserLogout from './Pages/UserLogout.jsx'
import CaptainHome from './Pages/CaptainHome.jsx'
import CaptainProtectWrapper from './Pages/CaptainProtectWrapper.jsx'
import CaptainLogout from './Pages/CaptainLogout.jsx'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/login' element={<Userlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/home'
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />

        <Route path='/user/logout'
          element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
        <Route path='/captain-home'
          element=
          {
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route path='/captain/logout'
          element=
          {
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
      <Toaster />
    </div>
  )


}

export default App