import React, { Component } from 'react'
import './styles.css'

import logo from '../../img/logo.png';

export default class Header extends Component {
  render() {
    return (
      <header className='header-container'>
        <div className='header-left'>
          <img src={logo} alt='FitnessCity' />
        </div>
        <div className='header-middle'></div>
        <div className='header-right'>

        </div>
      </header>
    )
  }
}