function $$g(el){ return document.getElementById(el);}
function calendar(opt){
  this._MODULE_ID_ = '';//日历ID
  this.dayArray = [31,28,31,30,31,30,31,31,30,31,30,31];
  //当前日期年 月
  this.currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  };
  this.cache = {
    selectedDates : {},//选择的日期
    currentDateStrings : [] //当前页的日期id
  };
  //默认参数
  this.properties = {
    dayNames : ['日','一','二','三','四','五','六'],
    monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    startTime : new Date(2008,0,23),//日历开始日期
    endTime : new Date(2008,4,20),//日历结束日期
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    holder: 'calendar',// id
    callback : null,// 日期选择后回调函数
    isMultipleSelect:false,//是否多选
    dateNormalColor : '#FFF',
    dateHoverColor : '#FFFFCC',
    headerClass : 'calendarHeader',
    currentDateClass : 'currentDate',
    weekdaysClass : 'weekdays',
    contentClass : 'calendarContent',
    prevMonthClass : 'prevMonth',
    prevMonthActiveClass : 'prevMonthActive',
    nextMonthClass : 'nextMonth',
    nextMonthActiveClass : 'nextMonthActive',
    isDateClass : 'isDate',
    isTodayClass : 'isToday',
    isDoubleDayClass : 'isDoubleDay',
    isSelectedClass : 'isSelected'
  };

  this.extend(opt, this.properties)

  this.init()
}

