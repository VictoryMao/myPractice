import React, { Component, Fragment } from 'react';
import './style.css';
import TodoItem from './todoitem';
import Text from './text';

class TodoList extends Component {
    constructor (props) {
        super(props);
        // 组件的状态
        // 当组件的state或者props发生改变的时候，render函数就会重新执行时，它的子组件的render都将被重新执行
        this.state = {
            inputValue: '',
            list: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    render () {
        console.log('render');
        return (
            <Fragment>
                <div>
                    <label htmlFor="insertArea">输入内容</label>
                    <input
                    id="insertArea"
                    className="input"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    ref={(input) => {this.input = input}}
                    />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul ref={(ul) => {this.ul = ul}}>
                    {
                         this.getTodoItem()
                    }
                </ul>
                <Text content={this.state.inputValue}></Text>
            </Fragment>
        )
    }
    getTodoItem () {
        return (this.state.list.map((item, index) => {
            return (
                <TodoItem
                key={index}
                content={item}
                index={index}
                deleteItem={this.handleItemDelete}
                ></TodoItem>
            )
        }))
    }

    handleInputChange (e) {
        // const value = e.target.value;
        // this.input就是input DOM节点
        console.log(this)
        const value = this.input.value
        this.setState(() => ({
                inputValue: value
            })
        )
    }
    handleBtnClick () {
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }), () => { //  setState接收的第一个方法执行完成后执行
            console.log(this.ul.querySelectorAll('div').length);
        })
        console.log(this.ul.querySelectorAll('div').length);  //  setState接收的第一个方法是异步的，
    }

    handleItemDelete (index) {
        this.setState((prevState) => {
            const list = [...prevState.list];
            list.splice(index, 1);
            return {list}
        })
    }
}

export default TodoList;