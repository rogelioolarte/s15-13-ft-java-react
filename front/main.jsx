import { createRoot } from 'react-dom/client'
import App from './src/App'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import DashboardPage from './src/pages/DashboardPage'
import SalesPage from './src/pages/SalesPage'
import SuppliersPage from './src/pages/SuppliersPage'
import PurchasesPage from './src/pages/PurchasesPage'
import NotFoundPage from './src/pages/NotFoundPage'
import LoginPage from './src/pages/LoginPage'
import { ThemeProvider } from '@material-tailwind/react'
import { Provider } from 'react-redux'
import { store } from './src/store'
import HomePage from './src/pages/HomePage'
import ProductsPage from './src/pages/ProductsPage.jsx'
import TaxesPage from './src/pages/TaxesPage.jsx'
import CustomersPage from './src/pages/CustomersPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to='/home' /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/sales', element: <SalesPage /> },
      /* { path: '/inquiries', element: <InquiriesPage /> }, */
      { path: '/suppliers', element: <SuppliersPage /> },
      { path: '/purchases', element: <PurchasesPage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/customers', element: <CustomersPage /> },
      { path: '/taxes', element: <TaxesPage /> }
    ]
  },
  { path: '/home', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <NotFoundPage /> }
])

const root = createRoot(document.getElementById('app'))
root.render(
  <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
)
