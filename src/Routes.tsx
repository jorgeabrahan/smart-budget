import { Redirect, Route, Switch } from 'wouter'
import PageDashboard from './pages/PageDashboard'
import PageProfile from './pages/PageProfile'
import PageSignIn from './pages/PageSignIn'
import PageSignUp from './pages/PageSignUp'
import { ROUTES } from './lib/constants/routes'
import NavbarMain from './components/navbar/NavbarMain'

export default function Routes() {
  return (
    <Switch>
      <Route path={ROUTES.dashboard.path} nest>
        <NavbarMain />
        <Switch>
          <Route path='/' component={PageDashboard} />
          <Route path={ROUTES.dashboard.profile.path} component={PageProfile} />
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Route>
      <Route path={ROUTES.signIn.path} component={PageSignIn} />
      <Route path={ROUTES.signUp.path} component={PageSignUp} />
      <Route>
        <Redirect to={ROUTES.signIn.path} />
      </Route>
    </Switch>
  )
}
