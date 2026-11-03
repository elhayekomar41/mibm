import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AboutPage, ArticlePage, HomePage, InsightsPage, MethodPage, NotFoundPage, WhatWeDoPage, WhoWeServePage } from './pages/Pages'
import { BookPage } from './pages/BookPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="what-we-do" element={<WhatWeDoPage />} />
          <Route path="our-method" element={<MethodPage />} />
          <Route path="who-we-serve" element={<WhoWeServePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="insights/:slug" element={<ArticlePage />} />
          <Route path="book-a-diagnosis" element={<BookPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
