import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { UtilsFormValidate } from '../../lib/utils/UtilsFormValidate'
import { UtilsToast } from '../../lib/utils/UtilsToast'
import CustomInput from '../custom/CustomInput'
import CustomButton from '../custom/CustomButton'
import { TypeFormSignIn } from '../../lib/types/Forms'

export default function FormSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as TypeFormSignIn
    const requiredValidation = UtilsFormValidate.required([email, password])
    if (!requiredValidation.isValid) {
      UtilsToast.error(requiredValidation.message)
      return
    }
    const emailValidation = UtilsFormValidate.email(email)
    if (!emailValidation.isValid) {
      UtilsToast.error(emailValidation.message)
      return
    }
    const passwordValidation = UtilsFormValidate.password(password)
    if (!passwordValidation.isValid) {
      UtilsToast.error(passwordValidation.message)
      return
    }
    setIsLoading(true)
    await signIn({
      email,
      password
    })
    setIsLoading(false)
  }
  return (
    <form className='space-y-4' onSubmit={onSubmit}>
      <CustomInput
        label='Email'
        id='email'
        type='email'
        disabled={isLoading}
        required
      />
      <CustomInput
        label='Password'
        id='password'
        type='password'
        disabled={isLoading}
        required
      />
      <CustomButton
        className='block w-full bg-steel-blue'
        disabled={isLoading}
        type='submit'
      >
        Sign In
      </CustomButton>
    </form>
  )
}
