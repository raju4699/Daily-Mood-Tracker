import {useContext, useState} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {FiMenu} from 'react-icons/fi'
import {AiOutlineClose} from 'react-icons/ai'

import DailyMoodTracker from '../../context/DailyMoodTracker'
import './header.css'

const Header = props => {
  const {activeBtn, onChangeActive} = useContext(DailyMoodTracker)
  const [menuOpen, setMenuOpen] = useState(false)

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    setMenuOpen(false)
    history.replace('/login')
  }

  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)

  const handleNavClick = tabName => {
    onChangeActive(tabName)
    closeMenu()
  }

  return (
    <div className="header-container">
      <h1 className="header-logo-heading">Daily Mood Tracker</h1>

      <div className="header-button-container">
        <Link onClick={() => onChangeActive('Home')} to="/">
          <button
            type="button"
            className={`header-buttons ${
              activeBtn === 'Home' ? 'active-button' : ''
            }`}
          >
            Home
          </button>
        </Link>

        <Link onClick={() => onChangeActive('Reports')} to="/reports">
          <button
            type="button"
            className={`header-buttons ${
              activeBtn === 'Reports' ? 'active-button' : ''
            }`}
          >
            Reports
          </button>
        </Link>

        <button
          type="button"
          onClick={onLogout}
          className="header-logout-button"
        >
          Logout
        </button>
      </div>

      <button type="button" className="icon-button" onClick={openMenu}>
        <FiMenu />
      </button>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <div className="mobile-menu-inner">
            <div className="header-container">
              <h1 className="header-logo-heading">Daily Mood Tracker</h1>
              <button onClick={closeMenu} type="button" className="icon-button">
                <AiOutlineClose />
              </button>
            </div>

            <div className="popup-container">
              <Link to="/">
                <button
                  type="button"
                  onClick={() => handleNavClick('Home')}
                  className={`header-buttons ${
                    activeBtn === 'Home' && 'active-button'
                  }`}
                >
                  Home
                </button>
              </Link>

              <Link to="/reports">
                <button
                  type="button"
                  onClick={() => handleNavClick('Reports')}
                  className={`header-buttons ${
                    activeBtn === 'Reports' && 'active-button'
                  }`}
                >
                  Reports
                </button>
              </Link>

              <button
                type="button"
                onClick={onLogout}
                className="header-logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default withRouter(Header)
