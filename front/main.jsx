import { createRoot } from 'react-dom/client'
import App from './src/App'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './src/pages/HomePage'
import NotFoundPage from './src/pages/NotFoundPage'
import ProductsPage from './src/pages/ProductsPage'

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
  { path: '*', element: <NotFoundPage /> }
])

const root = createRoot(document.getElementById('app'))
root.render(<RouterProvider router={router} />)
