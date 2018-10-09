import React, { Component } from 'react';
import M from 'materialize-css';

import './Remove.css';

class Remove extends Component {
    constructor(props) {
        super(props);
        this.id = "modal-" + this.props.item + "-" + this.props.indexKey;
    }

    componentDidMount() {
        this.mInstance = M.Modal.init(document.querySelector("#" + this.id), {});
    }

    render() {
        return (
            <div>
                <button className="modal-trigger" data-target={this.id}>
                    <i className="far fa-trash-alt"></i>
                </button>
                <div id={this.id} className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this item?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close mbtn">Cancel</button>
                        <button className="modal-close mbtn del">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Remove;