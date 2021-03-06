(window.MIP=window.MIP||[]).push({name:"mip-bind",func:function(){define("mip-bind/mip-deps",["require"],function(t){var e=0,i=function(){this.subs=[],this.id=e++};return i.prototype.addWatcher=function(){i.target.addWatcher(this)},i.prototype.notify=function(){this.subs.forEach(function(t){t.update()})},i.prototype.update=function(t){t&&t.update&&t.update()},i}),define("mip-bind/mip-watcher",["require","./mip-deps"],function(t){var e=t("./mip-deps"),i=function(t,e,i,n,r){if(this._data=e,this._dir=i,this._exp=n,this._node=t,this._depIds={},"function"==typeof n)this._getter=n;else{var o=this.getWithResult.bind(this,n);this._getter=o.call(this._data)}this._cb=r,this._value=this._get()};return i.prototype.getWithResult=function(t){return new Function("with(this){try {return "+t+"} catch (e) {}}")},i.prototype.update=function(){var t=this._get(),e=this._value;if(t!==e)this._value=t,this._cb.call(this._data,this._dir,t,e)},i.prototype._get=function(){var t;if(e.target=this,this._getter)t=this._getter.call(this._data,this._data);return e.target=null,t},i.prototype.addWatcher=function(t){if(!this._depIds.hasOwnProperty(t.id))t.subs.push(this),this._depIds[t.id]=t},i}),define("mip-bind/mip-compile",["require","util","./mip-watcher"],function(t){var e=t("util"),i=e.fn,n=t("./mip-watcher"),r=/^value$/,o=/^(input|textarea|select)$/i,a=/^(checked|selected|autofocus|controls|disabled|hidden|multiple|readonly)$/i,s=function(){this._el=document.documentElement};return s.prototype.start=function(t){this.data=t,this._fragment=this._cloneNode(),this._compileElement(this._fragment),this._el.appendChild(this._fragment)},s.prototype._cloneNode=function(){for(var t,e=document.createDocumentFragment();t=this._el.firstChild;)e.appendChild(t);return e},s.prototype._compileElement=function(t){var e=this,i=t.childNodes;[].slice.call(i).forEach(function(t){if(e._isElementNode(t))if(e._compileAttributes(t),t.childNodes&&t.childNodes.length)e._compileElement(t)})},s.prototype._isDirective=function(t){return 0===t.indexOf("m-")},s.prototype._isElementNode=function(t){return 1===t.nodeType},s.prototype._compileAttributes=function(t){var e=this;if(t){var i=t.attributes;[].slice.call(i).forEach(function(i){if(e._isDirective(i.name))e._compileDirective(t,i,i.value)})}},s.prototype._compileDirective=function(t,e,i){var r=this,o=e.name.slice(2),a=e.name;if(/^bind:/.test(o))o="bind";var s=r._getMVal(t,a,i);if(s)r[o]&&r[o](t,a,s);this._listenerFormElement(t,e,i),new n(t,r.data,a,i,function(e,i,n){if("function"==typeof r[o])r[o](t,e,i)})},s.prototype._listenerFormElement=function(t,e,i){if(o.test(t.tagName)){var n=e.name.split(":");if(n=n.length>1?n[1]:"","value"!==n.trim())return;var r=function(t){this.setWithResult(i,t.target.value).call(this.data)};t.addEventListener("input",r.bind(this))}},s.prototype.text=function(t,e,i){t.textContent=i?i:""},s.prototype.bind=function(t,e,n){var s=/bind:(.*)/,c=s.exec(e);if(c.length){var p=c[1];if("disabled"!==p&&t.disabled)return void i.extend(window.m,this.origin);if(""!==n?t.setAttribute(p,n):t.removeAttribute(p),o.test(t.tagName))if(a.test(p))t[p]=!!n;else if(r.test(p))t[p]=n}},s.prototype.upadteData=function(t){this.origin=t},s.prototype._getMVal=function(t,e,i){if(i){var n;try{n=this.getWithResult(i).call(this.data),t.removeAttribute(e)}catch(t){}return n}},s.prototype.getWithResult=function(t){return new Function("with(this){try {return "+t+"} catch (e) {throw e}}")},s.prototype.setWithResult=function(t,e){return new Function("with(this){try {"+t+' = "'+e+'"} catch (e) {throw e}}')},s}),define("mip-bind/mip-observer",["require","./mip-deps"],function(t){var e=t("./mip-deps"),i=function(){};return i.prototype._walk=function(t){if(t&&"object"==typeof t){var e=this;Object.keys(t).forEach(function(i){e._define(t,i,t[i])})}},i.prototype._define=function(t,i,n){if(!n.__ob__){var r=this;if(n&&"object"==typeof n)this.start(n);var o=Object.getOwnPropertyDescriptor(t,i);if(!o||!1!==o.configurable){var a=o&&o.get,s=o&&o.set,c=new e;Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:function(){if(n=a?a.call(t):n,e.target)c.addWatcher();return n},set:function(e){if(n=a?a.call(t):n,e!==n)if(n=e,s)s.call(t,e);else r._walk(e),c.notify()}}),n.__ob__=this}}},i.prototype.start=function(t){this._walk(t)},i}),define("mip-bind/mip-data",["require","util","customElement"],function(t){var e=(t("util").fn,t("customElement").create());return e.prototype.build=function(){var t=this.element.getAttribute("src"),e=this.element.querySelector('script[type="application/json"]');if(this._win=window,t)this._getData(t);else if(e){var i=e.textContent.toString(),n=this._parse(i);if(n)this._postMessage(n)}},e.prototype.prerenderAllowed=function(){return!0},e.prototype._parse=function(t){var e={};if(!t)return e;try{e=JSON.parse(t)}catch(t){console.error("Json invalid and parse failed!")}return e},e.prototype._postMessage=function(t){window.m=window.m?window.m:{};var e=this._win.location,i=e.protocol+"//"+e.host;this._win.postMessage({type:"bind",m:t},i)},e.prototype._getData=function(t){if(t){var e=this;fetch(t,{credentials:"include"}).then(function(t){if(t.ok)t.json().then(function(t){e._postMessage(t)});else console.error("Fetch rquest failed!")}).catch(function(t){console.error(t)})}},MIP.registerMipElement("mip-data",e),e}),define("mip-bind/mip-bind",["require","./mip-compile","viewer","util","./mip-observer","./mip-data"],function(t){var e=t("./mip-compile"),i=(t("viewer"),t("util")),n=i.fn,r=t("./mip-observer"),o=function(){var t=this;this._win=window,this._compile=new e,this._observer=new r,this._bindEvent(),MIP.setData=function(e,i){t._bindTarget(!1,e,i)},MIP.$set=function(e,i){t._bindTarget(!0,e,i)}};return o.prototype._bindTarget=function(t,e,i){var r=i?e.arg:e,o=i?e.event.target:{};if("string"==typeof r)r=new Function("DOM","return "+r)(o);if("object"==typeof r){var a=JSON.stringify(window.m);if(this._compile.upadteData(JSON.parse(a)),n.extend(window.m,r),t)this._observer.start(this._win.m),this._compile.start(this._win.m)}else console.error("setData method must accept an object!")},o.prototype._bindEvent=function(){var t=this;window.addEventListener("message",function(e){var i=t._win.location,n=i.protocol+"//"+i.host;if(e.origin===n&&e.source&&e.data&&"bind"===e.data.type&&e.source===t._win)MIP.$set(e.data.m)})},o.prototype.start=function(){t("./mip-data"),this._dataSource={m:window.m?window.m:{}},MIP.$set(this._dataSource.m)},o.prototype._proxy=function(){var t=this;Object.keys(this._dataSource).forEach(function(e){t._proxyData(e)})},o.prototype._proxyData=function(t){var e=this;Object.defineProperty(this._win,t,{configurable:!1,enumerable:!0,get:function(){return e._dataSource[t]},set:function(i){e._dataSource[t]=i}})},(new o).start()}),define("mip-bind",["mip-bind/mip-bind"],function(t){return t}),function(){function t(t,e){t.registerMipElement("mip-bind",e,"mip-data{display:hidden}")}if(window.MIP)require(["mip-bind"],function(e){t(window.MIP,e)});else require(["mip","mip-bind"],t)}()}});
