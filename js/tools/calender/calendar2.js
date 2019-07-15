function Calendar(opt) {
  this.days = [31,28,31,30,31,30,31,31,30,31,30,31];
  //默认参数
  this.default = {
    dayNames : ['日', '一','二','三','四','五','六'],
    monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    el: '#calendar',
    prevMonth: null,
    nextMonth: null,
  };

  this._extend(opt, this.default)

  this.render();
}

Calendar.prototype.isCurDate = function() {
  
};

// 是否是当前月
Calendar.prototype.isCurMonth = function() {
  return this.default.currentYear === new Date().getFullYear() && this.default.currentMonth === new Date().getMonth();
};

//是否是闰年
Calendar.prototype.isLeapYear = function() {
  return (this.default.currentYear % 4 == 0 && this.default.currentYear % 100 != 0) || (this.default.currentYear % 400 == 0);
};

// 上下月
Calendar.prototype.prevNextMonth = function() {
  this.default.prevMonth = document.querySelector('.calendar-prev');
  this.default.nextMonth = document.querySelector('.calendar-next');

  var This = this;
  this._bindEvent(this.default.prevMonth, 'click', function() {
    if (This.default.currentMonth < 1) {
      This.default.currentYear -= 1;
      This.default.currentMonth = 11;
    } else {
      This.default.currentMonth -= 1;
    }
    createNewTable();
  })

  this._bindEvent(this.default.nextMonth, 'click', function() {
    if (This.default.currentMonth > 10) {
      This.default.currentYear += 1;
      This.default.currentMonth = 0;
    } else {
      This.default.currentMonth += 1;
    }
    createNewTable();
  })

  function createNewTable() {
    var oTable = document.querySelector('table');
    document.querySelector(This.default.el).removeChild(oTable);
    This.CreateCalendar();

    document.querySelector('.calendar-month').innerText = This.default.currentYear + '/' + This._addZero((This.default.currentMonth+1))
  }
};

// 创建当前月信息
Calendar.prototype.createInfo = function() {
  var oInfo = document.createElement('p');
  oInfo.className = 'calendar-info';

  var oPrev = document.createElement('i');
  oPrev.innerText = '上个月';
  oPrev.className = 'calendar-prev';
  var oNext = document.createElement('i');
  oNext.innerText = '下个月';
  oNext.className = 'calendar-next';

  var oMonth = document.createElement('span');
  oMonth.innerText = this.default.currentYear + '/' + this._addZero((this.default.currentMonth+1));
  oMonth.className = 'calendar-month';

  oInfo.appendChild(oPrev);
  oInfo.appendChild(oNext);
  oInfo.appendChild(oMonth);

  document.querySelector(this.default.el).appendChild(oInfo);
};

// 创建当头部星期
Calendar.prototype.createWeekdays = function() {
  var oTable = document.createElement('table');
  var oThead = document.createElement('thead');

  for (var i = 0, len = 7; i < len; i++) {
    var oTh = document.createElement('th');
    oTh.innerText = this.default.dayNames[i];
    oThead.appendChild(oTh);
  }

  oTable.appendChild(oThead);
  document.querySelector(this.default.el).appendChild(oTable);
};

// 创建当内容日期
Calendar.prototype.createDays = function() {
  // 当前年二月天数处理
  this.days[1] = this.isLeapYear() ? 29 : 28;
  // 获取当前月多少天
  var iDaycount = this.days[this.default.currentMonth];
  // 当前月第一天星期几
  var firstDay = new Date(this.default.currentYear, this.default.currentMonth).getDay();
  // 当前月显示多少行/列
  var curCol = 7;
  var curRow = (iDaycount+ firstDay) / curCol;

  // 创建日期表格
  var oTbody = document.createElement('tbody');
  for (var i = 0; i < curRow; i++) {
    var oTr = document.createElement('tr');
    for (var j = 0; j < curCol; j++) {
      var allCell = i * curCol + j;
      var dateCell = allCell - firstDay + 1;

      if (dateCell <= 0 || dateCell > iDaycount) { // 当月空白单元格
        var oTd = document.createElement('td');
        oTd.innerText = '';
      } else { // 当月单元格
        var oTd = document.createElement('td');
        oTd.innerText = dateCell;
      }
      
      oTr.appendChild(oTd);
    }
    oTbody.appendChild(oTr);
    document.querySelector('table').appendChild(oTbody);
  }
};

// 创建日历
Calendar.prototype.CreateCalendar = function(first_argument) {
  this.createWeekdays();
  this.createDays();
};

// 渲染日历
Calendar.prototype.render = function() {
  // 创建日历头部信息
  this.createInfo();
  // 创建日历主题
  this.CreateCalendar();
  // 上下月切换
  this.prevNextMonth();
};

// 补零
Calendar.prototype._addZero = function(num) {
  return num > 9 ? num : '0' + num;
}

Calendar.prototype._bindEvent = function(obj, event, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(event, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent('on'+event, fn)
  } else {
    obj['on'+event] = fn;
  }
};

// 拷贝继承
Calendar.prototype._extend = function(target, origin) {
  for (var attr in target) {
    origin[attr] = target[attr]
  }
};

