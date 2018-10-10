import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import Remove from './Remove';
import Add from './Add';

class List extends Component {
    constructor(props) {
        super(props);

        this.getUnmarkedItems = this.getUnmarkedItems.bind(this);
    }

    getUnmarkedItems() {
        let unmarked = this.props.list;
        let html = [];
        for(var i = 0; i < unmarked.length; i++) {
            html.push((
                <li key={i.toString()} className="collection-item">
                    <div>
                        <span>{unmarked[i]}</span>
                        <div className="item-actions">
                            <Remove remover={this.props.remover} item={unmarked[i]} indexKey={i}/>
                            <Link to={"/CameraMark/" + unmarked[i]}>
                                <i className="far fa-square"></i>
                            </Link>
                        </div>
                    </div>
                </li>
            ));
        }
        return html;
    }

    render() {
        return (
            <div>
                <h1>Hello, World!</h1>
                <p>{JSON.stringify(this.props)}</p>
                <h2>List</h2>
                <Add adder={this.props.adder}/>
                <ul className="collection">
                    {this.getUnmarkedItems()}
                </ul>
                <h2>Completed</h2>
            </div>
        );
    }
}

export default List;