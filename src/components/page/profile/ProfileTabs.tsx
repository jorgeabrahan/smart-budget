import { useState } from 'react'
import TabPlans from './tabs/TabPlans'
import TabSubscriptions from './tabs/TabSubscriptions'

const TABS = [
  {
    id: 1,
    label: 'Plans'
  },
  {
    id: 2,
    label: 'Subscriptions'
  }
]

export default function ProfileTabs() {
  const [currentTab, setCurrentTab] = useState(TABS[0].id)
  return (
    <section>
      <header className='border-b-2 border-white/40 mb-4'>
        {TABS.map((tab) => (
          <button
            onClick={() => setCurrentTab(tab.id)}
            className={`px-3 py-1 text-sm ${
              currentTab === tab.id
                ? 'font-semibold bg-white/40 rounded-t-sm'
                : ''
            }`}
            key={tab.id}
          >
            {tab.label}
          </button>
        ))}
      </header>
      {currentTab === TABS[0].id && <TabPlans />}
      {currentTab === TABS[1].id && <TabSubscriptions />}
    </section>
  )
}
