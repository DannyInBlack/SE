import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {isAuth} from './auth/Auth.js'
import Login from './routes/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuth() ? <Root /> : <Login /> ,
    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
