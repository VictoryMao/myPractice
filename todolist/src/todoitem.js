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
