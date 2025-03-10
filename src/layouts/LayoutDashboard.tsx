import NavbarMain from '@/components/navbar/NavbarMain'
import WrapperProtectedRoute from '@/components/wrapper/WrapperProtectedRoute'
import { ROUTE_RENDER_CLAUSE } from '@/lib/constants/general'
import { Outlet } from 'react-router'

export default function LayoutDashboard() {
  return (
    <WrapperProtectedRoute renderClause={ROUTE_RENDER_CLAUSE.authenticated}>
      <NavbarMain />
      <Outlet />
    </WrapperProtectedRoute>
  )
}
