import React from 'react';
import ReactDOM from 'react-dom';
// import Todolist from './todolist';
// import App from './App'
// import ReduxTodolist from './redux todolist';

import Todolist from './react-redux-todolist';
import store from './react-redux-store';
import { Provider } from 'react-redux';

// react-redux 第一个核心api: Provider，它连接了store，连接了store后它里面的组件都有能力获取store的内容s
const App = (
    <Provider store={store}>
       <Todolist />
    </Provider>
);

// <App /> 这是JSX语法，只要用了这个语法就一定要在相应的文件里 引入react
// ReactDOM.render(<Todolist />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(App, document.getElementById('root'));