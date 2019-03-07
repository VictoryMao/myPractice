import React, { Component } from 'react';

class Text extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        // Vue也一样
        // JSX -> createElement -> 虚拟DOM （JS对象） -> 真实的DOM
        return <div><span></span></div>
        // 如果不用JSX语法的话，也可以
        // return React.createElement('div', {}, React.createElement('span', {}, 'item'))
    }
}

export default Text;
