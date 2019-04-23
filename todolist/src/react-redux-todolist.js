import React from 'react';
// import store from './react-redux-store';
import { connect } from 'react-redux';

// UI组件
const Todolist = (props) => {
    return (
        <div>
            <div>
                <input value={props.inputValue} onChange={props.changeInputValue}/>
                <button onClick={props.handleClick}>提交</button>
            </div>
            <ul>
                {
                    props.list.map((item, index) => {
                        return <li
                                    key={item}
                                    onClick={()=>{props.handleDelete(index)}}
                               >{item}</li>
                    })
                }
            </ul>
        </div>
    )
}
// class Todolist extends Component {
//     // constructor(props) {
//     //     super(props);
//     //     // this.state = store.getState();
//     // }
//     render () {
//         return (
//             <div>
//                 <div>
//                     <input value={this.props.inputValue} onChange={this.props.changeInputValue}/>
//                     <button onClick={this.props.handleClick}>提交</button>
//                 </div>
//                 <ul>
//                     {
//                         this.props.list.map((item) => {
//                             return <li key={item}>{item}</li>
//                         })
//                     }
//                 </ul>
//             </div>
//         )
//     }
// }

//  把store的数据映射给这个组件，变成组件的props
const mapStateToProps = (state) => {
    return {
        inputValue:state.inputValue,
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue (e) {
            const action = {
                type: 'CHANGE_INPUT_VALUE',
                value: e.target.value
            }
            dispatch(action)
        },
        handleClick () {
            const action = {
                type: 'add_item'
            }
            dispatch(action)
        },
        handleDelete (index) {
            const action = {
                type: 'delete_item',
                index
            }
            dispatch(action)
        }
    }
}

// export default Todolist;

// 让 Todolist这个组件和store做连接, 规则在mapStateToProps里
// 返回的是一个容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Todolist);