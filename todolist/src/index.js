import React from 'react';
import ReactDOM from 'react-dom';
// import Todolist from './todolist';
import * as serviceWorker from './serviceWorker';
// import App from './App'
import ReduxTodolist from './redux todolist';

// <App /> 这是JSX语法，只要用了这个语法就一定要在相应的文件里 引入react
// ReactDOM.render(<Todolist />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<ReduxTodolist />, document.getElementById('root'));


serviceWorker.unregister();
