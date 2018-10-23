import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import URemove from './URemove';
import MRemove from './MRemove';
import Add from './Add';

class List extends Component {
    constructor(props) {
        super(props);

        this.getUnmarkedItems = this.getUnmarkedItems.bind(this);
        this.getMarkedItems = this.getMarkedItems.bind(this);
    }

    getMarkedItems() {
        let marked = this.props.list.marked;
        let html = [];
        for(let i = 0; i < marked.length; i++) {
            html.push((
                <li key={i.toString()} className="collection-item">
                    <div>
                        <span><s>{marked[i].name}</s></span>
                        <div className="item-actions">
                            <MRemove remover={this.props.mRemover} item={marked[i]} indexKey={i}/>
                            <button aria-label="Mark item as incomplete" onClick={() => this.props.unmarker(marked[i])}>
                                <i className="far fa-check-square"></i>
                            </button>
                        </div>
                    </div>
                </li>
            ));
        }
        return html;
    }

    getUnmarkedItems() {
        let unmarked = this.props.list.unmarked;
        let html = [];
        for(let i = 0; i < unmarked.length; i++) {
            html.push((
                <li key={i.toString()} className="collection-item">
                    <div>
                        <span>{unmarked[i]}</span>
                        <div className="item-actions">
                            <URemove remover={this.props.uRemover} item={unmarked[i]} indexKey={i}/>
                            <Link to={"/camera-mark/" + unmarked[i]}>
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
                <h2>List</h2>
                <Add adder={this.props.adder}/>
                <ul className="collection">
                    {this.getUnmarkedItems()}
                </ul>
                <h2>Completed</h2>
                <ul className="collection">
                    {this.getMarkedItems()}
                </ul>
            </div>
        );
    }
}

export default List;