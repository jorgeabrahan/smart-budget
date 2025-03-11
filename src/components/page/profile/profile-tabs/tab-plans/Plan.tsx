import { useSignedIn } from '@/hooks/useSignedIn'
import { TypePlansRegistry } from '@/lib/types/Tables'

export default function Plan({ plan }: { plan: TypePlansRegistry }) {
  const { user } = useSignedIn()
  if (!user) return null
  const isCurrentPlan = plan.id === user.id_plan
  return (
    <article
      className={`border-2 p-4 rounded-lg relative overflow-hidden ${
        isCurrentPlan ? 'border-steel-blue-500/80' : 'border-white/40'
      }`}
    >
      <h3 className='font-semibold text-lg mb-1'>{plan.name}</h3>
      <p className='text-white/60 text-xs line-clamp-1'>{plan.description}</p>
      <p className='flex items-baseline gap-1'>
        <span className='text-lg font-mono font-semibold ml-auto'>
          ${plan.monthly_price}
        </span>
        <span className='text-[10px] text-white/40'>
          /{' '}
          {!plan.duration_months || plan.duration_months === 1
            ? 'month'
            : `${plan.duration_months} months`}
        </span>
      </p>
      {isCurrentPlan && (
        <span className='absolute top-0 right-0 text-[10px] bg-steel-blue-500/80 px-2 py-1 rounded-bl-lg'>
          Current Plan
        </span>
      )}
    </article>
  )
}
