import { Search } from 'lucide-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router/internal/react-server-client'
import App from './App.tsx'
import { Community } from './components/UI/Community/Community.tsx'
import { Library } from './components/UI/Library/Library.tsx'
import Details from './components/UI/Main/Details/Details.tsx'
import { NotFound } from './components/UI/NotFound.tsx'
import { ROUTES } from './config/routing.config.ts'
import { Layout } from './layout.tsx'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <Layout>
              <App />
            </Layout>
          }
        />
        <Route
          path={ROUTES.DETAILS}
          element={
            <Layout>
              <Details />
              {/* <App /> */}
            </Layout>
          }
        />
        <Route
          path={ROUTES.SEARCH}
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path={ROUTES.LIBRARY}
          element={
            <Layout>
              <Library />
            </Layout>
          }
        />
        <Route
          path={ROUTES.COMMUNITY}
          element={
            <Layout>
              <Community />
            </Layout>
          }
        />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
