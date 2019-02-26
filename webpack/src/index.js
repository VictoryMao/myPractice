import _ from 'lodash'
import './style.css'
import Icon from '../../webpack1/src/1.png'
import Data from './data.xml'
import printMe from './print'
import { cube } from  './math'   //   并没有导入square方法哦

function component () {
    let element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'Webpack', '今日は风が騒がしいな'], ' ');
    element.classList.add('hello');
    let myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    let btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    // console.log(Data);
    return element;
}
function component1 () {
    let element = document.createElement('pre');
    element.innerHTML = [
        'Hello webpack1!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');
    return element
}

let element = component();
document.body.appendChild(element);
document.body.appendChild(component1());

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('Accepting the updated printMe module!');
//         // printMe();
//         document.body.removeChild(element);
//         element = component(); // 重新渲染页面后，component 更新 click 事件处理
//         document.body.appendChild(element);
//     })
// }
//  如果没有webpack.config.js文件，Webpack默认以./src/index.js为起点开始构建，获取依赖并完成打包到./dist/main.js
//  如果webpack.config.js 存在， 则webpack命令将默认选择使用它，看里面的配置是要将打包的内容放到那个目录的那个文件里, 会自动生成dist文件和main.js