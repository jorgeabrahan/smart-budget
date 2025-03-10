export default function WrapperDelimiter({
  as: Tag = 'section',
  className = '',
  children
}: {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}) {
  return (
    <Tag
      className={`delimiter-horizontal-padding w-full mx-auto ${
        !className.includes('max-w') && 'max-w-5xl'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
