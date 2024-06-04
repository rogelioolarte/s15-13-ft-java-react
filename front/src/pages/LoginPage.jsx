import LoginFormik from '../components/forms/LoginFormik'

export default function LoginPage () {
  return (
    <div className='flex flex-col md:flex-row w-full h-[100vh]'>
      <div className='w-[100%] md:w-[50%] md:h-[100%] flex items-center place-content-center'>
        <h1 className='w-[70%] text-center font-bold text-[2rem] mt-[15%]'>
          Optimize your store's inventory management!
        </h1>
      </div>
      <LoginFormik />
    </div>
  )
}
