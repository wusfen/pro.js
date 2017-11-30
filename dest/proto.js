/**
 * https://github.com/wusfen/proto.js
 *
 * proto.js 是一个js增强库，提供许多实用的链式方法，使数据操作更加方便
 * 
 * license
 * c 2016.04.01
 * u 2017.11.29
 * wushufen: 404315887@qq.com
 */

Object.assign=Object.assign||function(r,t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var c in n)n.hasOwnProperty(c)&&(r[c]=n[c])}return r},Object.keys=Object.keys||function(r){var t=[];for(var e in r)r.hasOwnProperty(e)&&t.push(e);return t},Object.values=function(r){var t=[];for(var e in r)r.hasOwnProperty(e)&&t.push(r[e]);return t},Object.isEmpty=function(r){return r&&"object"==typeof r?!Object.keys(r).length:!r},Object.getType=function(r){return{}.toString.call(r).slice(8,-1).toLowerCase()},Object.copy=function(r,t,e){if(t=t||10,e=e||0,e>t)return"...";var n=Object.getType(r);if("object"!=n&&"array"!=n)return r;if("array"==n){for(var c=[],o=0,a=r.length;a>o;o++)c[o]=Object.copy(r[o],t,e+1);return c}if("object"==n){var i={};for(var u in r)i[u]=Object.copy(r[u],t,e+1);return i}};
!function(){function t(t){return Object.prototype.toString.call(t).slice(8,-1).toLowerCase()}function n(r,e,i){if(i=i||0,i>10)return!1;if(r===e)return!0;if(!("object"==typeof r&&null!==r||"object"==typeof e&&null!==e))return String(r)===String(e);if("array"==t(r)&&"array"==t(e)){if(r.length!=e.length)return!1;for(var h=0,o=e.length;o>h;h++)if(!n(r[h],e[h],i+1))return!1;return!0}if("object"==t(r)&&"object"==t(e)){if(!Object.keys(r).length&&!Object.keys(e).length)return!0;var u=!1;for(var s in e)if(s in r&&(u=!0,!n(r[s],e[s],i+1)))return!1;return u}return!1}function r(n,r){r=r||0;var e=n[r||0];if(n.length==r+1&&"array"==t(e)&&e.length)return e;for(var i,h=[],o=n.length;i=o-r;)o--,i--,h[i]=n[o];return h}Array.range=function(t,n,r){void 0==n&&(n=t,t=0),r=r||1;for(var e=[],i=0;!0;i++){var h=t+i*r;if(h>=n)break;e[i]=h}return e},Object.defineProperty&&Object.defineProperty(Array.prototype,"__noforin__",{configurable:!0,enumerable:!0,get:function(){return console.warn("勿用 for...in 遍历数组"),console.trace(),"__noforin__"},set:function(){}});var e={forEach:function(t,n){for(var r=0,e=this.length;e>r&&r<this.length;r++)t.call(n,this[r],r,this)},map:function(t,n){var r=[];return this.forEach(function(e){r.push(t.apply(n,arguments))}),r},fliter:function(t,n){var r=[];return this.forEach(function(e){t.apply(n,arguments)&&r.push(e)}),r},indexOf:function(t,n){var r=n||0;r=0>r?this.length+r:r;for(var e=this.length-1,i=r;e>=i;i++)if(this[i]===t)return i;return-1},lastIndexOf:function(t,n){var r=0,e=n||this.length-1;e=0>e?this.length+e:e;for(var i=e;i>=r;i--)if(this[i]===t)return i;return-1},includes:function(t,n){return-1!=this.indexOf(t,n)}};for(var i in e)Array.prototype[i]=e[i];Object.isMatch=n;var h={each:function(t,n){return this.forEach.apply(this,arguments),this},select:function(t,r){for(var e=[],i=0,h=this.length;h>i;i++){var o=this[i];if(n(o,t)&&(e.push(o),r))break}return e},get:function(t){return this.select(t,!0)[0]||!1},getIndex:function(t){for(var r=0,e=this.length;e>r;r++){var i=this[r];if(n(i,t))return r}return-1},has:function(t){for(var n=r(arguments),e=!0,i=0;i<n.length;i++){var h=n[i];if(!this.select(h).length){e=!1;break}}return e},insert:function(t){var n=r(arguments);return console.log(n),this.push.apply(this,n),this},insertIndex:function(t,n){var e=r(arguments,1);return 0>t&&(t=this.realIndex(t)+1),this.splice.apply(this,[t,0].concat(e)),this},ensure:function(t){t=Array.isArray(t)?t:[t];for(var n=0;n<t.length;n++){var r=t[n];this.has(r)||this.push(r)}return this},update:function(r,e){if(!e){e=r;var i=!0}for(var h=0,o=this.length;o>h;h++){var u=this[h];if(i||n(u,r))if("object"==t(u)&&"object"==t(e))for(var s in e)e.hasOwnProperty(s)&&(u[s]=e[s]);else this[h]=e}return this},updateIndex:function(n,r){n=this.realIndex(n);var e=this.nth(n);if("object"==t(e)&&"object"==t(r))for(var i in r)e[i]=r[i];else this[n]=r;return this},remove:function(t){if(0==arguments.length)return this.empty();for(var e=r(arguments),i=0,h=this.length;h>i;i++)for(var o=this[i],u=0;u<e.length;u++){var s=e[u];n(o,s)&&(this.splice(i,1),i--,h--)}return this},removeIndex:function(t){return this.splice(t,1),this},empty:function(){return this.splice(0),this},orderBy:function(t,n){return this.sort(function(r,e){return r=t?r[t]:r,e=t?e[t]:e,n?e>r?1:r==e?0:-1:r>e?1:r==e?0:-1})},groupBy:function(t){for(var n={},r=0;r<this.length;r++){var e=this[r],i=e[t],h=n[i]||(n[i]=[]);h.push(e)}return n},groupCount:function(t){return Object.keys(this.groupBy(t)).length},fields:function(){for(var t={},n=0;50>n&&!(n>this.length-1);n++){var r=40>n?n:parseInt(Math.random()*(this.length-40))+40,e=this[r];for(var i in e)e.hasOwnProperty(i)&&(t[i]=1)}return Object.keys(t)},column:function(t){return this.map(function(n){return n[t]})},page:function(t,n){n=n||10;var r=(t-1)*n;0>t&&(r=t*n);var e=r+n;return-1==t&&(e=void 0),this.slice(r,e)},pageCount:function(t){return Math.ceil(this.length/(t||10))},top:function(t){return this.slice(0,t)},limit:function(t,n){return this.slice(t,t+n)},realIndex:function(t){return t>=0?t:this.length+t},nth:function(t){return t>=0?this[t]:this[this.length+t]},first:function(){return this[0]},last:function(){return this[this.length-1]},index:function(t,n){return null===t?this.insert(r(arguments,1)):null===n?this.removeIndex(t):1==arguments.length?this.nth(t):this.updateIndex(t,n)},unique:function(){for(var t=this.length,r=0;t>r;r++)for(var e=r+1;t>e;e++)n(this[r],this[e])&&(this.splice(e--,1),t--);return this},eq:function(t){return this.length==t.length&&this.has(t)&&t.has(this)},same:function(t){for(var n=[],r=0,e=this.length;e>r;r++){var i=t[r];this.has(i)&&n.push(i)}return n},xor:function(t){return this.copy().remove(t).concat(t.copy().remove(this))},max:function(t){if(arguments.length){var n=this[0];return this.each(function(r){r[t]>n[t]&&(n=r)}),n}return Math.max.apply(Math,t?this.column(t):this)},min:function(t){if(arguments.length){var n=this[0];return this.each(function(r){r[t]<n[t]&&(n=r)}),n}return Math.min.apply(Math,t?this.column(t):this)},sum:function(t){for(var n=t?this.column(t):this,r=0,e=0,i=this.length;i>e;e++){var h=n[e];isNaN(h)||(r+=+h)}return r},avg:function(t){return this.sum(t)/this.length},copy:function(t,n){return t?Object.copy(this,n):this.concat()},shuffle:function(){return this.sort(function(t,n){return Math.random()-.5})},random:function(t,n){t=t||0,n=n||this.length-1;var r=parseInt(Math.random()*(n-t+1)+t);return this[r]},toMap:function(t){for(var n={},r=0,e=this.length;e>r;r++){var i=this[r],h=i[t];n[h]=i}return n},key:function(t){var n=this[0];return n?n[t]:void 0}};h.where=h.select,h["delete"]=h.remove,h.del=h.remove,h.difference=h.remove,h.without=h.remove,h.deleteIndex=h.removeIndex,h.delIndex=h.removeIndex,h.col=h.column,h.contains=h.has,h.add=h.insert,h.union=h.ensure,h.uniq=h.unique;for(var i in h)Array.prototype[i]=h[i]}();
Date.prototype.format=function(t){t=t||"yyyy-MM-dd HH:mm:ss";var e=this,r={y:e.getFullYear(),M:e.getMonth()+1,d:e.getDate(),H:e.getHours(),h:function(){var t=e.getHours();return t>12?t-12:t}(),m:e.getMinutes(),s:e.getSeconds(),S:e.getMilliseconds()};for(var n in r)t=t.replace(RegExp(n+"+","g"),function(t){var e=r[n]+"",o=(Array(t.length).join(0)+e).slice(-t.length);return e.length>o.length?e:o});return t.replace(/E+/g,function(){return String(e).match("中国")?"星期"+"日一二三四五六".charAt(e.getDay()):"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")[e.getDay()]})},Date.prototype._toString=Date.prototype.toString,Date.prototype.toString=function(t){return t?this.format(t):this._toString()},"FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds,Time".replace(/\w+/g,function(t){Date.prototype["add"+t]=function(e){return this["set"+t](this["get"+t]()+e),this},Date.prototype[t.toLowerCase()]=function(e){return void 0===e?this["get"+t]():(this["set"+t](e),this)},Date.prototype["diff"+t]=function(e){this.getTime()-e.getTime();return this["get"+t]()-e["get"+t]()}}),Date.prototype.diff=function(t,e){var r=this,e=e||"d天HH时mm分ss秒SSS",n=r-t,o={y:31536e6,M:2592e6,d:864e5,H:36e5,h:36e5,m:6e4,s:1e3,S:1},a="yMdHhmsS".split("");if(e.match(/^[yMdHhmsS]$/))return n/o[e];for(var i={},g=n,s=0;s<a.length;s++){var u=a[s],h=o[u];if(e.match(u)){var l=parseInt(g/h);g-=l*h,i[u]=l}}var c=e;for(var u in i)c=c.replace(RegExp(u+"+","g"),function(t,e){var r=i[t.substr(0,1)]+"",n=Array(4).join("0")+r;return n=n.substr(-t.length),r=r.length>t.length?r:n});return c},Date.yesterday=function(t){return t=t||new Date,new Date(t.getFullYear(),t.getMonth(),t.getDate()-1)},Date.today=function(t){return t=t||new Date,new Date(t.getFullYear(),t.getMonth(),t.getDate())},Date.tomorrow=function(t){return t=t||new Date,new Date(t.getFullYear(),t.getMonth(),t.getDate()+1)};
String.trim=function(t){return null===t||void 0===t?"":String(t).replace(/^\s+|\s+$/g,"")},String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")},String.tpl=function(t,n){var r=t.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/(<%=|{{)([\s\S]*?)(}}|%>)/g,"$1_html_+= ($2)\n$3").replace(/(<%)(?!=)([\s\S]*?)(%>)/g,"$1\n	$2\n$3").replace(/(^|%>|%>|}})([\s\S]*?)({{|<%=|<%|$)/g,function(t,n,r,e){return'_html_+= "'+r.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r?\n/g,"\\n")+'"\n'});return r=Function("data",'with(data||{}){\nvar _html_=""\n'+r+"\nreturn _html_\n}"),n?r(n):r},String.prototype.tpl=function(t){return String.tpl(this,t)};
Number.random=function(r,t,n){var e=Math.random()*(t-r+(n?0:1))+r;return n?e:parseInt(e)},!function(){function r(r,t,n){var e=(String(r).split(".")[1]||"").length,i=(String(n).split(".")[1]||"").length,a=Math.max(e,i),u=Math.pow(10,a),c=+(String(r).replace(".","")+Array(a-e+1).join(0)),o=+(String(n).replace(".","")+Array(a-i+1).join(0));switch(t){case"+":return(c+o)/u;case"-":return(c-o)/u;case"*":return c*o/(u*u);case"/":return c/o}}var t=Number.prototype;"+-*/".replace(/./g,function(n){t[n]=function(t){return r(this,n,t)}}),t.add=t["+"],t.subtrack=t["-"],t.multiply=t["*"],t.divide=t["/"],t.fixed=function(r){return+this.toFixed(r||10)}}();
Object.getType=function(t){return Object.prototype.toString.call(t).slice(8,-1).toLowerCase()},Object.isType=function(t,n){t=t.toLowerCase(),_type=Object.getType(n);var e=t==_type;return e&&"date"==t&&(e=!isNaN(n.getTime())),e},String.toString=function(t){return t+""},Number.toNumber=function(t){var n=Number(t);return n=isNaN(n)?Number(String(t).match(/\d+/)):n,n=isNaN(n)?+t:n},Number.toInt=function(t){var n=parseInt(t);return n=isNaN(n)?+t:n,isNaN(n)?0:n},Number.isInt=function(t){return"number"==typeof t&&!String(t).match(/\.|NaN|Infinity/)},Number.isNaN=function(t){return"number"==typeof t&&isNaN(t)},Boolean.toBoolean=function(t){return"true"==t?!0:"false"==t?!1:!!t},Object.toObject=function(t){return Object(t)},Array.toArray=function(t){if(t&&"length"in t){for(var n=[],e=t.length;e--;)n[e]=t[e];return n}return[t]},Array.isArrayLike=function(t){return"length"in Object(t)},Date.toDate=function(t){return t=String(t).replace(/-/g,"/"),t=t.replace(/年|月/g,"/").replace("日"," "),new Date(t)},RegExp.toRegExp=function(t){return RegExp(t)},Function.toFunction=function(t){try{return Function(t)}catch(n){return function(){}}},!function(){Object.isNull=function(t){return Object.isType("null",t)},Object.isUndefined=function(t){return Object.isType("undefined",t)};for(var t=[String,Number,Boolean,Object,Array,Date,RegExp,Function],n=0;n<t.length;n++)!function(){var e=t[n],r=e.name;e["is"+r]||(e["is"+r]=function(t){return Object.isType(r,t)}),Object["is"+r]=e["is"+r];for(var i=0;i<t.length;i++)!function(){var n=t[i],r=(n.name,"to"+n.name);e==Object||e.prototype[r]||(e.prototype[r]=function(){return n[r](this.valueOf())})}();e!=Object&&(e.prototype.toInt=e.prototype.parseInt=function(){return Number.toInt(this)}),e!=Object&&(e.prototype.isNaN=function(){return isNaN(this)})}()}();