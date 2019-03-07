import React, { Component, Fragment } from 'react';
import './style.css';
import TodoItem from './todoitem';
import Text from './text';
// 生命周期函数：在某一时刻组件会自动调用
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

    // 在组件即将被挂载到页面的时候自动执行
    componentWillMount () {
        console.log('componentWillMount')
    }
    // 组件被挂载到页面后被自动执行
    componentDidMount () {
        console.log('componentDidMount')
    }
    // 组件被更新之前，他会自动被执行
    shouldComponentUpdate () {
        console.log('shouldComponentUpdate')
        return true      //  返回false页面输入任何内容都不会有任何更新
    }
    //  组件被更新之前，它会自动执行， 但是他在shouldComponentUpdate返回true才执行
    componentWillUpdate () {
        console.log('componentWillUpdate')
    }
    //  组件更新完成之后，会执行
    componentDidUpdate () {
        console.log('componentDidUpdate')
    }
    // 当一个组件要从父组件接收参数， 只要父组件的render函数被执行了，子组件的这个生命周期函数就会被执行
    // 如果这个组件第一次存在于父组件中，才会执行
    componentWillReceiveProps () {
    }
    //  当这个组件即将被从页面中剔除的时候，会被执行
    componentWillUnmount () {
        console.log('componentWillUnmount')
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