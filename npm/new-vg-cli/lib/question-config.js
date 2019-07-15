const chalk = require('chalk');

const modules = [
  {
    name: "PTT统计代码",
    select: 'isAddPTT',
  },
  {
    name: "弹窗方法",
    select: 'isAddDia'
  }
]

// 请选择项目类型
const writeInfo = [
  {
    type: 'list',
    message: '请选择项目类型:',
    name: 'projectType',
    choices: ["PC专题", "PC官网", "移动专题", "移动官网"]
  },
  {
    type: 'input',
    message: '请输入项目名' + chalk.gray('（例：a20190101xxx）'),
    name: 'projectName',
    validate: function(val) {
      if ( /^a\d{8}[A-Za-z]+$/.test(val) ) {
        return true
      } else {
        return '项目名称不正确';
      }
    },
    when: function(answers) {
      if (answers.projectType.indexOf('专题')!= -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  {
    type: 'input',
    message: '请输入项目名：' + chalk.gray('（例：web201901）'),
    name: 'projectName',
    validate: function(val) {
      if ( /^web\d{6}$/.test(val) ) {
        return true
      } else {
        return '项目名称不正确';
      }
    },
    when: function(answers) {
      if (answers.projectType.indexOf('PC官网')!= -1) {
        return true;
      }
    }
  },
  {
    type: 'input',
    message: '请输入项目名：' + chalk.gray('（例：m201901）'),
    name: 'projectName',
    validate: function(val) {
      if ( /^m\d{6}$/.test(val) ) {
        return true
      } else {
        return '项目名称不正确';
      }
    },
    when: function(answers) {
      if (answers.projectType.indexOf('移动官网')!= -1) {
        return true;
      }
    }
  },
  {
    type: 'input',
    message: '请输入游戏域名前缀' + chalk.gray('（例：speedm）'),
    name: 'projectDomain',
    validate: function(val) {
      if (val.length) {
        return true
      } else {
        return '此处填写会影响之后分离结果，请认真填写';
      }
    }
  },
  {
    type: "confirm",
    message: "是否生成基础文件?" + chalk.gray('（css样式重置、html基础结构、分享等）'),
    name: "projectBaseFile",
    prefix: " ",
  },
  {
    type: "confirm",
    message: "是否打包之前进行页面检查?" + chalk.gray('（tdk分享、标题、http等）'),
    name: "projectCheck",
    prefix: " ",
  },
  {
    type: "checkbox",
    message: "选择通用模块",
    name: "projectModules",
    choices: modules,
    when: function(answers) {
      return answers.projectBaseFile;
    }
  }
];

// 导出问题
module.exports = {
  writeInfo: writeInfo,
  modules: modules
}

