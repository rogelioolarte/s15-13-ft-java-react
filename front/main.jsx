import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@material-tailwind/react'
import { Provider } from 'react-redux'
import { store } from './src/store'
import { router } from './src/config/routes.js'
import { RouterProvider } from 'react-router-dom'

const root = createRoot(document.getElementById('app'))
root.render(
  <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
)
