import IconHome from '@/assets/svg/IconHome'
import ContextMenuUserBubble from '@/components/context-menus/ContextMenuUserBubble'
import CustomLinkAsButton from '@/components/customs/CustomLinkAsButton'
import WrapperNavBar from '@/components/wrappers/WrapperNavBar'
import { ServiceUser } from '@/services/ServiceUser'

export default async function NavBar() {
  const {
    data: { user, userDetails }
  } = await ServiceUser.getSignedIn()
  return (
    <WrapperNavBar>
      {(!user || !userDetails) && (
        <CustomLinkAsButton className='bg-steel-blue' href='/sign-in'>
          Sign In
        </CustomLinkAsButton>
      )}
      {user && userDetails && (
        <ContextMenuUserBubble
          user={user}
          userDetails={userDetails}
          items={[
            {
              label: 'Dashboard',
              icon: <IconHome />,
              href: '/dashboard'
            }
          ]}
        />
      )}
    </WrapperNavBar>
  )
}
