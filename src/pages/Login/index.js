import React, { Component } from 'react'

import './styles.css'
import loginFondo from '../../img/fondoLogin.jpg'
import logo from '../../img/logo.png'

export default class LoginPage extends Component {

render() {
    return (
        <div className='login-container'>
            <div className='login-left'>
                <div className='login-left-header'>
                    <img src={logo} alt='FitnessCity'/>
                </div>
                <div className='login-left-container'>
                    <div className='login-title-login'>
                        <h1>LOGIN</h1>
                    </div>
                    <div className='login-email'>
                        <h4>Email</h4>
                        <input 
                            type='text' 
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className='login-pass'>
                        <h4>Constraseña</h4>
                        <input 
                            type='password' 
                            placeholder='********' 
                            required
                        />
                    </div>
                    <input
                        className='login-button-sesion' 
                        type='submit' 
                        value='Iniciar sesion'                                  
                    />
                </div>
                <div className='login-left-footer'></div>
            </div>
            <div className='login-right'>
                <img src={loginFondo} alt='study'/>
            </div>
        </div>
      )
    }
}
