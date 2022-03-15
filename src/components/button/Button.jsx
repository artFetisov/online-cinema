import './button.scss'

export const Button = ({ children, className, ...props }) => {
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  )
}

export const OutlineButton = ({ children, className, ...props }) => {
  return (
    <Button className={`btn-outline ${className}`} {...props}>
      {children}
    </Button>
  )
}
