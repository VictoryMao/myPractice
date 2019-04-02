import React from 'react';
import { Input, Button, List } from 'antd';

//  无状态组件， 性能较高
const TodoListUI = (props) => {
    return (
        <div>
            <Input placeholder="Basic usage"
            value={props.inputValue}
            style={{width:300, marginRight:30, marginBottom:20}}
            onChange={props.handleInputChange}
        />
            <Button type="primary" onClick={props.handleBtnClick}>提交</Button>
            <List
                style={{width: 300}}
                header={<div>是的，我是头部</div>}
                footer={<div>没错，我是底部</div>}
                bordered
                dataSource={props.list}
                renderItem={(item, index) => (<List.Item onClick={() => {props.handleItemDelete(index)}}>{item}</List.Item>)}
            >
            </List>
        </div>
    )
}
// class TodoListUI extends Component {
//     render () {
//         return (
//             <div>
//                 <Input placeholder="Basic usage"
//                     value={this.props.inputValue}
//                     style={{width:300, marginRight:30, marginBottom:20}}
//                     onChange={this.props.handleInputChange}
//                  />
//                 <Button type="primary" onClick={this.props.handleBtnClick}>提交</Button>
//                 <List
//                     style={{width: 300}}
//                     header={<div>是的，我是头部</div>}
//                     footer={<div>没错，我是底部</div>}
//                     bordered
//                     dataSource={this.props.list}
//                     renderItem={(item, index) => (<List.Item onClick={() => {this.props.handleItemDelete(index)}}>{item}</List.Item>)}
//                 >
//                 </List>
//             </div>
//         )
//     }
// }

export default TodoListUI;