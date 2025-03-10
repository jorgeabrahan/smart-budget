import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { UtilsFormValidate } from '../../lib/utils/UtilsFormValidate'
import { UtilsToast } from '../../lib/utils/UtilsToast'
import { UtilsFormat } from '../../lib/utils/UtilsFormat'
import CustomInput from '../custom/CustomInput'
import CustomButton from '../custom/CustomButton'
import { TypeFormSignUp } from '../../lib/types/Forms'

export default function FormSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password, passwordConfirmation } = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as TypeFormSignUp
    const requiredValidation = UtilsFormValidate.required([
      name,
      email,
      password,
      passwordConfirmation
    ])
    if (!requiredValidation.isValid) {
      UtilsToast.error(requiredValidation.message)
      return
    }
    if (name.trim().split(' ').length < 2) {
      UtilsToast.error('Full name must have at least 2 words')
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
    if (password !== passwordConfirmation) {
      UtilsToast.error('Passwords do not match')
      return
    }
    setIsLoading(true)
    await signUp({
      displayName: UtilsFormat.capitalizeWords(name),
      email,
      password
    })
    setIsLoading(false)
  }
  return (
    <form className='space-y-4' onSubmit={onSubmit}>
      <CustomInput label='Full Name' id='name' disabled={isLoading} required />
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
      <CustomInput
        label='Confirm Password'
        id='passwordConfirmation'
        type='password'
        disabled={isLoading}
        required
      />
      <CustomButton
        className='block w-full bg-steel-blue'
        type='submit'
        disabled={isLoading}
      >
        Sign Up
      </CustomButton>
    </form>
  )
}
