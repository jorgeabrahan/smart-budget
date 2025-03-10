import WrapperProtectedRoute from '@/components/wrapper/WrapperProtectedRoute'
import WrapperDelimiter from '@/components/wrapper/WrapperDelimiter'
import { ROUTE_RENDER_CLAUSE } from '@/lib/constants/general'
import ProfileDetails from '@/components/page/profile/ProfileDetails'
import ProfileTabs from '@/components/page/profile/ProfileTabs'

export default function PageProfile() {
  return (
    <WrapperProtectedRoute renderClause={ROUTE_RENDER_CLAUSE.authenticated}>
      <WrapperDelimiter className='space-y-5'>
        <ProfileDetails />
        <ProfileTabs />
      </WrapperDelimiter>
    </WrapperProtectedRoute>
  )
}
