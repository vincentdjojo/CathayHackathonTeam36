import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom";
import MQTTComponent from './components/MqttComponent.jsx';
import Triangulation from './components/Triangulation.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />}>

          {/* Bar Path indicating distance.. */}
          <Route index = {true} path="/" element={<><MQTTComponent/> </>} />
          <Route path="/triangulate" element={<Triangulation />} />
      </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
