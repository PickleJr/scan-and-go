import React, { Component } from 'react';

class CameraMark extends Component {
    render() {
        return (
            <div>
                <h1>Hi, Camera!</h1>
                <p>{JSON.stringify(this.props)}</p>
            </div>
        );
    }
}

export default CameraMark;