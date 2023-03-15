import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import 'antd/dist/reset.css'
import Login from '@/pages/Login'
import AddArticle from "./pages/publishArticle"
import { AuthRoute } from "./components/Auth"
import Home from "./pages/Home"
import Article from "./pages/Article/article"
import Tag from "./pages/Tag/tag"

function App () {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Article />} />
              <Route path="/home" element={<Home />} />
              <Route path="/tag" element={<Tag />} />
            </Route>



            <Route path="/login" element={<Login />} />
            <Route path="/add" element={<AuthRoute><AddArticle /></AuthRoute>} />
          </Routes>

        </div>
      </BrowserRouter>
    </>




  )
}

export default App
