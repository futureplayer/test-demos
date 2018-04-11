(window.MIP=window.MIP||[]).push({name:"mip-story",func:function(){define("mip-story/audio",["require","util"],function(t){"use strict";function e(){}var i=t("util");return e.prototype.build=function(t,e){if(e){var o=document.createElement("audio");return o.setAttribute("src",e),o.setAttribute("preload","auto"),o.setAttribute("loop",""),o.setAttribute("autoplay",""),i.css(o,{display:"hidden"}),t.appendChild(o),o}},e}),define("mip-story/mip-story-view",["require","customElement","./audio"],function(t){"use strict";var e=t("customElement").create(),i=t("./audio"),o="background-audio";return e.prototype.resumeAllMedia=function(t){var e=this;e.whenAllMediaElements(function(i){if("audio"===i.tagName.toLowerCase()&&t)!e.muted?i.load():i.load()&&i.pause();else!e.muted&&i.play()})},e.prototype.pauseAllMedia=function(){this.whenAllMediaElements(function(t){t.pause()})},e.prototype.muteAllMedia=function(){this.whenAllMediaElements(function(t){t.muted=!0,t.pause()})},e.prototype.toggleAllMedia=function(t,e){if(this.muted=e,t.target.hasAttribute("muted"))!this.muted&&this.resumeAllMedia(),!this.muted&&this.unMuteAllMedia();else this.muteAllMedia()},e.prototype.unMuteAllMedia=function(){this.whenAllMediaElements(function(t){t.muted=!1,t.play()})},e.prototype.getAllMedia=function(){return this.element.querySelectorAll("audio, video")},e.prototype.whenAllMediaElements=function(t){var e=this.getAllMedia();Array.prototype.map.call(e,function(e){return t(e)})},e.prototype.setActive=function(t,e,i){if(this.muted=e,t)this.element.setAttribute("active",""),this.resumeAllMedia(i),this.muted?this.muteAllMedia():this.unMuteAllMedia();else this.element.removeAttribute("active"),this.pauseAllMedia()},e.prototype.initView=function(){if(this.audio=new i,!this.element.parentNode.hasAttribute(o)){var t=this.element.getAttribute(o);this.audio.build(this.element,t)}},e.prototype.firstInviewCallback=function(){this.initView(),this.pauseAllMedia()},MIP.registerMipElement("mip-story-view",e),e}),define("mip-story/mip-story-layer",["require","customElement"],function(t){"use strict";var e=t("customElement").create();return e.prototype.firstInviewCallback=function(){},MIP.registerMipElement("mip-story-layer",e),e}),define("mip-story/mip-story-share",["require","util"],function(t){"use strict";function e(){}var i=t("util"),o="mip-story-share-show";return e.prototype.build=function(){var t=encodeURIComponent(JSON.stringify({type:"click",data:["_trackEvent","小故事分享取消","点击",window.location.href]}));return'<aside class="mip-story-share"><div class="mip-share-container"><mip-share url="'+i.parseCacheUrl(location.href)+'"></mip-share></div><span class="mip-story-share-cancel" data-stats-baidu-obj="'+t+'">取消</span></aside>'},e.prototype.showShareLayer=function(){document.querySelector(".mip-story-share").classList.add(o)},e.prototype.hideShareLayer=function(){document.querySelector(".mip-story-share").classList.remove(o)},e}),define("mip-story/mip-story-hint",["require","util"],function(t){"use strict";function e(){}var i="mip-story-hint-damping-hide",o="mip-story-system-show",r=".mip-story-hint",s="mip-story-page-switch-lt",n="mip-story-page-switch-rt",a=t("util");return e.prototype.build=function(){return'<aside class="mip-story-hint mip-story-hint-damping-hide"><div class="mip-story-hint-shadow"></div><div class="mip-story-hint-system"><div class="mip-story-hint-left"></div><div class="mip-story-hint-middle"><span class="mip-story-hint-middle-top"></span><span class="mip-story-hint-middle-icon"><span class="mip-story-hint-touch-icon"></span><span>点击屏幕左右区域</span><span>切换内容</span></span><span class="mip-story-hint-middle-bottom"></span></div><div class="mip-story-hint-right"></div></div><div class="mip-story-hint-rotate"><mip-img src="https://www.mipengine.org/static/img/mip-story/mip-story-rotate.png"></mip-img><p>为了更好的体验，请将手机横过来</p></div><div class="mip-story-page-switch"><span class="mip-story-page-switch-left"><span></span><span></span></span><span class="mip-story-page-switch-right"><span></span><span></span></span></div></aside>'},e.prototype.showDamping=function(){var t=this,e=document.querySelector(r);a.css(e,{display:"block"}),e.classList.remove(i),setTimeout(function(){t.hideDamping()},250)},e.prototype.hideDamping=function(){var t=document.querySelector(r);a.css(t,{display:"none"}),t.classList.add(i)},e.prototype.showSystemLater=function(){if(!localStorage.getItem("has-show-mip-story-hint")){var t=document.querySelector(r);a.css(t,{display:"block"}),t.classList.add(o),localStorage.setItem("has-show-mip-story-hint","1")}},e.prototype.hideSystemLater=function(){var t=document.querySelector(r);a.css(t,{display:"none"}),t.classList.remove(o)},e.prototype.toggleSystemLater=function(){if("block"===document.querySelector(r).style.display)this.hideSystemLater();else this.showSystemLater()},e.prototype.showPageSwitchLayer=function(){var t=document.querySelector(r);t.classList.add(n),setTimeout(function(){t.classList.remove(n)},400)},e.prototype.hidePageSwitchLayer=function(){var t=document.querySelector(r);t.classList.add(s),setTimeout(function(){t.classList.remove(s)},400)},e}),define("mip-story/mip-story-bookend",["require","util","viewer"],function(t){"use strict";function e(){}var i=t("util"),o=t("viewer"),r=i.platform,s=i.naboo;return e.prototype.getData=function(){var t=document.querySelector('mip-story > script[type="application/json"]');return JSON.parse(t.innerText)},e.prototype.build=function(){var t=this.getData(),e=encodeURIComponent(JSON.stringify({type:"click",data:["_trackEvent","小故事重播","点击",window.location.href]})),i=encodeURIComponent(JSON.stringify({type:"click",data:["_trackEvent","小故事分享","点击",window.location.href]})),o=t.share,r=t.recommend,s=r&&r.items?r.items:[],n="";if(s&&s.length){for(var a="",p=0;p<s.length;p++){var l=s[p];a+='<div data-item><a href="'+l.url+'" class="recommend-item" style="background-image:url('+(l.cover||"")+');background-size:cover;background-repeat:no-repeat;"><span>'+(l.title||"")+'</span><span class="item-from" data-src="'+l.fromUrl+'">'+(l.from||"")+"</span></a></div>"}n='<div class="recommend"><a href="'+r.url+'">更多小故事</a><mip-scrollbox><div data-wrapper><div data-inner><div data-scroller>'+a+"</div></div></div></mip-scrollbox></div>"}var m=this.showShareBtn()?'<span class="mip-backend-share" data-stats-baidu-obj="'+i+'"><span class="mip-backend-preview-share-btn"></span><span class="mip-backend-share-btn">分享</span></span>':"",c=history.length>1?'<span class="mip-story-close mip-backend-close"></span>':"",d=n?"":"mip-story-middle";return'<aside class="mip-backend" style="background-image: url('+o.background+')">'+c+'<div class="mip-backend-outer '+d+'"><div class="mip-backend-preview" style="background-position:center;background-size:cover;background-image:url('+o.thumbnail+')" data-stats-baidu-obj="'+e+'"><div class="mip-backend-preview-mask"></div><div class="mip-backend-preview-thumbnail"><span class="mip-backend-preview-replay-btn"></span><span>重播</span></div></div><span class="mip-backend-description">'+o.title+'</span><span class="mip-backend-info"><a href="'+o.fromUrl+'">'+o.from+"</a></span>"+m+n+"</div></aside>"},e.prototype.showShareBtn=function(){if(!o.isIframed&&r.isBaiduApp())return!1;else return!0},e.prototype.show=function(){var t=document.querySelector(".mip-backend");s.animate(t,{transform:"translateY(0)"}).start()},e.prototype.hide=function(){var t=document.querySelector(".mip-backend");s.animate(t,{transform:"translateY(1000%)"}).start()},e}),define("mip-story/mip-progress",["require"],function(t){"use strict";function e(t,e){this.root=t,this.elements=e,this.win=window,this.items={},this.oldEle}var i="mip-story-page-progress-bar-active",o="mip-story-page-progress-bar-visited";return e.prototype.build=function(){var t=encodeURIComponent(JSON.stringify({type:"click",data:["_trackEvent","小故事关闭按钮","点击",window.location.href]})),e='<aside class="mip-story-system-layer">';if(history.length>1)e+='<span class="mip-story-close" data-stats-baidu-obj="'+t+'"></span>';e+='<ol class="mip-story-progress-bar">';for(var i=0;i<this.elements.length;i++)e+='<li class="mip-story-page-progress-bar"><div class="mip-story-page-progress-value"></div></li>';e+="</ol>";var o=encodeURIComponent(JSON.stringify({type:"click",data:["_trackEvent","音频静音按钮","点击",window.location.href]}));return e+=this.showAudio()?'<span class="mip-stoy-audio" data-stats-baidu-obj="'+o+'"></span></aside>':""},e.prototype.showAudio=function(){return!!this.root.querySelectorAll("audio, video").length},e.prototype.updateProgress=function(t,e){var r=this.root.querySelectorAll(".mip-story-progress-bar .mip-story-page-progress-value"),s=r[t];if(s.classList.add(i),this.oldEle&&this.oldEle!==s&&this.oldEle.classList.remove(i),e){this.oldEle&&this.oldEle!==s&&this.oldEle.classList.add(o);for(var n=t;n<r.length;n++)r[n].classList.remove(o)}else this.oldEle&&this.oldEle!==s&&this.oldEle.classList.remove(o);this.oldEle=s},e}),define("mip-story/mip-story",["require","./mip-story-view","./mip-story-layer","./audio","./mip-story-share","./mip-story-hint","./mip-story-bookend","customElement","util","./mip-progress"],function(t){"use strict";function e(t){this.element=t,this.win=window,this.currentIndex=this.preInex=0}var i="mute",o="swip",r="unmute",s="replay",n="switchpage",a="showbookend",p="closebookend",l="tapnavigation",m="shownopreviouspagehelp",c="visibilitychange",d="mip-i-story-standalone";t("./mip-story-view"),t("./mip-story-layer");var h=t("./audio"),u=t("./mip-story-share"),y=t("./mip-story-hint"),g=t("./mip-story-bookend"),f=t("customElement").create(),b=t("util"),w=b.dom,v=b.EventEmitter,k=b.Gesture,x=t("./mip-progress"),A=[];return e.prototype.init=function(){this.win.document.documentElement.setAttribute("id",d),this.initStoryViews(),this.initAudio(),this.initProgress(),this.initBookend(),this.initHintLayer(),this.initShare(),this.initEvent(),this.switchTo({status:1,notIncrease:1})},e.prototype.initAudio=function(){var t=this.element.getAttribute("background-audio");if(t)this.audio=(new h).build(this.element,t);this.muted=!1,this.viewMuted=!(!this.muted&&!this.audio)},e.prototype.initShare=function(){this.share=new u;var t=w.create(this.share.build());this.element.appendChild(t)},e.prototype.initHintLayer=function(){this.hint=new y;var t=w.create(this.hint.build());this.element.appendChild(t)},e.prototype.initEvent=function(){var t=this,e=new k(this.element,{preventX:!1});this.element.addEventListener("click",function(e){t.emitter.trigger(l,e)}),document.addEventListener(c,function(e){t.emitter.trigger(c,e)}),e.on("swipe",function(e,i){t.emitter.trigger(o,{e:e,data:i})}),t.bindEvent()},e.prototype.visibilitychange=function(t){var e="hidden"in document?"hidden":"webkitHidden"in document?"webkitHidden":"mozHidden"in document?"mozHidden":null,i=A[this.currentIndex];if(document[e])this.pauseGlobalAudio(),i.customElement.pauseAllMedia();else this.playGlobalAudio(),i.customElement.resumeAllMedia()},e.prototype.initBookend=function(){this.bookEnd=new g;var t=w.create(this.bookEnd.build());this.element.appendChild(t)},e.prototype.initProgress=function(){if(!this.progress){this.progress=new x(this.element,A);var t=w.create(this.progress.build());this.element.appendChild(t),this.progress.updateProgress(0,1)}},e.prototype.initStoryViews=function(){A=this.element.querySelectorAll("mip-story-view")},e.prototype.bindEvent=function(){this.emitter=new v,this.emitter.on(i,this.mute.bind(this)),this.emitter.on(o,this.swip.bind(this)),this.emitter.on(r,this.unmute.bind(this)),this.emitter.on(s,this.replay.bind(this)),this.emitter.on(l,this.tapnavigation.bind(this)),this.emitter.on(n,this.switchTo.bind(this)),this.emitter.on(a,this.showbookend.bind(this)),this.emitter.on(p,this.closebookend.bind(this)),this.emitter.on(c,this.visibilitychange.bind(this)),this.emitter.on(m,this.shownopreviouspagehelp.bind(this))},e.prototype.swip=function(t){if("left"===t.data.swipeDirection||"right"===t.data.swipeDirection){var e=document.querySelector(".mip-backend");if(w.contains(e,t.target))return;this.hint.toggleSystemLater()}},e.prototype.tapnavigation=function(t){t.stopPropagation();var e=document.querySelector(".mip-backend"),o=document.querySelector(".mip-backend-preview"),a=document.querySelector(".mip-backend-share"),l=document.querySelector(".mip-story-share"),m=document.querySelector(".mip-story-share-cancel"),c=document.querySelector(".mip-stoy-audio"),d=document.querySelector(".recommend");if(!w.contains(d,t.target)){if(this.hasClass(t,"mip-story-close"))return void history.back();if(t.target===c)return void(c.hasAttribute("muted")?this.emitter.trigger(r,t):this.emitter.trigger(i,t));if(w.contains(o,t.target))return void this.emitter.trigger(s);else if(w.contains(e,t.target)){if(w.contains(a,t.target))this.share.showShareLayer();else this.emitter.trigger(p);return}else if(w.contains(l,t.target)){if(t.target===m)this.share.hideShareLayer();return}var h=(this.element.offsetLeft+this.element.offsetWidth)/2;if(t.pageX>h)this.emitter.trigger(n,{e:t,status:1});else this.emitter.trigger(n,{e:t,status:0});if(!this.hasPlay&&!this.muted)this.emitter.trigger(r,t),this.hasPlay=!0}else{var u=document.querySelector(".item-from"),y=t.target.getAttribute("data-src");if(u===t.target&&y)t.preventDefault(),location.href=y}},e.prototype.hasClass=function(t,e){return!!new RegExp("\\s*"+e+"\\s*").exec(t.target.className)},e.prototype.setActive=function(t){for(var e=0;e<A.length;e++)if(e===this.currentIndex)A[e].setAttribute("active","");else A[e].removeAttribute("active")},e.prototype.switchTo=function(t){if(this.hint.hideDamping(),this.hint.hideSystemLater(),0===t.status&&this.currentIndex<=0)return void this.emitter.trigger(m);else if(!t.notIncrease&&1===t.status&&this.currentIndex+1>=A.length)return void this.emitter.trigger(a);if(!t.notIncrease)1===t.status?this.currentIndex++:this.currentIndex--;var e=A[this.currentIndex],i=A[this.preInex],o=this.element.hasAttribute("audio-reload");if(this.currentIndex!==this.preInex)i.customElement.setActive(!1,this.viewMuted,o);if(e.customElement.setActive(!0,this.viewMuted,o),this.progress.updateProgress(this.currentIndex,t.status),this.preInex=this.currentIndex,!t.notIncrease)if(1===t.status)this.hint.showPageSwitchLayer();else this.hint.hidePageSwitchLayer()},e.prototype.showbookend=function(){this.bookEnd.show()},e.prototype.closebookend=function(){this.bookEnd.hide(),this.share.hideShareLayer()},e.prototype.muteGlobalAudio=function(){if(this.audio)this.audio.pause(),this.audio.muted=!0},e.prototype.unMuteGlobalAudio=function(){if(this.audio)this.audio.play(),this.audio.muted=!1},e.prototype.playGlobalAudio=function(){if(this.audio&&!this.muted)this.audio.play()},e.prototype.pauseGlobalAudio=function(){if(this.audio)this.audio.pause()},e.prototype.mute=function(t){this.muted=!0,this.viewMuted=!0,this.muteGlobalAudio(),A[this.currentIndex].customElement.toggleAllMedia(t,this.viewMuted),t.target.setAttribute("muted","")},e.prototype.unmute=function(t){this.muted=!1,this.viewMuted=!1,this.unMuteGlobalAudio(),this.playGlobalAudio(),A[this.currentIndex].customElement.toggleAllMedia(t,this.viewMuted),t.target.removeAttribute("muted")},e.prototype.replay=function(){this.currentIndex=0,this.preInex=A.length-1,this.switchTo({status:1,notIncrease:1}),this.emitter.trigger(p)},e.prototype.shownopreviouspagehelp=function(){this.hint.showDamping()},f.prototype.firstInviewCallback=function(){new e(this.element).init()},f}),define("mip-story",["mip-story/mip-story"],function(t){return t}),function(){function t(t,e){t.registerMipElement("mip-story",e,"html#mip-i-story-standalone,html#mip-i-story-standalone body{height:100% !important;margin:0 !important;padding:0 !important;width:100% !important;cursor:auto !important}mip-story{background:#000;position:relative !important;height:100% !important;width:100% !important;-webkit-tap-highlight-color:transparent;tap-highlight-color:transparent}mip-story,mip-story-view,mip-story-layer{overflow:hidden !important}mip-story-view{display:none !important;bottom:0 !important;height:auto !important;left:0 !important;position:absolute !important;right:0 !important;top:0 !important;transition:none !important}mip-story-view[active]{display:block !important}mip-story-layer{position:absolute !important;bottom:0 !important;left:0 !important;right:0 !important;top:0 !important;padding:68px 32px 32px !important;overflow:hidden !important}mip-story-layer *{box-sizing:border-box;margin:0}.mip-story-system-layer{background:-webkit-linear-gradient(top, #000, transparent);background:linear-gradient(top, #000, transparent);position:absolute;top:0;left:0;right:0;z-index:100000;padding:12px 0 72px 0}.mip-story-progress{overflow:hidden}.mip-story-close{opacity:1;display:block;float:left;height:40px;width:40px;margin-left:7px;background:url(https://www.mipengine.org/static/img/mip-story/mip-story-close.png);background-size:16px 16px;background-position:center;background-repeat:no-repeat}.mip-story-close:active{opacity:.6}.mip-stoy-audio{height:16px;height:40px;width:40px;top:0;background:url(https://www.mipengine.org/static/img/mip-story/mip-story-unmute.png);background-size:cover;float:right;margin-right:7px;background-size:17px 17px;background-position:center;background-repeat:no-repeat}.mip-stoy-audio[muted]{background:url(https://www.mipengine.org/static/img/mip-story/mip-story-mute.png);background-size:17px 17px;background-position:center;background-repeat:no-repeat}.mip-story-progress-bar{display:flex !important;display:-webkit-flex !important;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;-moz-box-align:center;-moz-box-pack:center;height:40px;align-items:center !important;-webkit-align-items:center !important;justify-content:center !important;-webkit-justify-content:center !important;position:absolute;left:59px;right:59px}.mip-story-progress-bar>:last-child{margin-right:0 !important}.mip-story-page-progress-bar{background:rgba(255,255,255,0.3);list-style-type:none;margin:0 6px 0 0;overflow:hidden;flex:1 !important;-webkit-flex:1 !important;-webkit-box-flex:1;-moz-box-flex:1;height:2px;border-radius:1px}.mip-story-page-progress-bar-active{-webkit-transform:scale(1, 1) !important;transform:scale(1, 1) !important;-webkit-transform-origin:left;transform-origin:left;transition:transform 200ms ease !important}.mip-story-page-progress-bar-visited{-webkit-transform:scale(1, 1) !important;transform:scale(1, 1) !important;background:#fff}.mip-story-page-progress-value{background:#fff;height:100%;width:100%;-webkit-transform-origin:left;transform-origin:left;-webkit-transform:scale(0, 1);transform:scale(0, 1)}mip-story-layer[template=fill],mip-story-layer[template=vertical],mip-story-layer[template=horizontal],mip-story-layer[template=thirds]{display:flex !important;display:-webkit-flex !important;height:100%;display:-webkit-box}mip-story-layer[template=fill]>:first-child{bottom:0;display:block;height:auto;left:0;position:absolute;right:0;top:0;width:auto;object-fit:cover}mip-story-layer[template=fill]>:not(:first-child){display:none !important}mip-story-layer[template=fill]>mip-anim img,mip-story-layer[template=fill]>mip-img img,mip-story-layer[template=fill]>mip-video video{object-fit:cover !important}mip-story-layer[template=horizontal]{flex-direction:row;-webkit-flex-direction:row;align-items:stretch;-webkit-align-items:stretch;align-content:flex-start;-webkit-align-content:flex-start}mip-story-layer[template=vertical]{flex-direction:column;-webkit-flex-direction:column;align-items:stretch;-webkit-align-items:stretch;align-content:flex-start;-webkit-align-content:flex-start;margin-bottom:16px}mip-story-layer[template=vertical]>*{width:100%}mip-story-layer[template=thirds]{flex-direction:column !important;-webkit-flex-direction:column !important;-webkit-box-orient:vertical}[flex-area=upper-third],[flex-area=middle-third],[flex-area=lower-third]{height:33%}.mip-backend{position:absolute;z-index:100002;width:100%;height:100%;background:rgba(0,0,0,0.9);top:0;left:0;text-align:center;display:flex !important;display:-webkit-flex !important;justify-content:center !important;-webkit-justify-content:center !important;align-items:center !important;-webkit-align-items:center !important;-webkit-transform:translate(1000%);transform:translateY(1000%);color:#fff;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;-moz-box-align:center;-moz-box-pack:center}.mip-backend-outer{overflow-y:scroll;width:100%;height:100%}.mip-story-middle{display:flex !important;display:-webkit-flex !important;flex-direction:column !important;-webkit-flex-direction:column !important;justify-content:center !important;-webkit-justify-content:center !important;display:-webkit-box;-webkit-box-pack:center;-webkit-box-orient:vertical}.mip-story-middle .mip-backend-preview{margin-top:0}.mip-backend-preview{position:relative;justify-content:center !important;-webkit-justify-content:center !important;width:121px;height:121px;margin:0 auto;margin-top:92px;display:flex !important;display:-webkit-flex !important;align-items:center !important;-webkit-align-items:center !important;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;-moz-box-align:center;-moz-box-pack:center}.mip-backend-preview-mask{position:absolute;top:0;left:0;width:100%;height:100%;background:#000;opacity:.5}.mip-backend-preview-thumbnail{position:relative}.mip-backend-preview-thumbnail:active{opacity:.6}.mip-backend-preview-replay-btn{height:24px;width:24px;background:url(https://www.mipengine.org/static/img/mip-story/mip-story-replay.png);background-size:cover}.mip-backend-preview-share-btn{display:block;margin:0 auto;width:25px;height:25px;background:url(https://www.mipengine.org/static/img/mip-story/mip-story-share.png);background-size:cover}.mip-backend-preview-thumbnail span{display:block;font-size:13px;margin-top:8px !important;color:#e8eaea;line-height:13px}.mip-backend-description{display:block;font-size:16px;margin-top:16px;line-height:16px}.mip-backend-info{display:block;font-size:13px;margin-top:10px;color:#bababa;line-height:13px;opacity:.6}.mip-backend-info a{text-decoration:none;color:#fff}.mip-backend-info>:nth-child(2){margin-left:10px}.mip-backend-share{display:block;margin-top:66px;overflow:hidden;opacity:1}.mip-backend-share:active{opacity:.6}.mip-backend-share-btn{display:block;margin-top:8px;font-size:13px;color:#fff}.mip-backend-close{position:absolute;left:7px;top:12px;z-index:1000}.mip-story-hint{position:absolute;left:0;right:0;top:0;bottom:0;z-index:100005;display:none}.mip-story-hint-shadow{display:block;height:100%;width:25%;background:-webkit-linear-gradient(left, rgba(0,0,0,0.5), transparent) !important;background:linear-gradient(90deg, rgba(0,0,0,0.5), transparent) !important}.mip-story-hint-damping-hide .mip-story-hint-shadow{display:none}.mip-story-hint-system,.mip-story-hint-rotate{display:none;height:100%}.mip-story-page-switch{width:100%;height:100%;display:none}.mip-story-page-switch-lt,.mip-story-page-switch-rt,.mip-story-page-switch-lt .mip-story-page-switch,.mip-story-page-switch-rt .mip-story-page-switch,.mip-story-page-switch-lt .mip-story-page-switch-left,.mip-story-page-switch-rt .mip-story-page-switch-right{display:block !important}.mip-story-page-switch-lt .mip-story-page-switch-right,.mip-story-page-switch-rt .mip-story-page-switch-left{display:none}.mip-story-hint-system{background:#000;opacity:.8;display:none}.mip-story-system-show .mip-story-hint-system{display:flex !important;display:-webkit-flex !important;display:-webkit-box}.mip-story-hint-left,.mip-story-hint-middle,.mip-story-hint-right{height:100%;flex:1 !important;-webkit-flex:1 !important;-webkit-box-flex:1;-moz-box-flex:1}.mip-story-hint-left{background:url(https://www.mipengine.org/static/img/mip-story/mip-story-arrow.png);background-size:30px 30px;background-repeat:no-repeat;background-position:26px}.mip-story-hint-middle-top{position:absolute;left:50%;top:0;width:1px;background:#ddd;height:40%;font-size:13px}.mip-story-hint-middle-icon{position:absolute;top:40%;height:20%;left:0;right:0;color:#fff;display:flex !important;display:-webkit-flex !important;align-items:center !important;-webkit-align-items:center !important;justify-content:center !important;-webkit-justify-content:center !important;flex-direction:column !important;-webkit-flex-direction:column !important;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;-moz-box-align:center;-moz-box-pack:center;-webkit-box-orient:vertical}.mip-story-hint-middle-icon span{display:block;text-align:center;margin-bottom:10px}.mip-story-hint-middle-bottom{position:absolute;left:50%;bottom:0;width:1px;background:#fff;height:40%}.mip-story-hint-right{background:url(https://www.mipengine.org/static/img/mip-story/mip-story-arrow.png);background-size:30px 30px;background-repeat:no-repeat;background-position:26px;transform:rotate(180deg);-webkit-transform:rotate(180deg)}.mip-story-hint-touch-icon{background:url(https://www.mipengine.org/static/img/mip-story/mip-story-touch.png);width:46px;height:50px;margin-top:14px;background-size:contain;background-repeat:no-repeat}.mip-story-hint-rotate{position:absolute;z-index:100003;left:0;top:0;height:100%;width:100%;background:#000;color:#fff;text-align:center}.mip-story-hint-rotate p{margin-top:10px}.mip-story-hint-rotate mip-img{width:47px;height:45px}@media all and (orientation:portrait){.mip-story-hint-rotate{display:none}}@media all and (orientation:landscape){.mip-story-hint{display:block !important}.mip-story-hint-rotate{display:flex !important;display:-webkit-flex !important;flex-direction:column !important;-webkit-flex-direction:column !important;align-items:center !important;-webkit-align-items:center !important;justify-content:center !important;-webkit-justify-content:center !important;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;-moz-box-align:center;-moz-box-pack:center;-webkit-box-orient:vertical}}.mip-story-share{width:100%;position:absolute;z-index:1000010;bottom:-500%}.mip-story-share-show{bottom:0;transition:bottom 200ms ease;-webkit-transition:bottom 200ms ease}.mip-story-share mip-share{width:100%}.mip-story-share-cancel{width:100%;background:#fff;height:30px;display:block;font-size:16px;text-align:center;padding:10px 0;color:#000;border-top:1px solid #eee}@keyframes spread{0%{transform:scale(1, 1)}100%{transform:scale(1.5, 1.5)}}@-webkit-keyframes spread{0%{transform:scale(1, 1)}100%{transform:scale(1.5, 1.5)}}.mip-story-page-switch-left{display:block;position:absolute;left:17px;top:50%;display:none}.mip-story-page-switch-right{display:block;position:absolute;right:45px;top:50%;display:none}.mip-story-page-switch-left>:first-child,.mip-story-page-switch-right>:first-child{width:28px;height:28px;border-radius:14px;background:#fff;position:absolute;top:50%;opacity:.1;animation-delay:100ms;-webkit-animation:100ms;animation:spread 1s ease-out;-webkit-animation:spread 1s ease-out;animation-fill-mode:backwards;-webkit-animation-fill-mode:backwards;background:linear-gradient(center, rgba(255,255,255,0.3), transparent);background:-webkit-linear-gradient(center, rgba(255,255,255,0.3), transparent)}.mip-story-page-switch-left>:nth-child(2),.mip-story-page-switch-right>:nth-child(2){display:block;width:28px;height:28px;border-radius:14px;background:#fff;position:absolute;top:50%;opacity:.1}.recommend{margin:34px 17px 10px 17px;text-align:left}.recommend>:first-child{display:block;font-size:16px;line-height:16px;padding:20px 0 15px 0;color:#fff;border-top:1px solid rgba(255,255,255,0.3)}.recommend-item{width:186px;height:277px;text-align:center;display:flex !important;display:-webkit-flex !important;flex-direction:column !important;-webkit-flex-direction:column !important;justify-content:flex-end !important;-webkit-justify-content:flex-end !important;display:-webkit-box;-webkit-box-orient:vertical;-webkit-box-pack:end;margin-right:8px;word-wrap:break-word;word-break:break-word}.recommend-item>span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;color:#fff;padding:0 2px}.recommend-item>:first-child{font-size:16px}.recommend-item>:nth-child(2){font-size:13px;line-height:13px;margin-top:13px;margin-bottom:10px}")}if(window.MIP)require(["mip-story"],function(e){t(window.MIP,e)});else require(["mip","mip-story"],t)}()}});
