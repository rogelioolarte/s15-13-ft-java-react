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
        if (response.status === 401) {
          sendError('Invalid Credentials')
        } else {
          sendError('Request error: ' + response.status)
        }
      }
    })
    .catch((error) => {
      sendError('Request Error: ' + error + '. Contact with the Admin.')
    })
}
