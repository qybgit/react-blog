import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import 'antd/dist/reset.css'
import Login from '@/pages/Login'
import AddArticle from "./pages/publishArticle"
import { AuthRoute } from "./components/Auth"
import Article from "./pages/Article"
import Content from "./pages/content"
import ArticleList from "./pages/ArticleList/article"
import Tag from "./pages/Tag/tag"
import Test from "./pages/Test/test"
import Category from "./pages/Category/category"
import Error from "./pages/Error/error"
import CategoryArticle from "./pages/Category/catrgoryArticle"
import TagArticle from "./pages/Tag/tagArticle"
import Serach from "./pages/Serach/serach"
function App () {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="index" element={<ArticleList />} />
              <Route path="article/:id" element={<Content />}> </Route>
              <Route path="tag" element={<Tag />} />
              <Route path="category" element={<Category />} />
              <Route path="category/:id" element={<CategoryArticle />} />
              <Route path="tag/:id" element={<TagArticle />} />
            </Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<Error />} />
            <Route path="/add" element={<AuthRoute><AddArticle /></AuthRoute>} />
          </Routes>

        </div>
      </BrowserRouter>
    </>




  )
}

export default App
