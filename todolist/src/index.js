import React from 'react';
import ReactDOM from 'react-dom';
//App.js
import Todolist from './todolist';
import * as serviceWorker from './serviceWorker';

// <App /> 这是JSX语法，只要用了这个语法就一定要在相应的文件里 引入react
ReactDOM.render(<Todolist />, document.getElementById('root'));


serviceWorker.unregister();
