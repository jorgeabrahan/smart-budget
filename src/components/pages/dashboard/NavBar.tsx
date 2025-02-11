import ContextMenuUserBubble from '@/components/context-menus/ContextMenuUserBubble'
import WrapperNavBar from '@/components/wrappers/WrapperNavBar'
import { ServiceUser } from '@/services/ServiceUser'

export default async function NavBar() {
  const {
    data: { user, userDetails }
  } = await ServiceUser.getSignedIn()
  return (
    <WrapperNavBar>
      {user && userDetails && (
        <ContextMenuUserBubble user={user} userDetails={userDetails} />
      )}
    </WrapperNavBar>
  )
}
