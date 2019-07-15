#!/usr/bin/env node

const commander = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const stat = fs.stat;
const path = require('path');
const encoding = require('encoding');

const curPath = __dirname;
const temPath = path.resolve(__dirname, '../template');

const temViewPath = path.join(temPath, 'view');
const temConfigPath = path.join(temPath, 'config');
const separateConfigPath = path.join(temConfigPath, 'separate-config.json');
const separateConfigFile = require(separateConfigPath);
const questionConfig = require('../lib/question-config.js');

const template = require('art-template');

const date = new Date();

let pageData = {
  gameName: 'QQ飞车',
  time: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
};

// 读取文件
function readJsonFile(filePath, fn) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if(err) console.log(err);
    var d = JSON.parse(data);
    fn(d);
  });
}

// 写入文件
function writeJsonFile(filePath, opt, fn) {
  var fn = fn || function() {};
  fs.readFile(filePath, 'utf8', function (err, data) {

    if (err) {
      console.log(err);
      return;
    }

    var d = JSON.parse(data);
    for (var key in opt) {
      d[key] = opt[key]
    }
    var t = JSON.stringify(d, null, '  ');
    fs.writeFile(filePath, t, fn);

  });
}

// 获取项目类型
function ProjectInit() {
  inquirer.prompt(questionConfig.writeInfo).then(answers => {
    writeJsonFile(separateConfigPath, {
      projectType: answers.projectType,
      projectName: answers.projectName,
      projectDomain: answers.projectDomain,
      projectBaseFile: answers.projectBaseFile,
      projectModules: answers.projectModules
    }, setSeparateAddress)

    pageData = Object.assign(pageData, answers);

  })
}

// 设置分离地址
function setSeparateAddress() {
  var config = [
    {
      keyWord: 'PC专题',
      abbr: '/cp/',
      temDir: '/pc-act'
    },
    {
      keyWord: '移动专题',
      abbr: '/cp/',
      temDir: '/m-act'
    },
    {
      keyWord: 'PC官网',
      abbr: '/',
      temDir: '/pc'
    },
    {
      keyWord: '移动官网',
      abbr: '/m/',
      temDir: '/m'
    },
  ]

  // 读取配置
  readJsonFile(separateConfigPath, function(d) {
    var projectDomain = d.projectDomain;
    var projectType = d.projectType;
    var projectName = d.projectName;
    var siteType = '';
    var projectDir = '';
    var temDir = '';

    if ( /^(web|m)/.test(projectName) ) {
      siteType = 'os';
    } else {
      siteType = projectName;
    }

    pageData = Object.assign(pageData, {siteType: siteType});

    config.forEach(function(v, i) {
      if (projectType.indexOf(v.keyWord) != -1) {
        projectDir = v.abbr + d.projectName + '/';
        temDir = v.temDir;
      }
    })

    // 写入分离配置
    writeJsonFile(separateConfigPath, {
      projectDir: projectDir,
      separateUrl: `//game.gtimg.cn/images/${projectDomain}${projectDir}`,
      temDir: temDir,
      siteType: siteType
    }, createModules)
  })
}

// 创建模板
function createModules() {

  readJsonFile(separateConfigPath, function(d) {

    var distPath = path.join(process.cwd(), d.projectName);

    // 创建配置文件
    exists(temConfigPath, distPath, copy);

    var moudles = questionConfig.modules;

    // 是否创建基础文件
    if (d.projectBaseFile) {
      d.projectModules.forEach(function(v, i) {
        if ( v.indexOf(moudles[i].name != -1 ) ) {
          pageData[moudles[i].select] = true;
        }
      })
    }

    exists(temViewPath + d.temDir, distPath, copy)

    console.log()
    console.log( chalk.green('    目录生成成功！') )
    console.log()
    console.log( chalk.gray('    您的文件路径：') + curPath + '\\' + d.projectName)
    console.log()
    console.log( chalk.gray('    您的分离路径：') + d.separateUrl)
    console.log()
    console.log( chalk.gray('    接下来，请执行：') )
    console.log()
    console.log( chalk.green('        cd  ' + d.projectName) )
    console.log()
    console.log( chalk.green('        npm i'))
    console.log()
    console.log( chalk.gray('    Everything done!'))
    console.log()
  });
}

// 复制目录
function copy(src, dst){
  // 读取目录中的所有文件/目录
  fs.readdir( src, function(err, paths){

    if( err ){
      throw err;
    }

    paths.forEach(function( path ){
      var _src = src + '/' + path,
          _dst = dst + '/' + path,
          readable, writable;

      stat( _src, function( err, st ){

        if( err ){
          throw err;
        }

        // 判断是否为文件
        if( st.isFile() ){

          if ( /(\.js|\.html|\.css){1}/g.test(path) ) {

            var data = template(_src, pageData).replace(/[\r\n]{2,}/g, '\r');

            data = encoding.convert(data, 'gbk', 'utf-8')

            fs.writeFileSync(_dst, data);

          } else {

            // 创建读取流
            readable = fs.createReadStream( _src );

            // 创建写入流
            writable = fs.createWriteStream( _dst );

            // 通过管道来传输流
            readable.pipe( writable );
          }

        } else if( st.isDirectory() ){  // 如果是目录则递归调用自身

          exists( _src, _dst, copy );
          
        }
      });
    });
  });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
function exists(src, dst, callback){
  fs.exists( dst, function( exists ){
    // 已存在
    if( exists ){
      callback( src, dst );
    }
    // 不存在
    else{
      fs.mkdir( dst, function(){
        callback( src, dst );
      });
    }
  });
};

// 初始化
ProjectInit()










