/* This file is the footer for the app.
 * It is simple and I am content with it, in the future I might look into making it so the footer
 * does not move when a user opens their keyboard
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <div id="b-nav" className="row center">
                        <NavLink exact to='/' className="nav col s6">
                            <i className="fas fa-clipboard-list fa-lg"></i>
                            <span>List</span>
                        </NavLink>
                        <NavLink to='/checkout' className="nav col s6">
                            <i className="fas fa-barcode fa-lg"></i>
                            <span>Checkout</span>
                        </NavLink>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;