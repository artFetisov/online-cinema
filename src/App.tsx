import './App.scss'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { AppRouter } from './router/AppRouter'
import './assets/boxicons-2.0.7/css/boxicons.min.css'

export const App = () => {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  )
}
