import React, { Component } from 'react';

class TodoItem extends Component {
    constructor (props) {
        super(props);
        // 指向todoitem, 说是这种写法比较好
        this.handleClick = this.handleClick.bind(this);
    }

    render () {
        const { content } = this.props
        return (
            <div
                onClick={this.handleClick}
                dangerouslySetInnerHTML={{__html: content}}
            >
            </div>
        )
    }

    handleClick () {
        const { deleteItem, index } = this.props
        console.log(deleteItem)
        deleteItem(index)
    }
}
export default TodoItem;