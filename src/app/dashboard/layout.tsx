import NavBar from '@/components/pages/dashboard/NavBar'

export default function LayoutDashboard({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}
