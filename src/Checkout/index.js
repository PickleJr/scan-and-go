import React, { Component } from 'react';
import JsBarcode from 'jsbarcode';

import './index.css';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.buildBarcodes = this.buildBarcodes.bind(this);
        this.buildNoCodes = this.buildNoCodes.bind(this);
    }

    componentDidMount() {
        JsBarcode('.barcode').init();
    }

    buildNoCodes() {
        let list = this.props.list;
        let html = [];
        for(let i = 0; i < list.length; i++) {
            if(!list[i].hasCode) {
                html.push((
                    <div key={i.toString()} className="code-holder card-panel">
                        <span>{list[i].name}</span>
                    </div>
                ));
            }
        }
        return html;
    }

    buildBarcodes() {
        let list = this.props.list;
        let html = [];
        for(let i = 0; i < list.length; i++) {
            if(list[i].hasCode){
                let classes = "code-holder card-panel";
                if(list[i].scanned) classes += " done"
                html.push((
                    <div key={i.toString()} className={classes}>
                        <span>{list[i].name}</span>
                        <svg className="barcode"
                            jsbarcode-format="upc"
                            jsbarcode-value={list[i].code}
                            jsbarcode-textmargin="0">
                        </svg>
                    </div>
                ));
            }
        }
        return html;
    }

    render() {
        return (
            <div>
                <h2>Barcodes</h2>
                <p>Click on barcode to zoom in</p>
                <div className="flexy-checkout" id="barcodes">
                    {this.buildBarcodes()}
                </div>
                <h2>Items Without Barcodes</h2>
                <p>Don't forget to scan these!</p>
                <div className="flexy-checkout">
                    {this.buildNoCodes()}
                </div>
            </div>
        );
    }
}

export default Checkout;