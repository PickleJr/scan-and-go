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
                        <NavLink to='/barcode' className="nav col s6">
                            <i className="fas fa-barcode fa-lg"></i>
                            <span>Barcode</span>
                        </NavLink>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;