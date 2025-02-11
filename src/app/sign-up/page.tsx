import CustomTitle from '@/components/customs/CustomTitle'
import FormSignUp from '@/components/pages/sign-up/FormSignUp'
import WrapperDelimiter from '@/components/wrappers/WrapperDelimiter'
import Link from 'next/link'

export default function PageSignUp() {
  return (
    <WrapperDelimiter className='min-h-screen flex flex-col justify-center'>
      <div className='bg-night-600 pt-4 pb-8 px-4 rounded-lg space-y-6 w-full max-w-[500px] mx-auto'>
        <CustomTitle as='h1' className='text-center'>
          Sign Up
        </CustomTitle>
        <FormSignUp />
        <p className='text-center text-sm text-white/40'>
          Already have an account?{' '}
          <Link href='/sign-in' className='text-steel-blue-500/80'>
            Sign In
          </Link>
        </p>
      </div>
    </WrapperDelimiter>
  )
}
