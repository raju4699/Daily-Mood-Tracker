import Header from '../Header'
import './notfound.css'

const NotFound = () => (
  <div className="notfound-bg-container">
    <Header />
    <div className="notfound-content-container">
      <img
        className="not-found-image"
        src="https://res.cloudinary.com/don6xt1fg/image/upload/v1760454917/Group_7520_pllak1.png"
      />
      <h1 className="not-found-heading">Page Not Found.</h1>
      <p className="not-found-text">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
