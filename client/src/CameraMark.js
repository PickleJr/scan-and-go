import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Quagga from 'quagga';

import './CameraMark.css';

class CameraMark extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: {}
        };

        this.scanDetect = this.scanDetect.bind(this);
        this.skipItem = this.skipItem.bind(this);
        this.checkState = this.checkState.bind(this);
        this.pushSkip = this.pushSkip.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    skipItem() {
        this.setState({counter: {}}, this.pushSkip);
    }

    pushSkip() {
        let item = {
            hasCode: false,
            name: this.props.match.params.item
        };
        this.props.marker(item);
        Quagga.stop();
        this.props.history.push('/');
    }

    scanDetect(result) {
        let code = result.codeResult.code;
        let counter = this.state.counter;

        //Barcode not 100% acurate.
        //Count number of time each number is scanned.
        //If a particular code is scanned 7 times it probably is the correct code.
        counter[code] = counter[code] || 0;
        counter[code]++;
        this.setState({counter: counter}, this.checkState);
    }

    goBack() {
        Quagga.stop();
        this.props.history.push('/');
    }

    checkState() {
        let counter = this.state.counter;
        for(let num in counter) {
            if(counter[num] > 6) {
                let item = {
                    hasCode: true,
                    code: num,
                    scanned: false,
                    name: this.props.match.params.item
                };
                this.props.marker(item);
                Quagga.stop();
                this.props.history.push('/');
                break;
            }
        }
    }

    componentDidMount() {
        let qHeight = 480;
        let qWidth = 640;
        let qRatio = qWidth / qHeight;
        let qTarget = document.querySelector('#scanner');
        let divWidth = qTarget.parentElement.clientWidth;
        if(divWidth < qWidth) {
            qWidth = divWidth - 10;
            qHeight = qWidth * qRatio;
        }
        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: qTarget,
                constraints: {
                    facingMode: "environment",
                    width: qWidth,
                    height: qHeight,
                }
            },
            decoder: {
                readers: [
                    "upc_reader",
                ]
            }
        }, function(err) {
            if(err) {
                console.log(err);
                return;
            }
            Quagga.start();
        });
        Quagga.onDetected(this.scanDetect);
    }
    render() {
        return (
            <div>
                <div id="scanner"></div>
                <div id="controls">
                    <button onClick={this.goBack} className="waves-effect waves-light btn">
                        <i className="fas fa-long-arrow-alt-left"></i>
                    </button>
                    <button onClick={this.skipItem} className="waves-effect waves-light btn">
                        Skip
                    </button>
                </div>
            </div>
        );
    }
}

export default CameraMark;