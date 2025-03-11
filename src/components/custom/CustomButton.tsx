export default function CustomButton({
  className = '',
  type = 'button',
  children,
  disabled = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  type?: 'button' | 'submit'
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <button
      className={`text-sm font-semibold ${disabled && 'opacity-50'} ${
        /\bp(-|x-|y-)/.test(className) ? '' : 'px-5 py-2'
      } ${!className.includes('rounded-') && 'rounded-lg'} ${className}`}
      type={type}
      disabled={disabled}
      onMouseDown={(e) => {
        props?.onMouseDown?.(e)
        if (
          !e.target ||
          !(e.target instanceof HTMLElement) ||
          e.target.tagName !== 'BUTTON'
        )
          return
        e.target.classList.add('scale-95')
      }}
      onMouseUp={(e) => {
        props?.onMouseUp?.(e)
        if (
          !e.target ||
          !(e.target instanceof HTMLElement) ||
          e.target.tagName !== 'BUTTON'
        )
          return
        e.target.classList.remove('scale-95')
      }}
      {...props}
    >
      {children}
    </button>
  )
}
