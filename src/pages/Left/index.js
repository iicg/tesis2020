import React, { Component } from 'react'
import './styles.css'

import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <header className='left-container'>
        <button>Modulo Alumnos</button>
        <button>Modulo Clases</button>
      </header>
    )
  }
}