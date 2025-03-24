export default function CustomTextarea({
  label,
  id,
  disabled = false,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
  disabled?: boolean;
}) {
  return (
    <div className={`relative ${disabled && 'opacity-50'}`}>
      <label
        htmlFor={id}
        className='absolute left-3 top-3 text-xs text-white/40'
      >
        {props.required && '*'} {label}
      </label>
      <textarea
        className='field resize-none'
        name={id}
        id={id}
        disabled={disabled}
        {...props}
      ></textarea>
    </div>
  );
}
