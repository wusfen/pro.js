/**
 * https://github.com/wusfen/proto.js
 *
 * proto.js 是一个js增强库，提供许多实用的链式方法，使数据操作更加方便
 * 
 * @author
 * wushufen: 404315887@qq.com
 */

!function(t,n,e,r,o,i,u,a,c){r.getType=function(t){return r.prototype.toString.call(t).slice(8,-1).toLowerCase()},r.isType=function(t,n){t=t.toLowerCase(),_type=r.getType(n);var e=t==_type;return e&&"date"==t&&(e=!isNaN(n.getTime())),e},t.toString=function(t){return t+""},n.toNumber=function(e){var r=n(e);return r=isNaN(r)?n(t(e).match(/\d+/)):r,r=isNaN(r)?+e:r},n.toInt=function(t){var n=parseInt(t);return n=isNaN(n)?+t:n,isNaN(n)?0:n},n.isInt=function(n){return"number"==typeof n&&!t(n).match(/\.|NaN|Infinity/)},n.isNaN=function(t){return"number"==typeof t&&isNaN(t)},e.toBoolean=function(t){return"true"==t?!0:"false"==t?!1:!!t},r.toObject=function(t){return r(t)},o.toArray=function(t){if(t&&"length"in t){for(var n=[],e=t.length;e--;)n[e]=t[e];return n}return[t]},o.isArrayLike=function(t){return"length"in r(t)},i.toDate=function(n){return n=t(n).replace(/-/g,"/"),n=n.replace(/年|月/g,"/").replace("日"," "),new i(n)},u.toRegExp=function(t){return u(t)},a.toFunction=function(t){try{return a(t)}catch(n){return function(){}}},r.isNull=function(t){return r.isType("null",t)},r.isUndefined=function(t){return r.isType("undefined",t)};for(var f=[t,n,e,r,o,i,u,a],s=0;s<f.length;s++)!function(){var t=f[s],e=t.name;t["is"+e]||(t["is"+e]=function(t){return r.isType(e,t)}),r["is"+e]=t["is"+e];for(var o=0;o<f.length;o++)!function(){var n=f[o],e=(n.name,"to"+n.name);t==r||t.prototype[e]||(t.prototype[e]=function(){return n[e](this.valueOf())})}();t!=r&&(t.prototype.toInt=t.prototype.parseInt=function(){return n.toInt(this)}),t!=r&&(t.prototype.isNaN=function(){return isNaN(this)})}()}(String,Number,Boolean,Object,Array,Date,RegExp,Function);
!function(n,t){n.trim=function(t){return null===t||void 0===t?"":n(t).replace(/^\s+|\s+$/g,"")},t.trim=function(){return this.replace(/^\s+|\s+$/g,"")},n.tpl=function(n,t){var r=n.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/(<%=|{{)([\s\S]*?)(}}|%>)/g,"$1_html_+= ($2)\n$3").replace(/(<%)(?!=)([\s\S]*?)(%>)/g,"$1\n	$2\n$3").replace(/(^|%>|%>|}})([\s\S]*?)({{|<%=|<%|$)/g,function(n,t,r,e){return'_html_+= "'+r.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r?\n/g,"\\n")+'"\n'});return r=Function("data",'with(data||{}){\nvar _html_=""\n'+r+"\nreturn _html_\n}"),t?r(t):r},t.tpl=function(t){return n.tpl(this,t)}}(String,String.prototype);
!function(r,t){function n(r,t,n){var e=(String(r).split(".")[1]||"").length,i=(String(n).split(".")[1]||"").length,a=Math.max(e,i),u=Math.pow(10,a),c=+(String(r).replace(".","")+Array(a-e+1).join(0)),o=+(String(n).replace(".","")+Array(a-i+1).join(0));switch(t){case"+":return(c+o)/u;case"-":return(c-o)/u;case"*":return c*o/(u*u);case"/":return c/o}}"+-*/".replace(/./g,function(r){t[r]=function(t){return n(this,r,t)}}),t.add=t["+"],t.subtrack=t["-"],t.multiply=t["*"],t.divide=t["/"],t.fixed=function(r){return+this.toFixed(r||10)},r.random=function(r,t,n){var e=Math.random()*(t-r+(n?0:1))+r;return n?e:parseInt(e)}}(Number,Number.prototype);
!function(r,n){r.assign=r.assign||function(r,n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)e.hasOwnProperty(o)&&(r[o]=e[o])}return r},r.keys=r.keys||function(r){var n=[];for(var t in r)r.hasOwnProperty(t)&&n.push(t);return n},r.values=function(r){var n=[];for(var t in r)r.hasOwnProperty(t)&&n.push(r[t]);return n},r.isEmpty=function(n){return n&&"object"==typeof n?!r.keys(n).length:!n},r.copy=function(n,t,e){if(t=t||10,e=e||0,e>t)return"...";var o=r.getType(n);if("object"!=o&&"array"!=o)return n;if("array"==o){for(var a=[],f=0,i=n.length;i>f;f++)a[f]=r.copy(n[f],t,e+1);return a}if("object"==o){var u={};for(var y in n)u[y]=r.copy(n[y],t,e+1);return u}}}(Object,Object.prototype);
!function(t,e){function n(t){return 10>t?"0"+t:t}e.format=function(t){t=t||"yyyy-MM-dd HH:mm:ss";var e=this,n={y:e.getFullYear(),M:e.getMonth()+1,d:e.getDate(),H:e.getHours(),h:function(){var t=e.getHours();return t>12?t-12:t}(),m:e.getMinutes(),s:e.getSeconds(),S:e.getMilliseconds()};for(var r in n)t=t.replace(RegExp(r+"+","g"),function(t){var e=n[r]+"",i=(Array(t.length).join(0)+e).slice(-t.length);return e.length>i.length?e:i});return t.replace(/E+/g,function(){return String(e).match("中国")?"星期"+"日一二三四五六".charAt(e.getDay()):"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")[e.getDay()]})},e._toString=e.toString,e.toString=function(t){return t?this.format(t):this._toString()},e.toISOString=e.toISOString||function(){return this.getUTCFullYear()+"-"+n(this.getUTCMonth()+1)+"-"+n(this.getUTCDate())+"T"+n(this.getUTCHours())+":"+n(this.getUTCMinutes())+":"+n(this.getUTCSeconds())+"."+(this.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z"},"FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds,Time".replace(/\w+/g,function(t){e["add"+t]=function(e){return this["set"+t](this["get"+t]()+e),this},e[t.toLowerCase()]=function(e){return void 0===e?this["get"+t]():(this["set"+t](e),this)},e["diff"+t]=function(e){this.getTime()-e.getTime();return this["get"+t]()-e["get"+t]()}}),e.diff=function(t,e){var n=this,e=e||"d天HH时mm分ss秒SSS",r=n-t,i={y:31536e6,M:2592e6,d:864e5,H:36e5,h:36e5,m:6e4,s:1e3,S:1},o="yMdHhmsS".split("");if(e.match(/^[yMdHhmsS]$/))return r/i[e];for(var s={},g=r,u=0;u<o.length;u++){var a=o[u],h=i[a];if(e.match(a)){var l=parseInt(g/h);g-=l*h,s[a]=l}}var c=e;for(var a in s)c=c.replace(RegExp(a+"+","g"),function(t,e){var n=s[t.substr(0,1)]+"",r=Array(4).join("0")+n;return r=r.substr(-t.length),n=n.length>t.length?n:r});return c},t.yesterday=function(e){return e=e||new t,new t(e.getFullYear(),e.getMonth(),e.getDate()-1)},t.today=function(e){return e=e||new t,new t(e.getFullYear(),e.getMonth(),e.getDate())},t.tomorrow=function(e){return e=e||new t,new t(e.getFullYear(),e.getMonth(),e.getDate()+1)}}(Date,Date.prototype);
!function(t,n){function r(t){return Object.prototype.toString.call(t).slice(8,-1).toLowerCase()}function e(t,n,i){if(i=i||0,i>10)return!1;if(t===n)return!0;if(!("object"==typeof t&&null!==t||"object"==typeof n&&null!==n))return String(t)===String(n);if("array"==r(t)&&"array"==r(n)){if(t.length!=n.length)return!1;for(var h=0,o=n.length;o>h;h++)if(!e(t[h],n[h],i+1))return!1;return!0}if("object"==r(t)&&"object"==r(n)){if(!Object.keys(t).length&&!Object.keys(n).length)return!0;var u=!1;for(var s in n)if(s in t&&(u=!0,!e(t[s],n[s],i+1)))return!1;return u}return!1}function i(t,n){n=n||0;var e=t[n||0];if(t.length==n+1&&"array"==r(e)&&e.length)return e;for(var i,h=[],o=t.length;i=o-n;)o--,i--,h[i]=t[o];return h}t.range=function(t,n,r){void 0==n&&(n=t,t=0),r=r||1;for(var e=[],i=0;!0;i++){var h=t+i*r;if(h>=n)break;e[i]=h}return e},Object.defineProperty&&Object.defineProperty(t.prototype,"__noforin__",{configurable:!0,enumerable:!0,get:function(){return console.warn("勿用 for...in 遍历数组"),console.trace(),"__noforin__"},set:function(){}});var h={forEach:function(t,n){for(var r=0,e=this.length;e>r&&r<this.length;r++)t.call(n,this[r],r,this)},map:function(t,n){var r=[];return this.forEach(function(e){r.push(t.apply(n,arguments))}),r},fliter:function(t,n){var r=[];return this.forEach(function(e){t.apply(n,arguments)&&r.push(e)}),r},indexOf:function(t,n){var r=n||0;r=0>r?this.length+r:r;for(var e=this.length-1,i=r;e>=i;i++)if(this[i]===t)return i;return-1},lastIndexOf:function(t,n){var r=0,e=n||this.length-1;e=0>e?this.length+e:e;for(var i=e;i>=r;i--)if(this[i]===t)return i;return-1},includes:function(t,n){return-1!=this.indexOf(t,n)}};for(var o in h)n[o]=h[o];Object.isMatch=e;var u={each:function(t,n){return this.forEach.apply(this,arguments),this},select:function(t,n){for(var r=[],i=0,h=this.length;h>i;i++){var o=this[i];if(e(o,t)&&(r.push(o),n))break}return r},get:function(t){return this.select(t,!0)[0]||!1},getIndex:function(t){for(var n=0,r=this.length;r>n;n++){var i=this[n];if(e(i,t))return n}return-1},has:function(t){for(var n=i(arguments),r=!0,e=0;e<n.length;e++){var h=n[e];if(!this.select(h).length){r=!1;break}}return r},insert:function(t){var n=i(arguments);return this.push.apply(this,n),this},insertIndex:function(t,n){var r=i(arguments,1);return 0>t&&(t=this.realIndex(t)+1),this.splice.apply(this,[t,0].concat(r)),this},ensure:function(n){n=t.isArray(n)?n:[n];for(var r=0;r<n.length;r++){var e=n[r];this.has(e)||this.push(e)}return this},update:function(t,n){if(!n){n=t;var i=!0}for(var h=0,o=this.length;o>h;h++){var u=this[h];if(i||e(u,t))if("object"==r(u)&&"object"==r(n))for(var s in n)n.hasOwnProperty(s)&&(u[s]=n[s]);else this[h]=n}return this},updateIndex:function(t,n){t=this.realIndex(t);var e=this.nth(t);if("object"==r(e)&&"object"==r(n))for(var i in n)e[i]=n[i];else this[t]=n;return this},remove:function(t){if(0==arguments.length)return this.empty();for(var n=i(arguments),r=0,h=this.length;h>r;r++)for(var o=this[r],u=0;u<n.length;u++){var s=n[u];e(o,s)&&(this.splice(r,1),r--,h--)}return this},removeIndex:function(t){return this.splice(t,1),this},empty:function(){return this.splice(0),this},orderBy:function(t,n){return this.sort(function(r,e){return r=t?r[t]:r,e=t?e[t]:e,n?e>r?1:r==e?0:-1:r>e?1:r==e?0:-1})},groupBy:function(t){for(var n={},r=0;r<this.length;r++){var e=this[r],i=e[t],h=n[i]||(n[i]=[]);h.push(e)}return n},groupCount:function(t){return Object.keys(this.groupBy(t)).length},fields:function(){for(var t={},n=0;50>n&&!(n>this.length-1);n++){var r=40>n?n:parseInt(Math.random()*(this.length-40))+40,e=this[r];for(var i in e)e.hasOwnProperty(i)&&(t[i]=1)}return Object.keys(t)},column:function(t){return this.map(function(n){return n[t]})},page:function(t,n){n=n||10;var r=(t-1)*n;0>t&&(r=t*n);var e=r+n;return-1==t&&(e=void 0),this.slice(r,e)},pageCount:function(t){return Math.ceil(this.length/(t||10))},top:function(t){return this.slice(0,t)},limit:function(t,n){return this.slice(t,t+n)},realIndex:function(t){return t>=0?t:this.length+t},nth:function(t){return t>=0?this[t]:this[this.length+t]},first:function(){return this[0]},last:function(){return this[this.length-1]},index:function(t,n){return null===t?this.insert(i(arguments,1)):null===n?this.removeIndex(t):1==arguments.length?this.nth(t):this.updateIndex(t,n)},unique:function(){for(var t=this.length,n=0;t>n;n++)for(var r=n+1;t>r;r++)e(this[n],this[r])&&(this.splice(r--,1),t--);return this},eq:function(t){return this.length==t.length&&this.has(t)&&t.has(this)},same:function(t){for(var n=[],r=0,e=this.length;e>r;r++){var i=t[r];this.has(i)&&n.push(i)}return n},xor:function(t){return this.copy().remove(t).concat(t.copy().remove(this))},max:function(t){if(arguments.length){var n=this[0];return this.each(function(r){r[t]>n[t]&&(n=r)}),n}return Math.max.apply(Math,t?this.column(t):this)},min:function(t){if(arguments.length){var n=this[0];return this.each(function(r){r[t]<n[t]&&(n=r)}),n}return Math.min.apply(Math,t?this.column(t):this)},sum:function(t){for(var n=t?this.column(t):this,r=0,e=0,i=this.length;i>e;e++){var h=n[e];isNaN(h)||(r+=+h)}return r},avg:function(t){return this.sum(t)/this.length},copy:function(t,n){return t?Object.copy(this,n):this.concat()},shuffle:function(){return this.sort(function(t,n){return Math.random()-.5})},random:function(t,n){t=t||0,n=n||this.length-1;var r=parseInt(Math.random()*(n-t+1)+t);return this[r]},toMap:function(t){for(var n={},r=0,e=this.length;e>r;r++){var i=this[r],h=i[t];n[h]=i}return n},key:function(t){var n=this[0];return n?n[t]:void 0}};u.where=u.select,u["delete"]=u.remove,u.del=u.remove,u.difference=u.remove,u.without=u.remove,u.deleteIndex=u.removeIndex,u.delIndex=u.removeIndex,u.col=u.column,u.contains=u.has,u.add=u.insert,u.union=u.ensure,u.uniq=u.unique;for(var o in u)n[o]=u[o]}(Array,Array.prototype);
!function(n,t){t.bind=t.bind||function(n){var t=this;return function(){t.apply(n||this,arguments)}},t.once=function(){var n=this,t=!1;return function(){t||(t=!0,n.apply(this,arguments))}},t.delay=function(n){var t=this;return function(){setTimeout(function(){t.apply(this,arguments)},n)}},t.debounce=function(n){}}(Function,Function.prototype);
!function(r){r.JSON=r.JSON||{parse:function(n){return r.eval("("+n+")")},stringify:function(r){return function n(r){var t=Object.getType(r);if("null"==t||"number"==t||"boolean"==t)return String(r);if("string"==t)return'"'+r+'"';if("regexp"==t)return"{}";if("date"==t)return'"'+r.toISOString()+'"';if("array"==t){for(var e=[],i=0;i<r.length;i++)e.push(n(r[i]));return"["+e.join(",")+"]"}if("object"==t){var e=[];for(var u in r){var f=n(r[u]);f&&e.push('"'+u+'":'+f)}return"{"+e.join(",")+"}"}}(r)}}}(Function("return this")());
!function(){function n(n){return"true"==n?!0:"false"==n?!1:"null"==n?null:"undefined"==n?void 0:isNaN(+n)?n:+n}function i(){for(var i=location.href,o=i.match(RegExp("(\\?|&)(.*?)=(.*?)(?=&|$)","g"))||[],t=0;t<o.length;t++){var a=o[t].slice(1).split("="),l=a[0],f=n(a[1]);e[l]=f}}if("undefined"!=typeof location){var e={};i(),location.params=e}}();