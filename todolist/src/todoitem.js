import React, { Component } from 'react';
//  类型检测库, 无需安装, 脚手架里带了
import PropTypes from 'prop-types';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render () {
        const { content, text } = this.props
        return <div onClick={this.handleClick}>{ text } - {content}</div>
    }
    // 当一个组件要从父组件接收了参数， 只要父组件的render函数被重新执行了，子组件的这个生命周期函数就会被执行
    // 如果这个组件第一次存在于父组件中，不会执行，如果这个组件之前已经存在于父组件中，才会执行， 比如输入1后，再输入2，
    componentWillReceiveProps () {
        console.log('child componentWillReceiveProps')
    }
    //  当这个组件即将被从页面中剔除的时候
    componentWillUnmount () {
        console.log('child componentWillUnmount')
    }
    handleClick () {
        const { deleteItem, index } = this.props
        deleteItem(index)
    }
}
//  传不对，会警告
TodoItem.propTypes = {
    text: PropTypes.string.isRequired,  //  加了isRequired后，父组件不传text会报错, 可以加个默认值
    content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    deleteItem: PropTypes.func,
    index: PropTypes.number
}

TodoItem.defaultProps = {
    text: 'hello world'
}
export default TodoItem;
