import { Link } from 'wouter'

export default function CustomLinkAsButton({
  className = '',
  href,
  children,
  ...props
}: Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>> & {
  className?: string
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      className={`px-5 py-2 rounded-lg text-sm font-semibold ${className}`}
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}
