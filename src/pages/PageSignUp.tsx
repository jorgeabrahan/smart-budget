import FormSignUp from '@/components/form/FormSignUp'
import WrapperDelimiter from '@/components/wrapper/WrapperDelimiter'
import WrapperProtectedRoute from '@/components/wrapper/WrapperProtectedRoute'
import { ROUTE_RENDER_CLAUSE } from '@/lib/constants/general'
import { ROUTES } from '@/lib/constants/routes'
import { Link } from 'wouter'

export default function PageSignUp() {
  return (
    <WrapperProtectedRoute renderClause={ROUTE_RENDER_CLAUSE.unauthenticated}>
      <WrapperDelimiter className='min-h-screen flex flex-col justify-center'>
        <div className='bg-night-600 p-4 rounded-lg space-y-4 w-full max-w-[500px] mx-auto'>
          <FormSignUp />
          <p className='text-center text-sm text-white/40'>
            Already have an account?{' '}
            <Link href={ROUTES.signIn.path} className='text-steel-blue-500/80'>
              Sign In
            </Link>
          </p>
        </div>
      </WrapperDelimiter>
    </WrapperProtectedRoute>
  )
}
