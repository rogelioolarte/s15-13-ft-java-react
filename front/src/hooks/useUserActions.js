import { useAppDispatch, useAppSelector } from './store'
import { resetUser, setUser } from '../store/userSlice'
import { resetSales } from '../store/salesSlice'

export const useUserActions = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  /**
   * This method check a real User in the Context
   */
  const useCheckRealUser = (user) => {
    return (user.id && user.first_name && user.last_name && user.email)
  }

  /**
   * This method reset the Context
   */
  const useResetUser = () => {
    dispatch(resetUser())
    dispatch(resetSales())
  }

  /**
   * This method set a User in the Context
   * @param {*} data This parameter required a User
   */
  const useSetUser = (data) => {
    dispatch(setUser(data))
  }

  return { useCheckRealUser, useResetUser, useSetUser, user }
}
