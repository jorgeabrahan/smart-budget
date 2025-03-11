import { useSignedIn } from '../../hooks/useSignedIn'
import { REQUEST_STATUS } from '../../lib/constants/requests'
import { ROUTES } from '../../lib/constants/routes'
import { TypeRouteRenderClause } from '../../lib/types/General'
import { ROUTE_RENDER_CLAUSE } from '../../lib/constants/general'
import { Navigate } from 'react-router'

export default function WrapperProtectedRoute({
  children,
  renderClause
}: {
  children: React.ReactNode
  renderClause: TypeRouteRenderClause
}) {
  const { user, requestStatus } = useSignedIn()
  const isUserLoading =
    requestStatus === REQUEST_STATUS.notStarted ||
    requestStatus === REQUEST_STATUS.loading
  if (isUserLoading) {
    return <p>Loading...</p>
  }
  const isAuthenticated = user != null
  if (renderClause === ROUTE_RENDER_CLAUSE.authenticated && !isAuthenticated) {
    return <Navigate to={ROUTES.root.signIn.absolutePath} />
  }
  if (renderClause === ROUTE_RENDER_CLAUSE.unauthenticated && isAuthenticated) {
    return <Navigate to={ROUTES.root.dashboard.absolutePath} />
  }
  return children
}
