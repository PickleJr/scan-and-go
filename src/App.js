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
                marked: [
                    {
                        hasCode: false,
                        name: 'Salad'
                    },
                    {
                        hasCode: true,
                        code: '037000455363',
                        name: 'Fabreeze'
                    }
                ]
            }
        };

        this.addUnmarkedItem = this.addUnmarkedItem.bind(this);
        this.removeUnmarkedItem = this.removeUnmarkedItem.bind(this);
        this.markComplete = this.markComplete.bind(this);
        this.removeMarkedItem = this.removeMarkedItem.bind(this);
        this.markUncomplete = this.markUncomplete.bind(this);
    }

    addUnmarkedItem(item) {
        let newState = this.state;
        newState.list.unmarked.unshift(item);
        this.setState(newState);
    }

    markUncomplete(item) {
        let unmarked = this.state.list.unmarked;
        let marked = this.state.list.marked;
        unmarked.push(item.name);
        for(let i = 0; i < marked.length; i++) {
            if(marked[i] === item) {
                marked.splice(i, 1);
                break;
            }
        }
        this.setState({list: {
            unmarked: unmarked,
            marked: marked
        }});
    }

    markComplete(item) {
        let unmarked = this.state.list.unmarked;
        let marked = this.state.list.marked;
        marked.unshift(item);
        for(let i = 0; i < unmarked.length; i++) {
            if(unmarked[i] === item.name) {
                unmarked.splice(i, 1);
                break;
            }
        }
        this.setState({list: {
            unmarked: unmarked,
            marked: marked,
        }});
    }

    removeMarkedItem(item) {
        let newState = this.state;
        for(let i = 0; i < newState.list.marked.length; i++) {
            if(newState.list.marked[i].name === item.name) {
                newState.list.marked.splice(i, 1);
                this.setState(newState);
                break;
            }
        }
    }

    removeUnmarkedItem(item) {
        let newState = this.state;
        for(let i = 0; i < newState.list.unmarked.length; i++) {
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
                                    <List
                                        {...props}
                                        unmarker={this.markUncomplete}
                                        adder={this.addUnmarkedItem}
                                        mRemover={this.removeMarkedItem}
                                        uRemover={this.removeUnmarkedItem}
                                        list={this.state.list}
                                    />
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
                            <div>
                                <Header/>
                                <div className="container">
                                    <CameraMark {...props}  marker={this.markComplete}/>
                                </div>
                            </div>
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;