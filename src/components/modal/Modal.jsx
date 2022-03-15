import './modal.scss'

export const Modal = ({ isActive, children, onClose, id }) => {
  return (
    <div className={`modal ${isActive ? 'active' : ''}`} id={id}>
      <div className="modal__content" onClick={onClose}>
        {children}
        <div className="modal__content__close" onClick={onClose}>
          <i className="bx bx-x" onClick={onClose}></i>
        </div>
      </div>
    </div>
  )
}
