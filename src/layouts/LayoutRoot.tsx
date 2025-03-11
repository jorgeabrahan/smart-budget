import ModalConfirmAction from '@/components/modal/ModalConfirmAction'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner'

export default function LayoutRoot() {
  return (
    <>
      <Outlet />
      <Toaster richColors />
      <ModalConfirmAction />
    </>
  )
}
