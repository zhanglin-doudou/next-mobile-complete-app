(function() {
  // 判断移动PC端浏览器和微信端浏览器
  var ua = navigator.userAgent;
  // var ipad = ua.match(/(iPad).* OS\s([\d _] +)/);
  var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; // android
  var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios
  if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    window.isAndroid = isAndroid;
    window.isIOS = isIOS;
    window.isMobile = true;
  } else {
    // 电脑PC端判断
    window.isDeskTop = true;
  }
  ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    window.isWeChatBrowser = true;
  }
})();
