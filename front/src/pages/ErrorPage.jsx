import { Link, useLocation } from 'react-router-dom'

function ErrorPage () {
  const location = useLocation()
  const errorMessage = new URLSearchParams(location.search).get('message')

  return (
    <div>
      <h1> {errorMessage} </h1>
      <h4>{
        errorMessage.includes('409') &&
        'The current error is due to a problem with the data provided. Please inform the site administrator.'
        }
      </h4>
      <Link to='/' replace>
        <button type='button'>Go to Home</button>
      </Link>
    </div>
  )
}

export default ErrorPage
