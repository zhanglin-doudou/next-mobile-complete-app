(function(doc, win) {
  var docEl = doc.documentElement,
    isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1;
  dpr = window.top === window.self ? dpr : 1; //被iframe引用时，禁止缩放
  var scale = 1 / dpr,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  docEl.dataset.dpr = dpr;
  var metaEl = doc.createElement('meta');
  metaEl.name = 'viewport';
  metaEl.content =
    'initial-scale=' +
    scale +
    ',maximum-scale=' +
    scale +
    ', minimum-scale=' +
    scale +
    ',user-scalable=no,viewport-fit=cover';
  docEl.firstElementChild.appendChild(metaEl);
  var recalc = function() {
    var width = docEl.clientWidth;
    // 大于1280按1280来算
    if (width / dpr > 1280) {
      width = 1280 * dpr;
    }
    // 乘以100，px : rem = 100 : 1
    docEl.style.fontSize = 100 * (width / 375) + 'px';
    /* doc.body &&
      doc.body.style.height !== docEl.clientHeight &&
      docEl.clientHeight > 360 &&
      (doc.body.style.height = docEl.clientHeight + 'px'); */
  };
  recalc();

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  /* win.onload = () => {
    doc.body.style.height = docEl.clientHeight + 'px';
  }; */
})(document, window);