calendar.prototype = {
  loadScript:function(a,b){
    var c=document.createElement("script");c.type="text/javascript",c.readyState?c.onreadystatechange=function(){("loaded"==c.readyState||"complete"==c.readyState)&&(c.onreadystatechange=null,b&&b())}:c.onload=function(){b&&b()},c.src=a,document.body.appendChild(c)
  },
  
  //是否是闰年
  isLeapYear:function(){
    return ( this.properties.year % 4 == 0 && this.properties.year % 100 != 0) || ( this.properties.year % 400 == 0 );
  },

  //是否是开始日期
  isStartMonth:function(){
    return this.isSameDate(
      new Date(this.currentDate.year,this.currentDate.month,1),
      new Date(this.properties.startTime.getFullYear(),this.properties.startTime.getMonth(),1)
    );
  },

  //是否是结束日期
  isEndMonth:function(){
    return this.isSameDate(
      new Date(this.currentDate.year,this.currentDate.month,1),
      new Date(this.properties.endTime.getFullYear(),this.properties.endTime.getMonth(),1)
    );
  },

  //是否是已选日期
  isSelectedDay:function(date){
    return this.cache.selectedDates[this.dateToString(date)] == true ? true : false;
  },

  // 今天
  isToday:function(date){
    return this.isSameDate(date,new Date());
  },

  //是否是相同日期
  isSameDate:function(a,b){
    return a.getFullYear()  == b.getFullYear() && a.getMonth() == b.getMonth() && a.getDate()  == b.getDate();
  },

  // 变量是否是函数
  isFunction:function( fn ) {
    return !!fn && typeof fn != "string" && !fn.nodeName && fn.constructor != Array && /function/i.test( fn + "" );
  },

  //设置当前日期
  setcurrentDate:function(year,month){
    this.dayArray[1] = this.isLeapYear() ?  29 : 28;
    this.currentDate.year = this.properties.year;
    this.currentDate.month = this.properties.month;
  },

  //ID
  setMoudleId:function(){
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i = 0 ; i < 32; i++)
      this._MODULE_ID_ += chars.charAt(Math.floor(Math.random()*62));
  },

  //根据td 日期选择
  deleteSelect:function(element,elementId){
    delete this.cache.selectedDates[elementId];
    if(element == null) return;
    if(this.isToday(this.stringToDate(elementId)))
      element.className = this.properties.isTodayClass;
    else
      element.className = this.properties.isDateClass;
  },

  //补0
  digitFix:function(number,count){
    var _string = number+"";
    var _count = count-_string.length;
    for(var i = 0; i < _count; i++)
      _string = "0" + _string;
    return _string;
  },

  //日期转为字符串
  dateToString:function(date){
    return date.getFullYear()+this.digitFix(date.getMonth()+1,2)+this.digitFix(date.getDate(),2);
  },

  //字符串转为日期
  stringToDate:function(string){
    return new Date(
      parseInt(string.substring(0,4)),
      string.substring(4,5) == '0' ? parseInt(string.substring(5,6))-1 : parseInt(string.substring(4,6))-1,
      string.substring(6,7) == '0' ? parseInt(string.substring(7)) : parseInt(string.substring(6))
    );
  },

  //显示下一个月
  getNextMonth:function(){
    if(this.isEndMonth()) return;
    if(this.currentDate.month > 10){
      this.currentDate.month = 0;
      this.currentDate.year++;
    }
    else this.currentDate.month++;
    this.render(this.currentDate.year, this.currentDate.month);
  },

  //显示上一个月
  getPrevMonth:function(){
    if(this.isStartMonth()) return;
    if(this.currentDate.month < 1){
      this.currentDate.month = 11;
      this.currentDate.year--;
    }
    else this.currentDate.month--;
    this.render(this.currentDate.year,this.currentDate.month);
  },

  //渲染内容
  preRender:function(){
    this.setcurrentDate(this.properties.year, this.properties.month);
    this.cache.currentDateStrings.length = 0;
  },

  //渲染日期头部
  renderHeader:function(){
    var html = '';
    var prevMonthClass = this.isStartMonth() ? this.properties.prevMonthClass : this.properties.prevMonthActiveClass;
    var nextMonthClass = this.isEndMonth()   ? this.properties.nextMonthClass : this.properties.nextMonthActiveClass;
    html += '<table class="'+this.properties.headerClass+'"><tr><td id="'
       +this.properties.prevMonthClass+this._MODULE_ID_+'" class="'
       +prevMonthClass+'">&nbsp;</td><td class="'+this.properties.currentDateClass+'">'
       +this.currentDate.year+'年'
       +this.properties.monthNames[this.currentDate.month]
       +'</td><td id="'
       +this.properties.nextMonthClass+this._MODULE_ID_+'" class="'
       +nextMonthClass+'">&nbsp;</td></tr></table>';
    return html;
  },

  //渲染头部星期
  renderWeekdays:function(){
    var html = '';
    for (var index = 0; index < 7; index++) {
      html +=  '<td>'+this.properties.dayNames[index]+'</td>';
    }
    return '<tr class="'+this.properties.weekdaysClass+'">'+html+'</tr>';
  },

  //根据年份和日期显示日历
  render:function(){
    this.preRender();
    
    var date = new Date(this.properties.year,this.properties.month,1),dateString = '';
    var dayCount = this.dayArray[this.properties.month];
    var preDayCount = date.getDay(),preDayCounter = preDayCount;
    var afterDayCounter = (this.dayArray[this.properties.month]+preDayCount)%7 == 0 ? 0 : 7-((this.dayArray[this.properties.month]+preDayCount)%7);
    
    var html = this.renderHeader()+'<div id="'+this.properties.contentClass+this._MODULE_ID_+'" class="'+this.properties.contentClass+'"><table>';
    html += this.renderWeekdays();

    html += '<tr rel="0">';
    
    while(preDayCounter-- > 0) html += '<td>&nbsp;</td>';
    
    var that = this;
    
    var data = eval(pageInfo);
    data = data.newsList;
    var len = data.length-1;
    for(var i = 1; i <= dayCount; i++ ){
    
      date = new Date(that.properties.year, that.properties.month, i);

      dateString = 'days-'+that.properties.year+'-'+(that.properties.month+1)+'-'+i;  
      var statuHtml = '', _rel = '';
      that.cache.currentDateStrings.push(dateString);
        //判断状态
        for (var index = 0; index < len; index++) {
          if(data[index]['mouth'] == (that.properties.month+1) && data[index]['day'] == i && data[index]['year'] == that.properties.year){
            if(data[index]['status'] == 1){               
              statuHtml = '<span class="acts-days">'+ i +'</span><span class="status-1"></span>'; 
            }else{
              statuHtml = '<span class="acts-days">'+ i +'</span><span class="status"></span>';
            }
            _rel = 'on'   
          }
          if(statuHtml == ''){
            statuHtml = i;
          }
        }
      
      if(that.isSelectedDay(date) && that.isToday(date))
        html += '<td rel="'+ _rel +'" class="'+that.properties.isDoubleDayClass+'" id="'+dateString+'">'+statuHtml+'</td>';
      else if(that.isSelectedDay(date))
        html += '<td rel="'+ _rel +'" class="'+that.properties.isSelectedClass+'" id="'+dateString+'">'+statuHtml+'</td>';
      else if(that.isToday(date))
        html += '<td rel="'+ _rel +'" class="'+that.properties.isTodayClass+'" id="'+dateString+'">'+statuHtml+'</td>';
      else 
        html += '<td rel="'+ _rel +'" class="'+that.properties.isDateClass+'" id="'+dateString+'">'+statuHtml+'</td>';

      if((i+preDayCount) % 7 == 0) html += '</tr><tr rel="'+ Math.ceil((i+preDayCount) / 7)+'">';
    }

    while(afterDayCounter-- > 0) html += '<td>&nbsp;</td>';
  
    html += '</tr>';
    html += '</table></div>';

    $$g(that.properties.holder).innerHTML = html;
    that.attachEvent();
    
    
  },

  //日历中上一个月、下一个月以及td绑定事件
  attachEvent:function(){
    this.bind($$g(this.properties.prevMonthClass+this._MODULE_ID_),'click',this.getPrevMonth,this);
    this.bind($$g(this.properties.nextMonthClass+this._MODULE_ID_),'click',this.getNextMonth,this);
    
    var els = this.cache.currentDateStrings,_el = null,that=this;
    for(var i = 0; i < els.length; i++){
      _el = $$g(els[i]);
      var hoverTimer, outTimer;
      var data = eval(pageInfo);
      data = data.newsList;
      var len = data.length-1;

      if(!this.isToday(this.stringToDate(els[i]))){
        this.bind(_el,'mouseover',function(){

            var _htm = '';
            var _that =  $(this);
            var _$perv = '',clsName='';

            
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(function(){
              var _$id = _that.attr('id');
              var _rel = _that.attr('rel');
              var year = _$id.split('-')[1];
              var month = _$id.split('-')[2]; 
              var day = _$id.split('-')[3];
              var h=0;
              if(_rel == 'on'){
                _trRel = _that.parent("tr").attr("rel"); 
              
                for (var j = 0; j < len; j++) {
                  if(data[j]['mouth'] == month && data[j]['day'] == day && data[j]['year'] == year){
                    
                    if(h%2 !== 0){
                      clsName = 'li-even';
                    }else{
                      clsName = '';
                    }
                    _htm += '<li class='+ clsName +'>';
                      if(data[j]['url'] == ''){
                        _htm += '<a href="javascript:alert(\'敬请期待\')">';
                      }else{
                        _htm += '<a target="_blank" href="'+ data[j]['url'] +'?ADTAG=actions.enter.'+ data[j]['mouth'] +'_'+ data[j]['day'] +'">';
                      }
                      _htm += '<p class="calendar-black">'+ data[j]['title'] +'</p>'+
                          '<p class="calendar-red">'+ data[j]['stitle'] +'</p>'+
                          '<p><b>核心奖励:</b></p>'+ that.stringBr( data[j]['detail'] ) +
                          '</a></li>';
                    h++;      
                  }
                }
                if(h<2){
                  $(".calendar-tips").css({"width":"250px"}); 
                  $("#calendar-items").css({"width":"250px","overflow":"hidden"})
                }else{
                  $(".calendar-tips").css({"width":"540px"});
                  $("#calendar-items").css({"width":"auto","overflow":"auto"})
                }
                $(".calender-arrow").css({"top":50+30*(_trRel)});
                $(".calendar-tips").show();
                $("#calendar-items").html( _htm );
              }
            }, 500);  
          },
          _el
        );
        this.bind(_el,'mouseout',function(){
          }
        );
      }

      $(".calendar-tips").hover(
        function(){
          $(".calendar-tips").show();
        },
        function(){
          setTimeout(function(){ $(".calendar-tips").hide(); if($("#calendar-bd").find('.now-days').length !== 0){ $("#calendar-bd").find('.now-days').removeClass('now-days'); } }, 500);
        } 
      )
    }
  },

  //内置事件绑定
  bind:function(el,type,fn,range,params){
    var _params = params == null || params.constructor != Array  ? [params] : params;
    if (el.addEventListener)
      el.addEventListener(type,function(){fn.apply(range,_params)}, false);
    else
      el.attachEvent("on"+type, function(){fn.apply(range,_params)});
  },

  stringBr:function(str){
    var strArr = str.split('，'), _htm = '';
    for (var index = 0; index < strArr.length; index++) {
      _htm += '<p>'+ strArr[index] +'</p>';
    }
    return _htm;
  },

  // 用配置覆盖默认
  extend: function(obj1, obj2) {
    for (var attr in obj1) {
      obj2[attr] = obj1[attr]
    }
  },

  //日历初始化
  init:function(){
    this.setMoudleId();
    this.render();
  }
}

