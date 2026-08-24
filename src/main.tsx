import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import App from './App.tsx'
import { Community } from './components/UI/Community/Community.tsx'
import { Library } from './components/UI/Library/Library.tsx'
import Details from './components/UI/Main/Details/Details.tsx'
import { NotFound } from './components/UI/NotFound.tsx'
import { ROUTES } from './config/routing.config.ts'
import { Layout } from './layout.tsx'
import './main.css'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <App /> },
      { path: ROUTES.DETAILS, element: <Details /> },
      { path: ROUTES.SEARCH, element: <NotFound /> },
      { path: ROUTES.LIBRARY, element: <Library /> },
      { path: ROUTES.COMMUNITY, element: <Community /> }
    ]
  },
  { path: ROUTES.NOT_FOUND, element: <NotFound /> }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" hideProgressBar position="top-center" />
    </QueryClientProvider>
  </StrictMode>
)
