/* This file is the page that is displayed when a user is capturing a barcode with their camera
 */
import React, { Component } from 'react';
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
        this.startQuagga = this.startQuagga.bind(this);
        this.restartQuagga = this.restartQuagga.bind(this);
    }

    skipItem() {
        this.setState({counter: {}}, this.pushSkip);
    }

    componentWillUnmount() {
        Quagga.stop();
        window.removeEventListener('orientationchange', this.restartQuagga);
    }

    pushSkip() {
        let name = this.props.match.params.item;
        let web = name.trim();
        web = web.replace(/\s/gi, '-');
        web = web.replace(/[^\w\d]/gi, '');
        web = web.replace(/^\d/, '');
        let item = {
            hasCode: false,
            name: name,
            web: web,
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
        //If a particular code is scanned 10 times it probably is the correct code.
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
            if(counter[num] > 9) {
                let name = this.props.match.params.item;
                let web = name.trim();
                web = web.replace(/\s/gi, '-');
                web = web.replace(/[^\w\d]/gi, '');
                web = web.replace(/^\d/, '');
                let item = {
                    hasCode: true,
                    code: num,
                    scanned: false,
                    name: name,
                    web: web
                };
                this.props.marker(item);
                Quagga.stop();
                this.props.history.push('/');
                break;
            }
        }
    }

    startQuagga() {
        //Default values
        let qHeight = 480;
        let qWidth = 640;
        let qRatio = qWidth / qHeight;

        let qTarget = document.querySelector('#scanner');
        let wWidth = qTarget.parentElement.clientWidth;
        if(wWidth < qWidth) {
            qWidth = wWidth;
            qHeight = qWidth * qRatio;
        }

        /* On android (not sure abuot IOS, I am unable to test on ios...), the Quaggar rotates
         * the view port if the phone is in portrait mode. So I need to swap the height and width on android
         * (again, not sure about ios...)
         */
        let isAndroid = /Android|webOS/i.test(navigator.userAgent);
        let isUpright = window.orientation === 0 || window.orientation === 180;
        if(isAndroid && isUpright) {
            let tmp = qWidth;
            qWidth = qHeight;
            qHeight = tmp;
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

    restartQuagga() {
        window.location.reload();
    }

    componentDidMount() {
        this.startQuagga();
        window.addEventListener('orientationchange', this.restartQuagga);
    }
    render() {
        let counter = this.state.counter;
        let percentage = 0;
        let numWithMost;
        for(let num in counter) {
            if(typeof numWithMost === 'undefined'){ 
                numWithMost = num;
                continue;
            }
            if(counter[numWithMost] < counter[num]) numWithMost = num;
        }
        if(typeof numWithMost !== 'undefined') percentage = counter[numWithMost] * 10;
        return (
            <div>
                <p className="flow-text center">Scan barcode of your item</p>
                <div id="scanner"></div>
                <div id="controls">
                    <button aria-label="Go back" onClick={this.goBack} className="waves-effect waves-light btn">
                        <i className="fas fa-long-arrow-alt-left"></i>
                    </button>
                    <span id="percent">{percentage}%</span>
                    <button aria-label="Skip scanning of this item" onClick={this.skipItem} className="waves-effect waves-light btn">
                        Skip
                    </button>
                </div>
            </div>
        );
    }
}

export default CameraMark;