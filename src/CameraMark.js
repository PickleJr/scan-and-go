import React, { Component } from 'react';
import Quagga from 'quagga';

class CameraMark extends Component {
    componentDidMount() {
        Quagga.init({
            locate: true,
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.querySelector("#camera")
            }
        }, function(err) {
            if(err) {
                console.log(err);
                alert(err);
                return;
            }
            console.log("Init finished. Ready to start");
            Quagga.onDetected(function(data) {
                console.log("Data found!");
                console.log(data);
            });
            Quagga.start();
        });
    }

    render() {
        return (
            <div>
                <div>I am still here!</div>
                <div id="camera">
                </div>
            </div>
        );
    }
}

export default CameraMark;