import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import burgerMenu from './../../img/gw-burger-menu.svg'
import logo from './../../logo.svg'

const Header = (props) => (
<header className="App-header">
    <img src={ logo } className="App-logo" alt="logo" />
    <h1 className="App-title">Table Football</h1>
    <Link to="/">
        <div
            role="button"
            className="burger-menu"
            aria-label="Menu">
            <img alt="" src={ burgerMenu } />
        </div>
    </Link>
</header>)

export default withRouter(Header);
