import { useStoreModalConfirmAction } from '@/stores/modals/useStoreModalConfirmAction'
import WrapperModal from '../wrapper/WrapperModal'
import CustomButton from '../custom/CustomButton'

export default function ModalConfirmAction() {
  const open = useStoreModalConfirmAction((store) => store.open)
  const setClose = useStoreModalConfirmAction((store) => store.setClose)
  const settings = useStoreModalConfirmAction((store) => store.settings)
  return (
    <WrapperModal title={settings.title} isOpen={open} onClose={setClose}>
      <p className='text-sm my-4'>{settings.description}</p>
      <footer className='flex items-center justify-end gap-2'>
        <CustomButton
          className='bg-red-700'
          onClick={() => {
            settings.onCancel()
            setClose()
          }}
        >
          {settings.cancelLabel}
        </CustomButton>
        <CustomButton
          className='bg-steel-blue'
          onClick={() => {
            settings.onConfirm()
            setClose()
          }}
        >
          {settings.confirmLabel}
        </CustomButton>
      </footer>
    </WrapperModal>
  )
}
