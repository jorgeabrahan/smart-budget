import { useEffect, useRef } from 'react';
import WrapperDelimiter from './WrapperDelimiter';
import IconXMark from '@/assets/svg/IconXMark';
import CustomButton from '../custom/CustomButton';

export default function WrapperModal({
  children,
  title = '',
  isOpen = false,
  isClosingAllowed = true,
  isChangingTabsAllowed = true,
  onClose = () => {},
  tabs = [],
  activeTabId = '',
  setActiveTabId = () => {}
}: {
  children: React.ReactNode;
  title?: string;
  isOpen?: boolean;
  isClosingAllowed?: boolean;
  isChangingTabsAllowed?: boolean;
  onClose?: () => void;
  tabs?: {
    id: string;
    label: string;
  }[];
  activeTabId?: string;
  setActiveTabId?: (id: string) => void;
}) {
  const refDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!refDialog.current) return;
    const dialog = refDialog.current;
    const handleDialogToggle = () => {
      // when dialog is closed through ESC key
      // in order to change the open state of the dialog
      // the onClose callback is called
      if (dialog && !dialog.open) onClose();
    };
    const handleDialogClose = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) return;
      // this allows closing the dialog by clicking on the backdrop
      if (
        e.target.hasAttribute('data-close-dialog-on-click') &&
        isClosingAllowed
      ) {
        dialog.close();
        onClose();
      }
    };
    const handleDialogKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isClosingAllowed) {
        e.preventDefault();
      }
    };
    dialog.addEventListener('toggle', handleDialogToggle);
    dialog.addEventListener('click', handleDialogClose);
    dialog.addEventListener('keydown', handleDialogKeydown);
    if (isOpen) {
      dialog.show();
    } else {
      dialog.close();
    }
    return () => {
      if (!dialog) return;
      dialog.removeEventListener('toggle', handleDialogToggle);
      dialog.removeEventListener('click', handleDialogClose);
      dialog.removeEventListener('keydown', handleDialogKeydown);
    };
  }, [isOpen, onClose, isClosingAllowed]);
  return (
    <dialog ref={refDialog} data-close-dialog-on-click>
      <WrapperDelimiter className='max-w-md relative'>
        {tabs && tabs.length > 0 && (
          <div className='absolute -top-12 flex items-center bg-night-900 border border-white/40 rounded-full'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${
                  activeTabId === tab.id ? 'bg-night-700' : 'bg-transparent'
                } duration-500 rounded-full px-4 py-2 gap-1 text-xs outline-none ${
                  !isChangingTabsAllowed && 'opacity-50'
                }`}
                onClick={() => {
                  if (!isChangingTabsAllowed) return;
                  setActiveTabId(tab.id);
                }}
                aria-label={`${tab.label} tab`}
                disabled={!isChangingTabsAllowed}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
        <div className='bg-night p-4 rounded-lg border border-white/30'>
          <header className='flex items-center justify-between gap-4'>
            <h3 className='font-semibold text-lg'>{title}</h3>
            <CustomButton
              className='bg-night-600 p-1 [&>*]:pointer-events-none'
              onClick={() => {
                if (!isClosingAllowed) return;
                onClose();
              }}
            >
              <IconXMark strokeWidth={2.5} size={20} />
            </CustomButton>
          </header>
          {children}
        </div>
      </WrapperDelimiter>
    </dialog>
  );
}
