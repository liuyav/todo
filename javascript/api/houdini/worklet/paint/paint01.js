class bg {
  static get inputProperties() {
    return ['--size-w', '--size-h'];
  }

  paint (ctx, geometry, properties) {
    // ctx 画布对象（并不是和canvas下的画笔对象完全一致，文本渲染方法不可用）
    // geometry 指定宽高
    // properties 获取自定义属性
    console.log(ctx)

    console.log(geometry)
    
    console.log(properties);
    console.log(properties.get('--size-w'));
    console.log(properties.get('--size-h'));
  }
}

// rigisterPaint 注册
registerPaint('draw', bg);
