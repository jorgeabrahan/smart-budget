import WrapperDelimiter from '../wrapper/WrapperDelimiter'
import { ROUTES } from '../../lib/constants/routes'
import ContextMenuUserBubble from '../context-menu/ContextMenuUserBubble'
import IconUser from '../../assets/svg/IconUser'
import { Link } from 'react-router'

export default function NavbarMain() {
  return (
    <WrapperDelimiter className='py-4 flex items-center justify-between gap-4'>
      <Link
        to={ROUTES.root.dashboard.absolutePath}
        className='flex items-center gap-2'
      >
        <img src='/smart-budget.webp' alt='Smart Budget Logo' className='w-7' />
        <span className='text-lg font-semibold'>Smart Budget</span>
      </Link>
      <ContextMenuUserBubble
        items={[
          {
            label: 'Profile',
            icon: <IconUser />,
            href: ROUTES.root.dashboard.profile.absolutePath
          }
        ]}
      />
    </WrapperDelimiter>
  )
}
