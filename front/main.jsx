import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@material-tailwind/react'
import { Provider } from 'react-redux'
import { store } from './src/store/index'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './src/config/routes.jsx'

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('app'))
root.render(
  <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
)
