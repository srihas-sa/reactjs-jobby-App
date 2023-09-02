import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  changingusername = event => {
    this.setState({username: event.target.value})
  }

  changingpassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="outerlogin">
        <form className="form" onSubmit={this.submitForm}>
          <div className="imgdiv">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="JOBBYAPPlogo"
              className="loginlogo"
            />
          </div>
          <label htmlFor="username">USERNAME</label> <br />
          <input
            type="text"
            placeholder="Username:rahul"
            className="inputUser"
            onChange={this.changingusername}
          />
          <br />
          <label htmlFor="password">PASSWORD</label>
          <br />
          <input
            type="text"
            placeholder="Password:rahul@2021"
            className="inputUser"
            onChange={this.changingpassword}
          />
          <br />
          <button type="submit" className="loginbuttn">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
        <h1>dsb bfwrib rfbrb</h1>
      </div>
    )
  }
}

export default Login
