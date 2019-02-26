import { cube } from './math.js';

function component() {
    var element = document.createElement('pre');
    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');
    return element;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}

//  如果没有webpack.config.js文件，Webpack默认以./src/index.js为起点开始构建，获取依赖并完成打包到./dist/main.js