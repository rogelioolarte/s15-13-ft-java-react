import LoginFormik from '../components/forms/LoginFormik'

export default function LoginPage() {
  return (
    <div className='flex flex-col-reverse md:flex-row w-full min-h-screen h-full items-center'>
      <div className='w-[100%] md:w-[50%] h-full flex items-center place-content-center py-7'>
        <h1 className='w-[70%] text-center font-bold text-[2rem] text-balance'>
          Optimize your store's inventory management!
        </h1>
      </div>
      <LoginFormik />
    </div>
  )
}
