#自适应开发设计
**解决问题**  
PC端分辨率和移动端分辨率问题
##解决思路
要做两方面的事情  
`1.` 利用hotcss实现动态的HTML根姿态大小和动态的viewport scale，然后利用px2rem-loader实现将所有内容的大小是根据rem相对变化的。  
`2.` 当分辨率相差很大的时候，根据enquire-js进行查询（对width最大值进行判断）判断关键特殊部分进行媒体查询，实现不一样的布局样式内容，比如header部分。
##实现过程
`1.` 下载viewport.js文件（监听屏幕变化，自动改变html对font-size大小），在webpack进行入口，打包之后，在html中进行引用；  
`2.` 在webpack中配置px2rem-loader，通过对px转换成rem，实现rem值变化，页面中内容也会发生变化。  
`3.` 采用enquire-js,监听屏幕最大值，配合媒体查询功能，实现一定访问内屏幕变化，展示不同页面布局与样式。  
##核心代码实现
`1.`hotcss核心代码
```javascript
// 定义局部hotcss开辟个命名空间。
const hotcss = {};
const maxWidth = 540;
var viewportEl = document.querySelector('meta[name="viewport"]');
const dpr = window.devicePixelRatio || 1; // 获取屏幕分辨率，在移动端值的变化比较多
document.documentElement.setAttribute('data-dpr', dpr);
hotcss.dpr = dpr;
document.documentElement.setAttribute('max-width', maxWidth);
hotcss.maxWidth = maxWidth;

var scale = 1 / dpr;
const content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';
if (viewportEl) {
  viewportEl.setAttribute('content', content);
} else {
  viewportEl = document.createElement('meta');
  viewportEl.setAttribute('name', 'viewport');
  viewportEl.setAttribute('content', content);
  document.head.appendChild(viewportEl);
}

hotcss.mresize = function(){
  //对，这个就是核心方法了，给HTML设置font-size。
  let innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;
  if( hotcss.maxWidth && (innerWidth/hotcss.dpr > hotcss.maxWidth) ){
    innerWidth = hotcss.maxWidth*hotcss.dpr;
  }
  if( !innerWidth ){ return false;}
  document.documentElement.style.fontSize = ( innerWidth*20/320 ) + 'px';
  hotcss.callback && hotcss.callback();
};
hotcss.mresize(); 
//直接调用一次
if (window) {
 window.addEventListener( 'resize' , function(){
 		clearTimeout( hotcss.tid );
 		hotcss.tid = setTimeout( hotcss.mresize , 33 );
 	} , false ); 
 //绑定resize的时候调用
 window.addEventListener( 'load' , hotcss.mresize , false ); 
 //防止不明原因的bug。load之后再调用一次。
 window.hotcss = hotcss;
   //命名空间暴露在window之下。 
}
```
`2.` px2rem-loader核心代码
```ecmascript 6
// 依赖px2rem
var loaderUtils = require('loader-utils')
var Px2rem = require('px2rem')
module.exports = function (source) {
    var options = loaderUtils.getOptions(this) // 获取webpack的配置项
    var px2remIns = new Px2rem(options)
    return px2remIns.generateRem(source) // 采用px2rem库
}
```
px2rem代码
```ecmascript 6
var css = require('css'); // 将css生产ast语法树
function Px2rem(options) {
  this.config = {};
  extend(this.config, defaultConfig, options);
}

// generate rem version stylesheet
Px2rem.prototype.generateRem = function (cssText) {
  var self = this;
  var config = self.config;
  var astObj = css.parse(cssText);
  // 删除了一些不重要的代码
  // declaration.value就是px的值
  declaration.value = self._getCalcValue('rem', declaration.value); // common transform
  return css.stringify(astObj);
}

// get calculated value of px or rem
Px2rem.prototype._getCalcValue = function (type, value, dpr) {
  var config = this.config;
  var pxGlobalRegExp = new RegExp(pxRegExp.source, 'g');

  function getValue(val) {
    val = parseFloat(val.toFixed(config.remPrecision)); // control decimal precision of the calculated value
    return val == 0 ? val : val + type;
  }
  // 匹配px的值，并将值除以rem的值
  return value.replace(pxGlobalRegExp, function ($0, $1) {
    return type === 'px' ? getValue($1 * dpr / config.baseDpr) : getValue($1 / config.remUnit);
  });
};

module.exports = Px2rem;
```
`3.` enquire-js核心代码
```ecmascript 6
// 该库用到的主要接口为window.matchMedia，该方法传入一个媒体查询的值，返回一个匹配的对象
// 如果窗口的viewport的宽度小于600px，则matches值为true，如果大于，则值为false
// let mql = window.matchMedia('(max-width: 600px)');
// document.querySelector(".mq-value").innerText = mql.matches;

// enquire使用方法代码如下
import enquire from 'enquire-js';
enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile')); // 注册监听各个分辨率的屏幕
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };
enquireScreenHandle = (type) => {
    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
        });
      },
    };

    return handler;
};

// enquire源码
register : function(q, options, shouldDegrade) {
        var queries         = this.queries,
            isUnconditional = shouldDegrade && this.browserIsIncapable;

        if(!queries[q]) {
            queries[q] = new MediaQuery(q, isUnconditional);
        }

        //normalise to object in an array
        if(isFunction(options)) {
            options = { match : options };
        }
        if(!isArray(options)) {
            options = [options];
        }
        each(options, function(handler) {
            if (isFunction(handler)) {
                handler = { match : handler };
            }
            queries[q].addHandler(handler);
        });

        return this;
    }
```
