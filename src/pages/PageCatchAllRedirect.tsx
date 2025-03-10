import { useSignedIn } from '@/hooks/useSignedIn'
import { REQUEST_STATUS } from '@/lib/constants/requests'
import { ROUTES } from '@/lib/constants/routes'
import { Navigate } from 'react-router'

export default function PageCatchAllRedirect() {
  const { user, requestStatus } = useSignedIn()
  const isUserLoading =
    requestStatus === REQUEST_STATUS.notStarted ||
    requestStatus === REQUEST_STATUS.loading
  if (isUserLoading) {
    return <p>Loading...</p>
  }
  const isAuthenticated = user != null
  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard.absolutePath} />
  }
  return <Navigate to={ROUTES.signIn.absolutePath} />
}
