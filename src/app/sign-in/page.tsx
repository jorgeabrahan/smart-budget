import CustomTitle from '@/components/customs/CustomTitle'
import FormSignIn from '@/components/pages/sign-in/FormSignIn'
import WrapperDelimiter from '@/components/wrappers/WrapperDelimiter'
import Link from 'next/link'

export default function PageSignIn() {
  return (
    <WrapperDelimiter className='min-h-screen flex flex-col justify-center'>
      <div className='bg-night-600 pt-4 pb-8 px-4 rounded-lg space-y-6 w-full max-w-[500px] mx-auto'>
        <CustomTitle as='h1' className='text-center'>
          Sign In
        </CustomTitle>
        <FormSignIn />
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
