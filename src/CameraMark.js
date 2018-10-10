import React, { Component } from 'react';
import Quagga from 'quagga';

import './CameraMark.css';

class CameraMark extends Component {
    componentDidMount() {
        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.querySelector('#scanner'),
                constraints: {
                    facingMode: "environment"
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
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });
        Quagga.onDetected(function(result) {
            console.log("Barcode found!");
            console.log(result.codeResult.code);
        });
    }
    render() {
        return (
            <div>
                <div>I am still here!</div>
                <div id="scanner"></div>
            </div>
        );
    }
}

export default CameraMark;