export default function IconSend({
  size = 20,
  strokeWidth = 1.5,
  ...props
}: React.SVGAttributes<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth}
      fill='none'
      color='currentColor'
      {...props}
    >
      <path
        d='M22 12L3 20L6.5625 12L3 4L22 12Z'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
      <path
        d='M6.5 12L22 12'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
    </svg>
  );
}
