import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './Header';
import Footer from './Footer';

import List from './List/';
import Barcode from './Barcode/';
import CameraMark from './CameraMark';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                unmarked: ['eggs', 'Apples', 'Oranges', 'Chicken', 'Pizza'],
                marked: []
            }
        };

        this.addUnmarkedItem = this.addUnmarkedItem.bind(this);
        this.removeUnmarkedItem = this.removeUnmarkedItem.bind(this);
    }

    addUnmarkedItem(item) {
        let newState = this.state;
        newState.list.unmarked.unshift(item);
        this.setState(newState);
    }

    removeUnmarkedItem(item) {
        let newState = this.state;
        for(var i = 0; i < newState.list.unmarked.length; i++) {
            if(newState.list.unmarked[i] === item) {
                newState.list.unmarked.splice(i, 1);
                this.setState(newState);
                break;
            }
        }
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path='/' exact 
                        render={(props) => (
                            <div>
                                <Header/>
                                <div id="body" className="container">
                                    <List {...props} adder={this.addUnmarkedItem} remover={this.removeUnmarkedItem} list={this.state.list.unmarked} />
                                </div>
                                <Footer/>
                            </div>
                        )} 
                    />
                    <Route path='/barcode'
                        render={(props) => 
                            <div>
                                <Header/>
                                <div id="body" className="container">
                                    <Barcode {...props} updater={this.setState} appState={this.state} />
                                </div>
                                <Footer/>
                            </div>
                        }
                    />
                    <Route path='/CameraMark/:item'
                        render={(props) => (
                            <CameraMark {...props} updater={this.setState} appState={this.state} />
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
