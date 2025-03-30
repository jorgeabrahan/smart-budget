export default function CustomTextarea({
  label,
  id,
  disabled = false,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  id: string;
  disabled?: boolean;
}) {
  const hasLabel = label && label.trim().length > 0;
  return (
    <div className={`relative ${disabled && 'opacity-50'}`}>
      {hasLabel && (
        <label
          htmlFor={id}
          className='absolute left-3 top-3 text-xs text-white/40'
        >
          {props.required && '*'} {label}
        </label>
      )}
      <textarea
        className='field resize-none'
        name={id}
        id={id}
        disabled={disabled}
        style={
          hasLabel
            ? {}
            : {
                paddingTop: '12px'
              }
        }
        {...props}
      ></textarea>
    </div>
  );
}
