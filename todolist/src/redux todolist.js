import React, { Component } from 'react';
import 'antd/dist/antd.css';
import store from './store';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, getInitListAction} from './store/actionCreators';
import TodoListUI from './todoListUI';

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        store.subscribe(this.handleStoreChange);
    }

    render () {
        return (<TodoListUI
                    inputValue={this.state.inputValue}
                    list={this.state.list}
                    handleInputChange={this.handleInputChange}
                    handleBtnClick={this.handleBtnClick}
                    handleItemDelete={this.handleItemDelete}
                />)
    }

    componentDidMount () {
        const action = getInitListAction()
        store.dispatch(action)
    }

    handleInputChange (e) {
        store.dispatch(getInputChangeAction(e.target.value))
    }

    handleStoreChange () {
        this.setState(store.getState());
    }

    handleBtnClick () {
        store.dispatch(getAddItemAction())
    }

    handleItemDelete (index) {
        store.dispatch(getDeleteItemAction(index))
    }
}

export default TodoList;