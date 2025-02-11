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
      className={`px-5 py-2 rounded-lg text-sm font-semibold ${
        disabled && 'opacity-50'
      } ${className}`}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
