import { Link } from 'react-router-dom' // Asumiendo que estás usando React Router para la navegación

export default function NotFoundPage () {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold mb-8'>404 - Not Found</h1>
      <p className='text-lg text-gray-600 mb-8'>The page you're looking for does not exist.</p>
      <Link to='/' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'>
        Go to Home
      </Link>
    </div>
  )
}
