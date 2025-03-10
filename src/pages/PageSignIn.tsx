import FormSignIn from '@/components/form/FormSignIn'
import WrapperDelimiter from '@/components/wrapper/WrapperDelimiter'
import WrapperProtectedRoute from '@/components/wrapper/WrapperProtectedRoute'
import { ROUTE_RENDER_CLAUSE } from '@/lib/constants/general'
import { ROUTES } from '@/lib/constants/routes'
import { Link } from 'react-router'

export default function PageSignIn() {
  return (
    <WrapperProtectedRoute renderClause={ROUTE_RENDER_CLAUSE.unauthenticated}>
      <WrapperDelimiter className='min-h-screen flex flex-col justify-center'>
        <div className='bg-night-600 p-4 rounded-lg space-y-4 w-full max-w-[500px] mx-auto'>
          <FormSignIn />
          <p className='text-center text-sm text-white/40'>
            Don&apos;t have an account yet?{' '}
            <Link
              to={ROUTES.signUp.absolutePath}
              className='text-steel-blue-500/80'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </WrapperDelimiter>
    </WrapperProtectedRoute>
  )
}
