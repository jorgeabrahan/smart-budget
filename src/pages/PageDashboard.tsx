import ModalManageAccount from '@/components/modal/ModalManageBudgetAccount';
import ModalManageTags from '@/components/modal/ModalManageTags';
import ModalManageTransaction from '@/components/modal/ModalManageTransaction';
import DashboardAccounts from '@/components/page/dashboard/DashboardAccounts';
import DashboardTransactions from '@/components/page/dashboard/DashboardTransactions';
import WrapperDelimiter from '@/components/wrapper/WrapperDelimiter';
import WrapperProtectedRoute from '@/components/wrapper/WrapperProtectedRoute';
import { ROUTE_RENDER_CLAUSE } from '@/lib/constants/general';

export default function PageDashboard() {
  return (
    <WrapperProtectedRoute renderClause={ROUTE_RENDER_CLAUSE.authenticated}>
      <WrapperDelimiter>
        <DashboardAccounts />
        <DashboardTransactions />
      </WrapperDelimiter>
      <ModalManageAccount />
      <ModalManageTransaction />
      <ModalManageTags />
    </WrapperProtectedRoute>
  );
}
