import IconTrash from '@/assets/svg/IconTrash';
import { TypeTagsRegistry } from '@/lib/types/Tables';

export default function TransactionTag({
  tag,
  onRemove,
  isDisabled
}: {
  tag: TypeTagsRegistry;
  onRemove?: (idTag: number) => void;
  isDisabled?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full pl-3 w-max border border-white/40 h-max p-[1px] ${
        isDisabled ? 'opacity-50' : ''
      }`}
      style={{
        backgroundColor: `${tag.color}77`
      }}
    >
      <span className='font-semibold text-xs'>{tag.name}</span>
      <button
        className='rounded-full p-2'
        style={{
          backgroundColor: `${tag.color}77`
        }}
        onClick={() => {
          onRemove?.(tag.id);
        }}
        disabled={isDisabled}
      >
        <IconTrash strokeWidth={2} size={14} />
      </button>
    </div>
  );
}
