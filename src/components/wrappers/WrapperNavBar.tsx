import IconWallet from '@/assets/svg/IconWallet'
import Link from 'next/link'
import WrapperDelimiter from './WrapperDelimiter'

export default function WrapperNavBar({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <WrapperDelimiter className='py-4 flex items-center justify-between gap-4'>
      <Link href='/' className='flex items-center gap-2'>
        <IconWallet size={40} />
        <span className='text-xl font-semibold'>Smart Budget</span>
      </Link>
      {children}
    </WrapperDelimiter>
  )
}
