export default function CustomButton({
  className = '',
  type = 'button',
  children,
  ...props
}: {
  className?: string
  type?: 'button' | 'submit'
  children: React.ReactNode
}) {
  return (
    <button
      className={`px-5 py-2 rounded-lg text-sm font-semibold ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
