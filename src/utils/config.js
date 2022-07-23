// 根据环境变量动态添加eruda
const mode = import.meta.env.MODE;
if (mode == 'daily' || mode == 'gray') {
	const script1 = document.createElement('script');
	script1.src = "//qzz-static.forwe.store/public-assets/eruda.js";
	document.documentElement.appendChild(script1);
	script1.onload = function () {
		const script2 = document.createElement('script');
		script2.text = "eruda.init()";
		document.documentElement.appendChild(script2);
	}
}
// 线上监控
if (mode == 'production') {
	const script1 = document.createElement('script');
	script1.text = `
		!(function (c, i, e, b) {
			var h = i.createElement("script");
			var f = i.getElementsByTagName("script")[0];
			h.type = "text/javascript";
			h.crossorigin = true;
			h.onload = function () {
				c[b] || (c[b] = new c.wpkReporter({
					bid: "dta_2_92365"
				}));
				c[b].installAll()
			};
			f.parentNode.insertBefore(h, f);
			h.src = e
		})(window, document, "https://g.alicdn.com/woodpeckerx/jssdk??wpkReporter.js", "__wpk");`;
	document.head.appendChild(script1);
}