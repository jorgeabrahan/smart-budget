export default function IconArrowSeparateVertical({
  size = 20,
  ...props
}: React.SVGAttributes<SVGSVGElement> & {
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      fill='none'
      color='currentColor'
      {...props}
    >
      <path
        d='M17 8L12 3L7 8'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
      <path
        d='M17 16L12 21L7 16'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
    </svg>
  )
}
