import React, { Component } from 'react';
import M from 'materialize-css';

import './Remove.css';

class URemove extends Component {
    constructor(props) {
        super(props);
        this.id = "modal-" + this.props.item + "-" + this.props.indexKey;

        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        this.mInstance = M.Modal.init(document.querySelector("#" + this.id), {});
    }

    removeItem() {
        if(this.mInstance.isOpen) {
            this.mInstance.close();
        }
        this.props.remover(this.props.item);
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
                        <button onClick={this.removeItem} className="mbtn del">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default URemove;