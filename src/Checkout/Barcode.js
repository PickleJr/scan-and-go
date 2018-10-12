import React, { Component } from 'react';

class Barcode extends Component {
    render() {
        return (
            <div>
                <h1>Hello, Barcode!</h1>
                <p>{JSON.stringify(this.props)}</p>
            </div>
        );
    }
}

export default Barcode;