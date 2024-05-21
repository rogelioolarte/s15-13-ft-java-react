import LoginLateral from '../components/pure/LoginLateral'
import LoginFormik from '../components/pure/forms/LoginFormik'

export default function LoginPage () {
  return (
    <div className='flex flex-row h-[100vh]'>
      <LoginLateral />
      <LoginFormik />
    </div>
  )
}
