import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CharactersPage from './pages/CharactersPage'
import DetailPage from './pages/DetailPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<CharactersPage />} />
          <Route path="character/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}