import React, { Component } from 'react';
import JsBarcode from 'jsbarcode';

import './Barcode.css';

class Barcode extends Component {
    constructor(props) {
        super(props);

        this.isValid = this.isValid.bind(this);
        this.closer = this.closer.bind(this);
        this.alreadyScanned = this.alreadyScanned.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goNext = this.goNext.bind(this);
    }

    componentDidMount() {
        JsBarcode('.barcode').init();
    }

    componentDidUpdate() {
        JsBarcode('.barcode').init();
    }

    alreadyScanned() {
        let item = this.props.list[this.props.match.params.iIndex];
        if(!item.scanned) return
        else return (
            <div className="row">
                <button onClick={() => this.props.toggler(this.props.match.params.iIndex)} className="waves-effect waves-light btn grey darken-2">
                    Mark not scanned
                </button>
            </div>
        );
    }

    goNext(event) {
        let index = this.props.match.params.iIndex;
        let list = this.props.list;
        if(event.target.name === "nexter") this.props.toggler(index);

        ++index;
        while(index >= 0 && index < list.length) {
            if(list[index].hasCode) {
                this.props.history.push('/checkout' + index);
                return
            }
            --index;
        }
        this.closer();
    }

    goBack() {
        let index = this.props.match.params.iIndex;
        let list = this.props.list;
        --index;
        while(index >= 0 && index < list.length) {
            if(list[index].hasCode) {
                this.props.history.push('/checkout/' + index);
                return;
            }
            --index;
        }
        this.closer();
    }

    isValid() {
        let index = this.props.match.params.iIndex;
        let list = this.props.list;
        if(index < 0 || index >= list.length) {
            return false;
        } else if(!list[index].hasCode) {
            return false;
        } else {
            return true;
        }

    }

    closer() {
        this.props.history.push('/checkout');
    }

    render() {
        if(this.isValid()) {
            let item = this.props.list[this.props.match.params.iIndex];
            let css = "borderer";
            if(item.scanned) css += " active";
            return (
                <div>
                    <div id="closer">
                        <button onClick={this.closer} className="circle circle_helper">
                            <i className="fas fa-times i_circle_helper"></i>
                        </button>
                    </div>
                    <div id="checkouter" className="center container">
                        <div className="row">
                            <h1>{item.name}</h1>
                            <p>You might need to turn your brightness all the way up</p>
                        </div>
                        <div className="row">
                            <div className={css}>
                                <svg className="barcode"
                                    jsbarcode-format="upc"
                                    jsbarcode-value={item.code}
                                    jsbarcode-textmargin="0">
                                </svg>
                            </div>
                        </div>
                        <div id="checkout_controls" className="row">
                            <button onClick={this.goBack} className="col s3 m2 waves-effect waves-light btn red ich">
                                <i className="fas fa-chevron-left"></i> <span>Back</span>
                            </button>
                            <button onClick={this.goNext} name="skipper" className="col s2 offset-s2 offset-m3 waves-effect waves-light btn orange darken-1">
                                Skip
                            </button>
                            <button onClick={this.goNext} name="nexter" className="col s3  m2 offset-s2 offset-m3 waves-effect waves-light btn ich">
                                <span>Next</span> <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        {this.alreadyScanned()}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="center">
                    <h1>There was an error accessing your item!</h1>
                    <p>{JSON.stringify(this.props)}</p>
                </div>
            )
        }
    }
}

export default Barcode;