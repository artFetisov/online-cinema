import { Switch, Route, Redirect } from 'react-router-dom'
import { routes } from './routes'

export const AppRouter = () => {
  return (
    <>
      <Switch>
        {routes.map((route) => {
          return <Route {...route} key={route.path} />
        })}
        <Redirect to="/" />
      </Switch>
    </>
  )
}
