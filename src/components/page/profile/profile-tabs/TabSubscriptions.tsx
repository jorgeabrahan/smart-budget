import { useUserSubscriptionLogs } from '@/hooks/useUserSubscriptionLogs'
import Subscription from './tab-subscriptions/Subscription'

export default function TabSubscriptions() {
  const { subscriptions } = useUserSubscriptionLogs()
  return (
    <section className='space-y-4'>
      {subscriptions.map((subscription) => (
        <Subscription key={subscription.id} subscription={subscription} />
      ))}
    </section>
  )
}
