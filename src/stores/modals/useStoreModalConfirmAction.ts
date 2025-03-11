import React from 'react'
import { create } from 'zustand'

interface Store {
  open: boolean
  settings: {
    title: string
    description: React.ReactNode
    confirmLabel: string
    cancelLabel: string
    onConfirm: () => void
    onCancel: () => void
  }
  setOpen: ({
    title,
    description,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel
  }: {
    title: string
    description: React.ReactNode
    confirmLabel?: string
    cancelLabel?: string
    onConfirm?: () => void
    onCancel?: () => void
  }) => void
  setClose: () => void
}
const INITIAL_STATE = {
  open: false,
  settings: {
    title: '',
    description: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    onConfirm: () => {},
    onCancel: () => {}
  }
}
export const useStoreModalConfirmAction = create<Store>((set) => ({
  open: INITIAL_STATE.open,
  settings: INITIAL_STATE.settings,
  setOpen: ({
    title,
    description,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel
  }) =>
    set({
      open: true,
      settings: {
        title,
        description,
        confirmLabel: confirmLabel ?? INITIAL_STATE.settings.confirmLabel,
        cancelLabel: cancelLabel ?? INITIAL_STATE.settings.cancelLabel,
        onConfirm: onConfirm ?? INITIAL_STATE.settings.onConfirm,
        onCancel: onCancel ?? INITIAL_STATE.settings.onCancel
      }
    }),
  setClose: () => set({ open: false, settings: INITIAL_STATE.settings })
}))
