import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js'
import { CssBaseline } from '@mui/material'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreeen from './screens/LoginScreeen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './screens/Profile.jsx'
import UserHeroSection from './components/UserHeroSection.jsx'
import MyNotesScreen from './screens/MyNotesScreen.jsx'
import UpdateProfileScreen from './screens/UpdateProfileScreen.jsx'
import CreateNoteScreen from './screens/CreateNoteScreen.jsx'
import UpdateNoteScreen from './screens/UpdateNoteScreen.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreeen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* private routes only accessed by authenticated user */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/user' element={<Profile />}>
          <Route index path='' element={<UserHeroSection />} />
          <Route path='notes' element={<MyNotesScreen/>} />
          <Route path='create' element={<CreateNoteScreen/>} />
          <Route path='note/update/:id' element={<UpdateNoteScreen/>} />
          <Route path='update/profile' element={<UpdateProfileScreen/>} />
        </Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <CssBaseline />
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
