import { Redirect } from 'wouter'
import { useSignedIn } from '../../hooks/useSignedIn'
import { REQUEST_STATUS } from '../../lib/constants/requests'
import { ROUTES } from '../../lib/constants/routes'
import { TypeRouteRenderClause } from '../../lib/types/General'
import { ROUTE_RENDER_CLAUSE } from '../../lib/constants/general'

export default function WrapperProtectedRoute({
  children,
  renderClause
}: {
  children: React.ReactNode
  renderClause: TypeRouteRenderClause
}) {
  const { user, requestStatus } = useSignedIn()
  if (
    requestStatus === REQUEST_STATUS.loading ||
    requestStatus === REQUEST_STATUS.notStarted
  ) {
    return <p>loading ...</p>
  }
  if (renderClause === ROUTE_RENDER_CLAUSE.authenticated && user == null) {
    return <Redirect to={ROUTES.signIn.path} />
  }
  if (renderClause === ROUTE_RENDER_CLAUSE.unauthenticated && user != null) {
    return <Redirect to={ROUTES.dashboard.path} />
  }
  return children
}
