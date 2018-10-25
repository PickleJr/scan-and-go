/* This is the "Add" section of the input page. This handles the user input and updating the apps
 * state with the new inputs
 */
import React, { Component } from 'react';

import './Add.css';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    addItem() {
        if(this.state.value !== '') {
            let item = this.state.value;
            this.props.adder(item);
            this.setState({value: ''});
        }
    }

    render() {
        return (
            <div id="add_row" className="row">
                <div className="input-field col s10 m11">
                    <input id="add_item" value={this.state.value} onChange={this.handleChange} type="text" className="validate"/>
                    <label htmlFor="add_item">Item</label>
                </div>
                <div className="col s2 m1 no-padding">
                    <button aria-label="Add item" onClick={this.addItem} className="fill waves-effect waves-light btn"><i className="fas fa-plus"></i></button>
                </div>
            </div>
        );
    }
}

export default Add;