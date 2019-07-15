self.onmessage = (detail) => {
  var add = 0;
  for (var i = 0; i < 10000; i++) {
    for (var j = 0; j < 10000; j++) {
      add += i + j;
    }
  }

  self.postMessage({
    res: add
  })
}
