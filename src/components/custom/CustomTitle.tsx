export default function CustomTitle({
  as: Tag = 'h1',
  className = '',
  children
}: {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children: React.ReactNode
}) {
  return (
    <Tag className={`text-4xl md:text-6xl font-bold ${className}`}>
      {children}
    </Tag>
  )
}
