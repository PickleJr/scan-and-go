import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import db from './db';

import Header from './Header';
import Footer from './Footer';

import List from './List/';
import Barcode from './Checkout/Barcode';
import Checkout from './Checkout/';
import CameraMark from './CameraMark';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                unmarked: [],
                marked: []
            }
        };
        this.db = db;

        this.addUnmarkedItem = this.addUnmarkedItem.bind(this);
        this.removeUnmarkedItem = this.removeUnmarkedItem.bind(this);
        this.markComplete = this.markComplete.bind(this);
        this.removeMarkedItem = this.removeMarkedItem.bind(this);
        this.markUncomplete = this.markUncomplete.bind(this);
        this.clearMarkedNoBarcode = this.clearMarkedNoBarcode.bind(this);
        this.clearScannedBarcodes = this.clearScannedBarcodes.bind(this);
        this.toggleScanned = this.toggleScanned.bind(this);
        this.checkDb = this.checkDb.bind(this);
        this.saveSetState = this.saveSetState.bind(this);
    }

    componentDidMount() {
        this.checkDb();
    }

    componentDidUpdate() {
        this.checkDb();
    }

    async saveSetState(newState) {
        newState.list = newState.list || {};
        newState.list.unmarked = newState.list.unmarked || [];
        newState.list.marked = newState.list.marked || [];

        await this.db.set('unmarked', newState.list.unmarked);
        await this.db.set('marked', newState.list.marked);
        this.setState(newState);
    }

    async checkDb() {
        let isSame = true;
        //check if unmarked is the same
        let unmarked = await this.db.get('unmarked');
        if(unmarked.length !== this.state.list.unmarked.length) isSame = false;
        else 
            for(let i = 0; i < unmarked.length; i++) {
                if(unmarked[i] !== this.state.list.unmarked[i]) {
                    isSame = false;
                    break;
                }
            }

        //check if marked is the same
        let marked = await this.db.get('marked');
        if(marked.length !== this.state.list.marked.length) isSame = false;
        else {
            for(let i = 0; i < marked.length; i++) {
                for(let key in marked[i]) {
                    if(!(key in this.state.list.marked[i])) {
                        isSame = false;
                        break;
                    } else {
                        if(marked[key] !== this.state.list.marked[key]) {
                            isSame = false;
                            break;
                        }
                    }
                }
                if(!isSame) break;
            }
        }

        if(!isSame) {
            let newState = this.state;
            newState.list.marked = marked;
            newState.list.unmarked = unmarked;
            this.saveSetState(newState);
        }
    }

    toggleScanned(index) {
        let newState = this.state;
        if(index < 0 || index >= newState.list.marked.length) return;
        else if(!newState.list.marked[index].hasCode) return;

        newState.list.marked[index].scanned = !newState.list.marked[index].scanned;
        this.saveSetState(newState);
    }

    clearMarkedNoBarcode() {
        let newState = this.state;
        for(let i = 0; i < newState.list.marked.length; i++) {
            if(!newState.list.marked[i].hasCode) {
                console.log(newState.list.marked);
                newState.list.marked.splice(i--, 1);
            }
        }
        this.saveSetState(newState);
    }

    clearScannedBarcodes() {
        let newState = this.state;
        for(let i = 0; i < newState.list.marked.length; i++) {
            if(newState.list.marked[i].hasCode && newState.list.marked[i].scanned) {
                newState.list.marked.splice(i--, 1);
            }
        }
        this.saveSetState(newState);
    }

    addUnmarkedItem(item) {
        let newState = this.state;
        newState.list.unmarked.unshift(item);
        this.saveSetState(newState);
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
        this.saveSetState({list: {
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
        this.saveSetState({list: {
            unmarked: unmarked,
            marked: marked,
        }});
    }

    removeMarkedItem(item) {
        let newState = this.state;
        for(let i = 0; i < newState.list.marked.length; i++) {
            if(newState.list.marked[i].name === item.name) {
                newState.list.marked.splice(i, 1);
                this.saveSetState(newState);
                break;
            }
        }
    }

    removeUnmarkedItem(item) {
        let newState = this.state;
        for(let i = 0; i < newState.list.unmarked.length; i++) {
            if(newState.list.unmarked[i] === item) {
                newState.list.unmarked.splice(i, 1);
                this.saveSetState(newState);
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
                    <Route path='/checkout/:iIndex/'
                        render={(props) => 
                            <Barcode {...props} toggler={this.toggleScanned} list={this.state.list.marked} />
                        }
                    />
                    <Route path='/checkout'
                        render={(props) => 
                            <div>
                                <Header/>
                                <div id="body" className="container">
                                    <Checkout {...props} clearOther={this.clearMarkedNoBarcode} clearScanned={this.clearScannedBarcodes} list={this.state.list.marked} />
                                </div>
                                <Footer/>
                            </div>
                        }
                    />
                    <Route path='/camera-mark/:item'
                        render={(props) => (
                            <div>
                                <Header/>
                                <div className="container">
                                    <CameraMark {...props} marker={this.markComplete}/>
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