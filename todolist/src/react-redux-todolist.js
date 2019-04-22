import React, { Component } from 'react';
import store from './react-redux-store';
import connect from 'react-redux';

class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }
    render () {
        return (
            <div>
                <div>
                    <input value={this.props.inputValue} />
                    <button>提交</button>
                </div>
                <ul>
                    <li></li>
                </ul>
            </div>
        )
    }
}

//  把store的数据映射给这个组件，变成组件的props
const mapStateToProps = (state) => {
    return {
        inputValue:state.inputValue
    }
}

// export default Todolist;

// 让 Todolist这个组件和store做连接, 规则在mapStateToProps里
export default connect(mapStateToProps, null)(Todolist);