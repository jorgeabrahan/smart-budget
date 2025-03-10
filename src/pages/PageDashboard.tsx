import ModalManageAccount from '@/components/modal/ModalManageAccount'
import DashboardAccounts from '@/components/page/dashboard/DashboardAccounts'
import DashboardTransactions from '@/components/page/dashboard/DashboardTransactions'
import WrapperDelimiter from '@/components/wrapper/WrapperDelimiter'
import WrapperProtectedRoute from '@/components/wrapper/WrapperProtectedRoute'
import { ROUTE_RENDER_CLAUSE } from '@/lib/constants/general'

export default function PageDashboard() {
  return (
    <WrapperProtectedRoute renderClause={ROUTE_RENDER_CLAUSE.authenticated}>
      <WrapperDelimiter>
        <DashboardAccounts />
        <DashboardTransactions />
      </WrapperDelimiter>
      <ModalManageAccount />
    </WrapperProtectedRoute>
  )
}
