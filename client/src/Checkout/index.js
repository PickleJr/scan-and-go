/* This file displays all the items that are marked as "complete".
 * First it displays all the item with the barcode, as well as a button that will conditionally show up to
 * remove all items if they're marked as good.
 * Secondly, display all items without barcodes, and provide a button to delete all of those
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

    componentDidUpdate() {
        JsBarcode('.barcode').init();
    }

    buildNoCodes() {
        let list = this.props.list;
        let html = [];
        for(let i = 0; i < list.length; i++) {
            if(!list[i].hasCode) {
                html.push((
                    <div key={i.toString()} className="code-holder card-panel no-code">
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
                    <Link className="bc-link" key={i.toString()} to={'/checkout/' + i.toString()}>
                        <div className={classes}>
                            <span>{list[i].name}</span>
                            <svg className="barcode"
                                jsbarcode-format="upc"
                                jsbarcode-value={list[i].code}
                                jsbarcode-textmargin="0">
                            </svg>
                        </div>
                    </Link>
                ));
            }
        }
        return html;
    }

    render() {
        let list = this.props.list;
        let allScanned = true;
        let allScannedHelper = 0;
        let anyNoCodes = false;

        for(let i = 0; i < list.length; i++) {
            if(list[i].hasCode) {
                allScannedHelper++;
            }
            if(list[i].hasCode && !list[i].scanned) {
                allScanned = false;
            } else if(!list[i].hasCode) {
                anyNoCodes = true;
            }
        }

        let htmlCodes = null;
        if(allScanned && allScannedHelper > 0) {
            htmlCodes = (
                <button aria-label="Clear items that have barcodes" onClick={this.props.clearScanned} className="waves-effect waves-light btn clear-btn">
                    Clear from list
                </button>
            );
        }

        let htmlNoCodes = null;
        if(anyNoCodes) {
            htmlNoCodes = (
                <button aria-label="Clear items that do not have barcodes" onClick={this.props.clearOther} className="waves-effect waves-light btn clear-btn">
                    Clear from list
                </button>
            );
        }

        return (
            <div>
                <h2>Barcodes</h2>
                <p>Click on barcode to zoom in</p>
                <div className="flexy-checkout" id="barcodes">
                    {this.buildBarcodes()}
                    {htmlCodes}
                </div>
                <h2>Items Without Barcodes</h2>
                <p>Don't forget to scan these!</p>
                <div className="flexy-checkout">
                    {this.buildNoCodes()}
                    {htmlNoCodes}
                </div>
            </div>
        );
    }
}

export default Checkout;