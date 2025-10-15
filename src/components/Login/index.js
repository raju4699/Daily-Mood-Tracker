import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'
import {useState} from 'react'

import './login.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShow] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')

  const onUsernameChange = event => {
    setUsername(event.target.value)
  }

  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  const onCheckboxChange = () => {
    setShow(prev => !prev)
  }

  const loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    const {history} = props
    history.replace('/')
  }

  const loginFailure = errMsg => {
    setIsError(true)
    setError(errMsg)
  }

  const onFormSubmit = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data)
    console.log(props)
    if (response.ok) {
      loginSuccess(data.jwt_token)
    }
    loginFailure(data.error_msg)
  }

  const jwtToken = Cookies.get('jwt_token')

  return jwtToken ? (
    <Redirect to="/" />
  ) : (
    <div className="login-bg-container">
      <div className="login-card-container">
        <h1 className="heading">Daily Mood Tracker</h1>
        <form onSubmit={onFormSubmit} className="form-container">
          <label className="labelElement" htmlFor="username">
            USERNAME
          </label>
          <input
            onChange={onUsernameChange}
            value={username}
            id="username"
            type="text"
            className="inputElement"
            placeholder="Enter Username"
          />
          <label className="labelElement" htmlFor="password">
            PASSWORD
          </label>
          <input
            onChange={onPasswordChange}
            value={password}
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="inputElement"
            placeholder="Enter Password"
          />
          <div className="checkbox-container">
            <input
              onChange={onCheckboxChange}
              id="checkbox"
              type="checkbox"
              className="checkboxElement"
            />
            <label className="checkboxLabel" htmlFor="checkbox">
              Show Password
            </label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {isError && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login)
