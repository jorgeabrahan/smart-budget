import { useStoreModalBasic } from '@/stores/modals/useStoreModalBasic';
import WrapperModal from '../wrapper/WrapperModal';
import { BASIC_MODALS } from '@/lib/constants/modals';
import CustomInput from '../custom/CustomInput';
import CustomInputColor from '../custom/CustomInputColor';
import CustomButton from '../custom/CustomButton';
import { useState } from 'react';
import { TypeFormManageTag } from '@/lib/types/Forms';
import { UtilsToast } from '@/lib/utils/UtilsToast';
import { useTags } from '@/hooks/useTags';
import TransactionTag from '../general/TransactionTag';

const TABS_LABELS = {
  create: 'Create',
  view: 'View'
};
const TABS = {
  create: 'create',
  view: 'view'
};

export default function ModalManageTags() {
  const modal = useStoreModalBasic((store) => store.modal);
  const open = useStoreModalBasic((store) => store.open);
  const setClose = useStoreModalBasic((store) => store.setClose);
  const { tags, create, remove, isInserting, isDeleting } = useTags();
  const [activeTabId, setActiveTabId] = useState<string>(TABS.create);
  if (modal !== BASIC_MODALS.tags) {
    return null;
  }
  const validate = (form: TypeFormManageTag) => {
    const { name, color } = form;
    if (name.length > 40) {
      UtilsToast.error("Tag name can't exceed 40 characters");
      return false;
    }
    if (color.length !== 7) {
      UtilsToast.error('Color must be a valid hexadecimal color');
      return false;
    }
    const isDuplicatedName = tags.find((a) => {
      return a.name.toLowerCase() === name.trim().toLowerCase();
    });
    if (isDuplicatedName) {
      UtilsToast.error("Tag name can't be duplicated");
      return false;
    }
    return true;
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;
    const formEntries = Object.fromEntries(
      new FormData(form)
    ) as unknown as TypeFormManageTag;
    if (!validate(formEntries)) return;
    const tag = {
      name: formEntries.name.trim(),
      color: formEntries.color
    };
    const isSuccess = await create(tag);
    if (isSuccess) {
      form.reset();
      UtilsToast.success('Tag created successfully');
      setActiveTabId(TABS.view);
      return;
    }
    UtilsToast.error('Something went wrong');
  };
  return (
    <WrapperModal
      title={`${activeTabId === TABS.create ? 'Create tag' : 'View tags'}`}
      isOpen={open}
      isClosingAllowed={!isInserting || !isDeleting}
      isChangingTabsAllowed={!isInserting || !isDeleting}
      activeTabId={activeTabId}
      setActiveTabId={setActiveTabId}
      onClose={setClose}
      tabs={Object.entries(TABS_LABELS).map(([id, label]) => ({ id, label }))}
    >
      {activeTabId === TABS.create && (
        <form className='space-y-4 mt-4' onSubmit={onSubmit}>
          <CustomInput
            label='Name'
            id='name'
            type='text'
            disabled={isInserting}
            required
          />
          <CustomInputColor
            label='Color'
            id='color'
            disabled={isInserting}
            required
          />
          <CustomButton
            type='submit'
            className='flex justify-center items-center gap-1 w-full bg-steel-blue'
            disabled={isInserting}
          >
            Save tag
          </CustomButton>
        </form>
      )}
      {activeTabId === TABS.view && (
        <div
          className={`max-h-[250px] overflow-y-auto scrollbar-thin mt-4 ${
            tags.length === 0
              ? 'space-y-4'
              : 'flex flex-wrap gap-2 justify-start'
          }`}
        >
          {tags.length === 0 && (
            <p className='text-white/60 text-sm'>There's no tags to show yet</p>
          )}
          {tags.map((tag) => (
            <TransactionTag
              key={tag.id}
              tag={tag}
              isDisabled={isDeleting}
              onRemove={remove}
            />
          ))}
        </div>
      )}
    </WrapperModal>
  );
}
