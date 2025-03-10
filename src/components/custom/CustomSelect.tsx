export default function CustomSelect({
  label,
  id,
  disabled = false,
  options = [],
  defaultOptionLabel = 'Select an option',
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  id: string
  disabled?: boolean
  options?: {
    value: string
    label: string
  }[]
  defaultOptionLabel?: string
}) {
  return (
    <div className={`relative ${disabled && 'opacity-50'}`}>
      <label
        htmlFor={id}
        className='absolute left-3 top-3 text-xs text-white/40'
      >
        {label}
      </label>
      <select
        className='field'
        style={{
          paddingInline: '10px'
        }}
        name={id}
        id={id}
        disabled={disabled}
        defaultValue='default'
        {...props}
      >
        <option value='default'>[{defaultOptionLabel}]</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
