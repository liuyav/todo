(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD
      define(['jquery', 'underscore'], factory);
    } else if (typeof exports === 'object') {
      // Node, CommonJS之类的
      module.exports = factory(require('jquery'), require('underscore'));
    } else {
      // 浏览器全局变量(root 即 window)
      root.returnExports = factory(root.jQuery, root._);
    }
}(this, function ($, _) {
    //    方法
    function a(){
      console.log('a');
    }

    function b(){

    }

    function c(){

    }
 
    //    暴露公共方法
    return {
      a: a,
      b: b,
      c: c
    }
}));