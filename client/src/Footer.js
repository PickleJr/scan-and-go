/* This file is the footer for the app.
 * It is simple and I am content with it, in the future I might look into making it so the footer
 * does not move when a user opens their keyboard
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        let isUpright = window.orientation === 0 || window.orientation === 180;
        this.state = {
            class: "",
            portraitScreenHeight: (isUpright) ? window.innerHeight : window.innerWidth,
            landscapeScreenHeight: (isUpright) ? window.innerWidth : window.innerHeight
        };
        this.tolerance = 25;
        this.footerToggler = this.footerToggler.bind(this);
    }

    footerToggler() {
        let isUpright = window.orientation === 0 || window.orientation === 180;
        let newState = this.state;
        if(isUpright && ((window.innerHeight + this.tolerance) < this.state.portraitScreenHeight)) {
            // keyboard visible in portrait
            newState.class = "hide"
        } else if((window.innerHeight + this.tolerance) < this.state.landscapeScreenHeight) {
            // keyboard visible in landscape
            newState.class = "hide"
        } else {
            // keyboard NOT visible
            newState.class = "";
        }
        this.setState(newState);
    }

    componentDidMount() {
        let isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if(isMobile) {
            window.addEventListener('resize', this.footerToggler);
        }
    }

    componentWillUnmount() {
        let isMobile = /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if(isMobile) {
            window.removeEventListener('resize', this.footerToggler);
        }
    }

    render() {
        return (
            <footer className={this.state.class}>
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