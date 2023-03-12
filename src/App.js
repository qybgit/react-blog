import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import 'antd/dist/reset.css'
import Login from '@/pages/Login'
import AddArticle from "./pages/addArticle"
import { AuthRoute } from "./components/Auth"

function App () {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add" element={<AuthRoute><AddArticle /></AuthRoute>} />
          </Routes>

        </div>
      </BrowserRouter>
    </>




  )
}

export default App
