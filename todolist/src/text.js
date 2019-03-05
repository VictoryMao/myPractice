import React, { Component } from 'react';

class Text extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        console.log('text render');
        return <div>{ this.props.content }</div>
    }
}

export default Text;
