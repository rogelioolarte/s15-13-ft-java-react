import { Navigate } from 'react-router-dom'
import App from '../App'
import DashboardPage from '../pages/DashboardPage'
import SalesPage from '../pages/SalesPage'
import SuppliersPage from '../pages/SuppliersPage'
import NotFoundPage from '../pages/NotFoundPage'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import TaxesPage from '../pages/TaxesPage'
import CustomersPage from '../pages/CustomersPage'
import PurchasesPage from '../pages/PurchasesPage'
import InquiriesPage from '../pages/InquiriesPage'

const routes = [
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
]

export default routes
