import { MAIN_API, ROUTE_LOGIN } from '../config/api_routes'

export const login = async (email, password, sendError) => {
  return await fetch(
    MAIN_API.length !== 0 ? MAIN_API.concat(ROUTE_LOGIN) : 'https://reqres.in/api/login', {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status)
      }
      return response.json()
    })
    .catch((error) => { sendError(error.message) })
}
