import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return(
            <nav className="white nav-extended">
                <div className="nav-wrapper">
                    <Link to='/' className="center black-text brand-logo">
                        Scan and Go
                    </Link>
                </div>
            </nav>
        );
    }
}

export default Header;