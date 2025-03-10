import { TypeSubscriptionLogsRegistry } from '@/lib/types/Tables'
import { UtilsFormat } from '@/lib/utils/UtilsFormat'

export default function Subscription({
  subscription
}: {
  subscription: TypeSubscriptionLogsRegistry
}) {
  return (
    <article className='border-2 p-4 rounded-lg border-white/40'>
      <p className='font-semibold'>{subscription.plans.name}</p>
      <div className='grid grid-cols-2 gap-2'>
        <p className='flex flex-col'>
          <span className='text-[10px] text-white/40'>Start Date:</span>
          <span className='text-sm text-white/90'>
            {UtilsFormat.timestampToLocaleDate(subscription.start_date)}
          </span>
        </p>
        <p className='flex flex-col'>
          <span className='text-[10px] text-white/40'>End Date:</span>
          <span className='text-sm text-white/90'>
            {subscription.end_date
              ? UtilsFormat.timestampToLocaleDate(subscription.end_date)
              : 'Unlimited'}
          </span>
        </p>
      </div>
    </article>
  )
}
