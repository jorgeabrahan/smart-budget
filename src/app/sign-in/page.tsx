import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import WrapperDelimiter from '@/components/WrapperDelimiter'
import Link from 'next/link'

export default function PageSignIn() {
  return (
    <WrapperDelimiter className='min-h-screen flex flex-col justify-center'>
      <div className='bg-night-600 pt-4 pb-8 px-4 rounded-lg space-y-6 w-full max-w-[500px] mx-auto'>
        <h1 className='text-4xl font-bold text-center'>Sign In</h1>
        <form className='space-y-4'>
          <CustomInput label='Email' id='email' type='email' />
          <CustomInput label='Password' id='password' type='password' />
          <CustomButton className='block w-full bg-steel-blue' type='submit'>
            Sign In
          </CustomButton>
        </form>
        <p className='text-center text-sm text-white/40'>
          Don&apos;t have an account yet?{' '}
          <Link href='/sign-up' className='text-steel-blue-500/80'>
            Sign Up
          </Link>
        </p>
      </div>
    </WrapperDelimiter>
  )
}
