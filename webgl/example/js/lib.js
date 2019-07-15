// 初始化着色器
function initShader(gl, vertextShaderSource, fragmentShaderSource) {
  // 创建着色器对象
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  // 添加着色器源代码
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);

  // 编译着色器源代码
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  // 创建程序对象
  var program = gl.createProgram();

  // 附着到程序对象
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // 链接程序对象
  gl.linkProgram(program);

  // 使用程序对象
  gl.useProgram(program);

  return program;
}

// 设置attribute
function setAttribLocation(gl, program, attribLocation, data) {
  // 获取位置变量
  var attribLocation = gl.getAttribLocation(program, attribLocation);

  // 创建缓冲区对象
  var buffer = gl.createBuffer();
  
  // 绑定缓冲区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // 向缓冲区对象添加数据
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // 链接缓冲区对象与变量
  gl.vertexAttribPointer(attribLocation, 2, gl.FLOAT, false, 0, 0);

  // 启用缓冲区对象
  gl.enableVertexAttribArray(attribLocation);
}

// 设置平移
function glTranslate(gl, program, utrans, tx, ty) {
  // 平移矩阵
  var matrixTrans = new Float32Array([
    1.0, 0.0, 0.0, tx,
    0.0, 1.0, 0.0, ty,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ])

  // 获取平移变量
  var utransLocation = gl.getUniformLocation(program, utrans);

  // 设置平移值
  gl.uniformMatrix4fv(utransLocation, false, matrixTrans);
}

// 设置缩放
function glScale(gl, program, uscale, sx, sy) {
  // 缩放矩阵
  var matrixScale = new Float32Array([
    sx, 0.0, 0.0, 0.0,
    0.0, sy, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ])

  // 获取平移变量
  var uscale = gl.getUniformLocation(program, uscale);

  // 设置平移值
  gl.uniformMatrix4fv(uscale, false, matrixScale);
}

// 设置旋转
function glRotate(gl, program, urotate, angel) {
  var rad = Math.PI * angel / 180;
  var sinB = Math.sin(rad);
  var cosB = Math.cos(rad);

  // 旋转矩阵
  var matrixRotate = new Float32Array([
    cosB, sinB, 0.0, 0.0,
    -sinB, cosB, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ])

  // 获取平移变量
  var urotate = gl.getUniformLocation(program, urotate);

  // 设置平移值
  gl.uniformMatrix4fv(urotate, false, matrixRotate);
}