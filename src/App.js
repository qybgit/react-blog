import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import 'antd/dist/reset.css'
import Login from '@/pages/Login'
import { Button } from 'antd'

function App () {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/lagout" element={<Layout />} />
            <Route path="/" element={<Login />} />
          </Routes>

        </div>
      </BrowserRouter>
    </>




  )
}

export default App
