'use client'
import IconLogOut from '@/assets/svg/IconLogOut'
import { useAuth } from '@/hooks/useAuth'
import { UserDetailsRegistry } from '@/lib/types/UserDetailsRegistry'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface ContextMenuItem {
  label: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
}

export default function ContextMenuUserBubble({
  user,
  userDetails,
  items = []
}: {
  user: User
  userDetails: UserDetailsRegistry
  items?: ContextMenuItem[]
}) {
  const { signOut } = useAuth()
  const names = user?.user_metadata.display_name.split(' ') ?? []
  return (
    <details className='relative'>
      <summary className='bg-night-600 font-semibold w-[40px] h-[40px] rounded-full border border-white/40 flex items-center justify-center overflow-hidden'>
        {userDetails.url_profile_picture && (
          <img
            src={userDetails.url_profile_picture}
            alt={user.user_metadata.display_name}
            className='object-cover w-full h-full'
          />
        )}
        {!userDetails.url_profile_picture && (
          <>
            {names[0].slice(0, 1)}
            {names[1].slice(0, 1)}
          </>
        )}
      </summary>
      <div className='absolute top-[calc(100%+15px)] right-0 bg-night-700 rounded-lg border border-white/40 p-2 md:p-4'>
        {items.map((item) => (
          <ContextMenuItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            onClick={item.onClick}
            href={item.href}
          />
        ))}
        <ContextMenuItem
          label='Sign Out'
          icon={<IconLogOut />}
          onClick={() => signOut()}
        />
      </div>
    </details>
  )
}

function ContextMenuItem({
  label,
  icon,
  href,
  onClick = () => {}
}: ContextMenuItem) {
  const isAnchor = href != null
  const Tag: React.ElementType = isAnchor ? Link : 'button'
  const tagProps = isAnchor ? { href } : { onClick }
  return (
    <Tag
      className='flex items-center justify-between gap-8 md:gap-16 text-left w-full text-white/60 hover:bg-night-600 transition-colors duration-300 p-2 rounded-lg text-sm font-semibold'
      {...tagProps}
    >
      <span className='text-nowrap'>{label}</span>
      {icon}
    </Tag>
  )
}
