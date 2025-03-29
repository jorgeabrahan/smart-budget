import IconArrowSeparateVertical from '@/assets/svg/IconArrowSeparateVertical';

export default function CustomSelect({
  label,
  id,
  disabled = false,
  options = [],
  defaultOptionLabel = 'Select an option',
  containerClassName = '',
  ...props
}: React.InputHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  disabled?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
  defaultOptionLabel?: string;
  containerClassName?: string;
}) {
  return (
    <div
      className={`relative ${
        (disabled || props.readOnly) && 'opacity-50 pointer-events-none'
      } ${containerClassName}`}
    >
      <label
        htmlFor={id}
        className='absolute left-3 top-3 text-xs text-white/40'
      >
        {props.required && '*'} {label}
      </label>
      <select
        className='field'
        style={{
          paddingInline: '10px'
        }}
        name={id}
        id={id}
        disabled={disabled}
        defaultValue={
          typeof props.defaultValue === 'string' &&
          props.defaultValue.trim().length > 0
            ? props.defaultValue
            : typeof props.value === 'string' && props.value.trim().length > 0
            ? undefined
            : 'default'
        }
        {...props}
      >
        <option value='default'>[{defaultOptionLabel}]</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <IconArrowSeparateVertical className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none' />
    </div>
  );
}
