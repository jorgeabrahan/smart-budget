import PageDashboard from './pages/PageDashboard'
import PageProfile from './pages/PageProfile'
import PageSignIn from './pages/PageSignIn'
import PageSignUp from './pages/PageSignUp'
import { ROUTES } from './lib/constants/routes'
import { Route, Routes } from 'react-router'
import LayoutDashboard from './layouts/LayoutDashboard'
import PageCatchAllRedirect from './pages/PageCatchAllRedirect'

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path={ROUTES.dashboard.relativePath} element={<LayoutDashboard />}>
        <Route index element={<PageDashboard />} />
        <Route
          path={ROUTES.dashboard.profile.relativePath}
          element={<PageProfile />}
        />
        <Route path='*' element={<PageCatchAllRedirect />} />
      </Route>
      <Route path={ROUTES.signIn.relativePath} element={<PageSignIn />} />
      <Route path={ROUTES.signUp.relativePath} element={<PageSignUp />} />
      <Route path='*' element={<PageCatchAllRedirect />} />
    </Routes>
  )
}
