const gulp = require('gulp');
const iconv = require('gulp-iconv');
const replace = require('gulp-replace');
const zip = require('gulp-zip');
const chalk = require('chalk');
const fs = require('fs');
const iconvLite = require('iconv-lite');
const cheerio = require('cheerio');
const separateConfigFile = require('./separate-config.json');
let config = {
  init: {
    url: function(str) {
      return new RegExp('('+str+'|./'+str+')', 'g')
    },
    dir: function(str) {
      return new RegExp('(\'|\"){1}('+str+'|./'+str+')', 'g')
    },
    entry: function(dir) {
      return dir;
    }
  },
  build: {
    url: separateConfigFile.separateUrl,
    dir: function(str) {
      return `"${separateConfigFile.projectDir}${str}`;
    },
    entry: function(dir) {
      return `dist/${separateConfigFile.projectName}${dir}`
    }
  }
}
// 文件分离
gulp.task('build:html', () => {
  gulp.src(config.init.entry('*.html'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.init.url('ossweb-img/'), config.build.url))
    .pipe(replace(config.init.dir('inc/'), config.build.dir('inc/')))
    .pipe(replace(config.init.dir('css/'), config.build.dir('css/')))
    .pipe(replace(config.init.dir('js/'), config.build.dir('js/')))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.build.entry('/')));
});
gulp.task('build:css', () => {
  gulp.src(config.init.entry('css/*.css'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.init.url('../ossweb-img/'), config.build.url))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.build.entry('/css')));
  gulp.src(config.init.entry('ossweb-img/*.css'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace('../ossweb-img/', config.build.url))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.build.entry('/ossweb-img')));
});
gulp.task('build:js', () => {
  gulp.src(config.init.entry('js/*.js'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.init.url('ossweb-img/'), config.build.url))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.build.entry('/js')));
  // 处理js路径
  gulp.src(config.init.entry('ossweb-img/*.js'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.init.url('ossweb-img/'), config.build.url))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.build.entry('/ossweb-img')));
});
gulp.task('build:inc', () => {
  gulp.src(config.init.entry('./inc/**'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.init.url('ossweb-img/'), config.build.url))
    .pipe(replace(config.init.dir('css/'), config.build.dir('css/')))
    .pipe(replace(config.init.dir('js/'), config.build.dir('js/')))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.build.entry('/inc')));
});
gulp.task('build:image', () => {
  // 处理图片音视频
  gulp.src('ossweb-img/*.!(css|js)')
    .pipe(gulp.dest(config.build.entry('/ossweb-img')));
});

// 文件解分离
gulp.task('restore:html', () => {
  gulp.src(config.build.entry('/*.html'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.build.url, 'ossweb-img/'))
    .pipe(replace(config.build.dir('inc/'), 'inc/'))
    .pipe(replace(config.build.dir('css/'), 'css/'))
    .pipe(replace(config.build.dir('js/'), 'js/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.init.entry('./')));
});
gulp.task('restore:css', () => {
  gulp.src(config.build.entry('/css/*.css'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.build.url, '../ossweb-img/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.init.entry('css')));
  gulp.src(config.build.entry('/ossweb-img/*.css'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.build.url, '../ossweb-img/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.init.entry('ossweb-img')));
});
gulp.task('restore:js', () => {
  gulp.src(config.build.entry('/js/*.js'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.build.url, 'ossweb-img/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.init.entry('js')));
  gulp.src(config.build.entry('/ossweb-img/*.js'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.build.url, 'ossweb-img/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.init.entry('ossweb-img')));
});
gulp.task('restore:inc', () => {
  gulp.src(config.build.entry('/inc/**'))
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(config.build.url, 'ossweb-img/'))
    .pipe(replace(config.build.dir('css/'), 'css/'))
    .pipe(replace(config.build.dir('js/'), 'js/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(config.init.entry('./inc')));
});
gulp.task('restore:image', () => {
  gulp.src(config.build.entry('/ossweb-img/*.!(css|js)'))
    .pipe(gulp.dest(config.init.entry('./ossweb-img')));
});

function check() {
  const isPC = separateConfigFile.projectType.indexOf('PC') != -1;

  const isM = separateConfigFile.projectType.indexOf('移动') != -1;

  let pass = true;

  var htmlString = fs.readFileSync('./index.html')

  htmlString = iconvLite.decode(htmlString, 'gbk');

  var $ = cheerio.load(htmlString);

  var metas = $('meta');

  metas.each(function(i, v) {

    if ( /(Description|description|Keywords|keywords)/g.test($(this).attr('name'))) { // 检查关键字描述
      if ( $(this).attr('content') === '' ) {
        pass = false;
      }
    } else if ( isPC && /(name|description|image)/g.test($(this).attr('itemprop')) ) { // 检查pc端分享
      if ( $(this).attr('content') === '' ) {
        pass = false;
      }
    }
  })

  var scripts = $('script');

  scripts.each(function(i, v) {
    var src = $(this).attr('src');
    
    if ( src && src.indexOf('TGMobileShare') === -1 && isM ) { // 检查m端分享
      pass = false;
    } else if ( src && src.indexOf('PTT') === -1 ) {
      pass = false;
    }
  })

  if (!pass) {
    console.log()
    console.log()
    console.log( chalk.red('    页面中可能有如下不符合规范的地方，请修改后在进行分离') );
    console.log()
    console.log( chalk.red('    1. TDK和分享未填写完整') )
    console.log()
    console.log( chalk.red('    2. 协议自适应') )
    console.log()
    console.log( chalk.red('    PS: 如需跳过检查，请手动改写 separate-config.json 中 projectCheck 为 false') )
    console.log()
    process.exit()
  }
  
}

if (!separateConfigFile.projectCheck) {
  gulp.task('build', ['build:html', 'build:css', "build:js", "build:inc", "build:image"], function() {
    console.log()
    console.log()
    console.log( chalk.green('    文件分离成功') );
    console.log()
    console.log()
  })
} else {
  check();
  gulp.task('build', ['build:html', 'build:css', "build:js", "build:inc", "build:image"], function() {
    console.log()
    console.log()
    console.log( chalk.green('    文件分离成功') );
    console.log()
    console.log()
  })
}
gulp.task('restore', ['restore:html', 'restore:css', 'restore:js', 'restore:inc', 'restore:image'], function() {
  console.log()
  console.log()
  console.log( chalk.green('    文件解分离成功') );
  console.log()
  console.log()
})
