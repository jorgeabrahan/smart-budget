export default function IconXMark({
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
        d='M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
    </svg>
  )
}
