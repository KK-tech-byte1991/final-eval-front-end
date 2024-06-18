import React from 'react'
import HomePage from './HomePage'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <HomePage
      mode={<LoginForm />}
    />
  )
}

export default Login