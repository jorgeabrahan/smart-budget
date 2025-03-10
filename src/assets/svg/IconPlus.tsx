export default function IconPlus({
  size = 20,
  strokeWidth = 1.5
}: {
  size?: number
  strokeWidth?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      viewBox='0 0 24 24'
      fill='none'
      color='currentColor'
    >
      <path
        d='M6 12H12M18 12H12M12 12V6M12 12V18'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
    </svg>
  )
}
