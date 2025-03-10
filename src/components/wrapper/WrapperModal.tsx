import { useEffect, useRef } from 'react'
import WrapperDelimiter from './WrapperDelimiter'
import IconXMark from '@/assets/svg/IconXMark'
import CustomButton from '../custom/CustomButton'

export default function WrapperModal({
  children,
  title = '',
  isOpen = false,
  onClose = () => {}
}: {
  children: React.ReactNode
  title?: string
  isOpen?: boolean
  onClose?: () => void
}) {
  const refDialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!refDialog.current) return
    const dialog = refDialog.current
    const handleDialogToggle = () => {
      // when dialog is closed through ESC key
      // in order to change the open state of the dialog
      // the onClose callback is called
      if (dialog && !dialog.open) onClose()
    }
    const handleDialogClose = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) return
      // this allows closing the dialog by clicking on the backdrop
      if (e.target.hasAttribute('data-close-dialog-on-click')) {
        dialog.close()
        onClose()
      }
    }
    dialog.addEventListener('toggle', handleDialogToggle)
    dialog.addEventListener('click', handleDialogClose)
    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
    return () => {
      if (!dialog) return
      dialog.removeEventListener('toggle', handleDialogToggle)
      dialog.removeEventListener('click', handleDialogClose)
    }
  }, [isOpen, onClose])
  return (
    <dialog ref={refDialog} data-close-dialog-on-click>
      <WrapperDelimiter className='max-w-md'>
        <div className='bg-night p-4 rounded-lg'>
          <header className='flex items-center justify-between gap-4'>
            <h3 className='font-semibold text-lg'>{title}</h3>
            <CustomButton
              className='bg-night-600 p-1 [&>*]:pointer-events-none'
              onClick={onClose}
            >
              <IconXMark strokeWidth={2.5} size={20} />
            </CustomButton>
          </header>
          {children}
        </div>
      </WrapperDelimiter>
    </dialog>
  )
}
