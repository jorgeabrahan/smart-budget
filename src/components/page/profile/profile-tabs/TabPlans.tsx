import { usePlans } from '@/hooks/usePlans'
import Plan from './tab-plans/Plan'

export default function TabPlans() {
  const { plans } = usePlans()

  return (
    <section className='space-y-4'>
      {plans.map((plan) => (
        <Plan key={plan.id} plan={plan} />
      ))}
    </section>
  )
}
