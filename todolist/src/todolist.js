import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem'
import './style.css'

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
            list: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete(this);
        this.whyNoShow = this.whyNoShow(this);
    }
    render () {
        return (
            // Fragment:占位符,不必出现多余的标签
            <Fragment>
                <label htmlFor="insertArea">输入内容</label>
                <input
                    id="insertArea"
                    className="input"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleBtnClick}>提交</button>
                <ul>
                    {this.getTodoItem()}
                </ul>
            </Fragment>
        )
    }

    getTodoItem () {
        return this.state.list.map((item, index) => {
            console.log(this, this.handleItemDelete)
            return (
                <div key={index}>
                    <TodoItem
                        content={item}
                        index={index}
                        deleteItem={this.handleItemDelete}
                    />
                {
                    /*
                     父组件向子组件传参通过属性的形式传过去，子组件通过this.props.属性名来接收
                     * */
                }
                {
                    /*
                     <li
                     key={index}
                     onClick={this.handleItemDelete.bind(this, index)}
                     dangerouslySetInnerHTML={{__html: item}}
                     ></li>
                     */
                }
                </div>
            )
        })
    }

    handleInputChange (e) {
        // this.setState({
        //     inputValue: e.target.value
        // })
        // 新的写法
        const value = e.target.value;
        this.setState(() => ({
                inputValue: value
            })
        )
    }

    handleBtnClick () {
        // this.setState({
        //     list: [...this.state.list, this.state.inputValue],
        //     inputValue: ''
        // })
        // prevState:表示这次状态改变前的数据
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }))
    }

    handleItemDelete () {
        // this.setState((prevState) => {
        //     const list = [...prevState.list];
        //     list.splice(index, 1);
        //     return {list}
        // })
    }

    whyNoShow () {
    }
}

export default TodoList;