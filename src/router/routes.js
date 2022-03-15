import { Catalog } from '../pages/Catalog'
import { Detail } from '../pages/detail/Detail'
import { Home } from '../pages/Home'

export const routes = [
  { component: Catalog, path: '/:category/search/:keyword', exact: true },
  { component: Catalog, path: '/:category/', exact: true },
  { component: Detail, path: '/:category/:id', exact: true },
  { component: Home, path: '/', exact: true },
]
