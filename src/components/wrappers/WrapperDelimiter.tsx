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
      className={`px-4 lg:px-6 xl:px-8 w-full mx-auto ${
        !className.includes('max-w') && 'max-w-[1550px]'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
