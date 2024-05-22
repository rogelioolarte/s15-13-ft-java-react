import LoginLateral from '../components/pure/LoginLateral'
import LoginFormik from '../components/pure/forms/LoginFormik'

export default function LoginPage () {
  return (
    <div className='flex h-[100vh] flex-col md:flex-row'>
      <LoginLateral />
      <LoginFormik />
    </div>
  )
}
