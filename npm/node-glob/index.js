var glob = require('glob')

// * ： 匹配该路径段中0个或多个任意字符
glob("lib/*.js", function (er, files) {
  console.log()
  console.log('*的匹配结果：')
  console.log(files)
})

// ** ： 可以匹配任何内容,它还可以匹配子文件夹下的文件
glob("lib/**/*.js", function (er, files) {
  console.log()
  console.log('**的匹配结果：')
  console.log(files)
})

// ? ： 匹配该路径段中1个任意字符
glob("lib/??.js", function (er, files) {
  console.log()
  console.log('?的匹配结果：')
  console.log(files)
})

// [] : 匹配该路径段中在指定范围内的一个字符
glob("lib/[1-2].js", function (er, files) {
  console.log()
  console.log('[]的匹配结果：')
  console.log(files)
})

// ?(pattern|pattern|pattern) : 匹配多个模型中的0个或任意1个
glob("lib/?(a|b).js", function (er, files) {
  console.log()
  console.log('?(pattern|pattern|pattern)的匹配结果：')
  console.log(files)
})

// @(pattern|pattern|pattern): 匹配多个模型中的1个
glob("lib/@(a|b).js", function (er, files) {
  console.log()
  console.log('@(pattern|pattern|pattern)的匹配结果：')
  console.log(files)
})

// *(pattern|pattern|pattern) : 匹配括号中多个模型的0个或多个或任意个的组合
glob("lib/*(*.jpg|*.png|*.gif|*.mp3|*.video)", function (er, files) {
  console.log()
  console.log('*(pattern|pattern|pattern)的匹配结果：')
  console.log(files)
})

// +(pattern|pattern|pattern) : 匹配括号中多个模型的1个或任意个的组合
glob("lib/+(a|b).js", function (er, files) {
  console.log()
  console.log('+(pattern|pattern|pattern)的匹配结果：')
  console.log(files)
})

// !(pattern|pattern|pattern) : 匹配不包含任何模型
glob("lib/!(a|b).js", function (er, files) {
  console.log()
  console.log('!(pattern|pattern|pattern)的匹配结果：')
  console.log(files)
})


// matchBase: 设置为true以后,在当前目录下所有的文件夹和子文件夹里寻找匹配的文件
glob("lib/@(a|b|ab|aa).js", {matchBase:true}, function (er, files) {
  console.log()
  console.log('matchBase的匹配结果：')
  console.log(files)
})

// 当glob没有获取到任何匹配的文件是,并不会像shell里那样返回模型本身,files参数返回的是一个空数组,如果需要让files返回的是模型本身,需要设置 nonull 属性为 true
glob("lib/c?.js", {nonull:true}, function (er, files) {
  console.log()
  console.log('nonull的匹配结果：')
  console.log(files)
})

// 同步获取匹配文件列表:
// var files = glob.sync(pattern, [options])

// Glob类:
// 通过实例化一个glob.Glob类,可以获得一个glob对象:
// var Glob = require("glob").Glob
// var mg = new Glob(pattern, options, cb)
//事件:
// end :  end事件会在文件匹配结束,找出所有匹配结果的时候触发,它接受的参数就是找到的文件的数组
// match :  match事件会在每次匹配到一个文件的时候触发,它接受的参数就是匹配到的文件
// error :  error事件会在匹配遇到错误的时候触发.接受的参数就是错误信息
// abort :  当实例调用了.abort()方法时,abort事件被触发
// 方法:
// pause 暂停匹配搜索
// resume 继续匹配搜索
// abort 永远停止匹配搜索,不能继续

// https://www.cnblogs.com/liulangmao/p/4552339.html
// https://github.com/isaacs/node-glob

