import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './Header';
import Footer from './Footer';

import List from './List';
import Barcode from './Barcode/';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                unmarked: ['eggs'],
                marked: []
            }
        };
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="container">
                    <Switch>
                        <Route path='/' exact 
                            render={(props) => 
                                <List {...props} updater={this.setState} appState={this.state} />
                            } 
                        />
                        <Route path='/barcode'
                            render={(props) => 
                                <Barcode {...props} updater={this.setState} appState={this.state} />
                            }
                        />
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
