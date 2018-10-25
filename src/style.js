import { injectGlobal } from 'styled-components';

injectGlobal`
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	@font-face {font-family: "iconfont";
	  src: url('iconfont.eot?t=1540363080969'); /* IE9*/
	  src: url('iconfont.eot?t=1540363080969#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
	  url('iconfont.ttf?t=1540363080969') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
	  url('iconfont.svg?t=1540363080969#iconfont') format('svg'); /* iOS 4.1- */
	}

	.iconfont {
	  font-family:"iconfont" !important;
	  font-size:16px;
	  font-style:normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}

	.icon-search:before { content: "\e623"; }

	.icon-douban:before { content: "\e64d"; }

	.icon-gongzhonghao:before { content: "\e63e"; }

	.icon-xiangshangjiantou:before { content: "\e657"; }

	.icon-password:before { content: "\e61b"; }

	.icon-user:before { content: "\e624"; }

	.icon-Aa:before { content: "\e636"; }

	.icon-shangjiantou:before { content: "\e600"; }

	.icon-web-icon-:before { content: "\e6d8"; }

	.icon-icon-checkin:before { content: "\e615"; }

	.icon-shuaxin:before { content: "\e790"; }

	.icon-shuaxin1:before { content: "\e758"; }

	.icon-weibo:before { content: "\e62f"; }
`;