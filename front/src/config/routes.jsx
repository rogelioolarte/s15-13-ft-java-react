import { Navigate, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import DashboardPage from '../pages/DashboardPage'
import SalesPage from '../pages/SalesPage'
import InquiriesPage from '../pages/InquiriesPage'
import SuppliersPage from '../pages/SuppliersPage'
import PurchasesPage from '../pages/PurchasesPage'
import ProductsPage from '../pages/ProductsPage'
import CustomersPage from '../pages/CustomersPage'
import TaxesPage from '../pages/TaxesPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to='/home' /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/sales', element: <SalesPage /> },
      { path: '/inquiries', element: <InquiriesPage /> },
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
