import { useSignedIn } from '../../../hooks/useSignedIn'
import { UtilsFormat } from '../../../lib/utils/UtilsFormat'

export default function ProfileDetails() {
  const { user } = useSignedIn()
  if (!user) return null
  return (
    <section className='flex items-center gap-4'>
      <div className='bg-night-600 font-semibold w-20 h-20 text-3xl rounded-full border border-white/40 flex items-center justify-center overflow-hidden'>
        {user.url_profile_picture && (
          <img
            src={user.url_profile_picture}
            alt={user.user_metadata.display_name}
            className='object-cover w-full h-full'
          />
        )}
        {!user.url_profile_picture &&
          UtilsFormat.getInitials(user.user_metadata.display_name)}
      </div>
      <div>
        <h2 className='text-lg font-semibold'>
          {user.user_metadata.display_name}
        </h2>
        <p className='text-white/60 text-sm'>{user.user_metadata.email}</p>
      </div>
    </section>
  )
}
