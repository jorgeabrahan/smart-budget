import IconArrowSeparateVertical from '@/assets/svg/IconArrowSeparateVertical';

export default function CustomCondensedSelect({
  label,
  id,
  disabled = false,
  options = [],
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  disabled?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <div className='relative w-max'>
      <label
        htmlFor={id}
        className='absolute left-[10px] top-1 text-[10px] text-white/40'
      >
        {label}
      </label>
      <select
        className='bg-night-700 block w-max outline-none rounded-lg border border-white/40 pl-2 pr-8 pt-[18px] pb-1 text-xs'
        name={id}
        id={id}
        disabled={disabled}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <IconArrowSeparateVertical
        className='absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none'
        size={12}
      />
    </div>
  );
}
