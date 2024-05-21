import { createRoot } from 'react-dom/client'
import App from './src/App'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './src/pages/HomePage'
import ProductsPage from './src/pages/ProductsPage'
import NotFoundPage from './src/pages/NotFoundPage'
import LoginPage from './src/pages/LoginPage'
import ErrorPage from './src/pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to='/home' /> },
      { path: '/home', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> }
    ]
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/error', element: <ErrorPage /> },
  { path: '*', element: <NotFoundPage /> }
])

const root = createRoot(document.getElementById('app'))
root.render(<RouterProvider router={router} />)
