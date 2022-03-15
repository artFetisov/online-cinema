import bg from '../../assets/footer-bg.jpg'

import './page-header.scss'

export const PageHeader = ({ children }) => {
  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="page-header">
      <h2>{children}</h2>
    </div>
  )
}
