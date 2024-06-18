import React from 'react'
import HomePage from './HomePage'
import RegisterForm from './RegisterForm'

const Register = () => {
  return (
    <HomePage
    mode={<RegisterForm />}
  />
  )
}

export default Register