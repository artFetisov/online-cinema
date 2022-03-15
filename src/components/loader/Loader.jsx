import { Modal } from '../modal/Modal'
import './loader.scss'

export const Loader = () => {
  return (
    <div className="wrap__loader">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
