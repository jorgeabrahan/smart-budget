import PageDashboard from './pages/PageDashboard'
import PageProfile from './pages/PageProfile'
import PageSignIn from './pages/PageSignIn'
import PageSignUp from './pages/PageSignUp'
import { ROUTES } from './lib/constants/routes'
import { Route, Routes } from 'react-router'
import LayoutDashboard from './layouts/LayoutDashboard'
import PageCatchAllRedirect from './pages/PageCatchAllRedirect'
import LayoutRoot from './layouts/LayoutRoot'

export default function RoutesConfig() {
  return (
    <Routes>
      <Route element={<LayoutRoot />}>
        <Route
          path={ROUTES.root.dashboard.relativePath}
          element={<LayoutDashboard />}
        >
          <Route index element={<PageDashboard />} />
          <Route
            path={ROUTES.root.dashboard.profile.relativePath}
            element={<PageProfile />}
          />
          <Route path='*' element={<PageCatchAllRedirect />} />
        </Route>
        <Route
          path={ROUTES.root.signIn.relativePath}
          element={<PageSignIn />}
        />
        <Route
          path={ROUTES.root.signUp.relativePath}
          element={<PageSignUp />}
        />
        <Route path='*' element={<PageCatchAllRedirect />} />
      </Route>
    </Routes>
  )
}
