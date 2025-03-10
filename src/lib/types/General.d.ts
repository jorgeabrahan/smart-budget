import { ROUTE_RENDER_CLAUSE } from '../constants/general'

export type TypeRouteRenderClause =
  (typeof ROUTE_RENDER_CLAUSE)[keyof typeof ROUTE_RENDER_CLAUSE]
