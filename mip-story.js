(window.MIP=window.MIP||[]).push({name:"mip-story",func:function(){define("mip-story/mip-story-view",["require","customElement","util"],function(t){"use strict";var e=t("customElement").create();t("util");return e.prototype.resumeAllMedia=function(){this.whenAllMediaElements(function(t){t.play()})},e.prototype.pauseAllMedia=function(){this.whenAllMediaElements(function(t){t.pause()})},e.prototype.muteAllMedia=function(){this.whenAllMediaElements(function(t){t.muted=!0})},e.prototype.toggleAllMedia=function(t){var e=t.target;if(e.hasAttribute("muted"))this.unMuteAllMedia(),e.removeAttribute("muted");else this.muteAllMedia(),e.setAttribute("muted","")},e.prototype.unMuteAllMedia=function(){this.whenAllMediaElements(function(t){t.muted=!1})},e.prototype.upgradeBackgroundAudio=function(){if(this.element.hasAttribute("background-audio")){var t=document.createElement("audio");t.setAttribute("src",audioSrc),t.setAttribute("preload","auto"),t.setAttribute("loop",""),t.setAttribute("autoplay",""),t.setAttribute("muted",""),t.style.disply="hidden",this.element.appendChild(t)}},e.prototype.getAllMedia=function(){return this.element.querySelectorAll("audio, video")},e.prototype.whenAllMediaElements=function(t){var e=this.getAllMedia();Array.prototype.map.call(e,function(e){return t(e)})},e.prototype.setActive=function(t,e){if(t)this.element.setAttribute("active",""),this.resumeAllMedia(),e?this.muteAllMedia():this.unMuteAllMedia();else this.element.removeAttribute("active"),this.pauseAllMedia()},e.prototype.firstInviewCallback=function(){this.upgradeBackgroundAudio(),this.pauseAllMedia()},MIP.registerMipElement("mip-story-view",e),e}),define("mip-story/mip-story-layer",["require","customElement","util"],function(t){"use strict";var e=t("customElement").create();t("util");return e.prototype.firstInviewCallback=function(){switch(this.element.getAttribute("template")){case"vertical":this.element.classList.add("mip-story-template-vertical");break;case"horizontal":this.element.classList.add("mip-story-template-horizontal");break;case"fill":this.element.classList.add("mip-story-template-fill");break;case"thirds":this.element.classList.add("mip-story-template-thirds")}},MIP.registerMipElement("mip-story-layer",e),e}),define("mip-story/mip-story-share",["require"],function(t){"use strict";function e(){}var i="mip-story-share-show";return e.prototype.build=function(){return'<aside class="mip-story-share"><div class="mip-share-container">    <mip-share></mip-share></div><span class="mip-story-share-cancel">取消</span></aside>'},e.prototype.showShareLayer=function(){document.querySelector(".mip-story-share").classList.add(i)},e.prototype.hideShareLayer=function(){document.querySelector(".mip-story-share").classList.remove(i)},e}),define("mip-story/mip-story-hint",["require","util"],function(t){"use strict";function e(){}var i=t("util"),s=(i.naboo,"mip-story-hint-damping-hide"),r="mip-story-system-show";return e.prototype.build=function(){return'<aside class="mip-story-hint mip-story-hint-damping-hide"><div class="mip-story-hint-shadow"></div><div class="mip-story-hint-system">    <div class="mip-story-hint-left"></div>    <div class="mip-story-hint-middle">        <span class="mip-story-hint-middle-top"></span>        <span class="mip-story-hint-middle-icon">            <span class="mip-story-hint-touch-icon"></span>            <span>点击屏幕左右区域</span>            <span>切换内容</span>        </span>        <span class="mip-story-hint-middle-bottom"></span>    </div>    <div class="mip-story-hint-right"></div></div><div class="mip-story-hint-rotate">    <mip-img src="http://mip-extensions.bj.bcebos.com/mip-story/mip-story-rotate.png"></mip-img>    <p>为了更好的体验，请将手机横过来</p></div>                </aside>'},e.prototype.showDamping=function(){var t=this,e=document.querySelector(".mip-story-hint");e.style.display="block",e.classList.remove(s),setTimeout(function(){t.hideDamping()},250)},e.prototype.hideDamping=function(){var t=document.querySelector(".mip-story-hint");t.style.display="none",t.classList.add(s)},e.prototype.showSystemLater=function(){var t=document.querySelector(".mip-story-hint");t.style.display="block",t.classList.add(r)},e.prototype.hideSystemLater=function(){var t=document.querySelector(".mip-story-hint");t.style.display="none",t.classList.remove(r)},e}),define("mip-story/mip-story-bookend",["require","util"],function(t){"use strict";function e(){}var i=t("util"),s=i.naboo;return e.prototype.getData=function(){var t=document.querySelector('mip-story > script[type="application/json"]');return JSON.parse(t.innerText)},e.prototype.build=function(){var t=this.getData().share;return'<aside class="mip-backend"><div class="mip-backend-outer"><div class="mip-backend-preview" style="background-position:center;background-size:cover;background-image:url('+t.img+')"><div class="mip-backend-preview-mask"></div><div class="mip-backend-preview-thumbnail"><span class="mip-backend-preview-replay-btn"></span><span>重播</span></div></div><span class="mip-backend-description">'+t.title+'</span><span class="mip-backend-info"><span>'+t.from+"</span><span>"+t.readings+' 次阅读</span></span><span class="mip-backend-share"><span class="mip-backend-preview-share-btn"></span><span class="mip-backend-share-btn">分享</span></span></div></aside>'},e.prototype.show=function(){var t=document.querySelector(".mip-backend");s.animate(t,{transform:"translateY(0)"}).start()},e.prototype.hide=function(){var t=document.querySelector(".mip-backend");s.animate(t,{transform:"translateY(1000%)"}).start()},e}),define("mip-story/mip-progress",["require"],function(t){"use strict";function e(t,e){this.root=t,this.elements=e,this.win=window,this.items={},this.oldEle}var i="mip-story-page-progress-bar-active";return e.prototype.build=function(){for(var t='<aside class="mip-story-system-layer"><span class="mip-stoy-close"></span><ol class="mip-story-progress-bar">',e=0;e<this.elements.length;e++)t+='<li class="mip-story-page-progress-bar"><div class="mip-story-page-progress-value"></div></li>';return t+='</ol><span class="mip-stoy-audio"></span></aside>'},e.prototype.updateProgress=function(t,e){var s=this.root.querySelectorAll(".mip-story-progress-bar li"),r=s[t];r.classList.add(i),this.oldEle&&this.oldEle!==r&&this.oldEle.classList.remove(i),this.oldEle=r},e}),define("mip-story/mip-story",["require","./mip-story-view","./mip-story-layer","./mip-story-share","./mip-story-hint","./mip-story-bookend","customElement","util","./mip-progress"],function(t){"use strict";function e(t){this.element=t,this.win=window,this.muted=!1,this.currentIndex=this.preInex=0}var i="mute",s="swip",r="unmute",o="replay",n="switchpage",a="showbookend",p="closebookend",l="tapnavigation",m="standalone",d="shownopreviouspagehelp",c="mip-i-story-standalone";t("./mip-story-view"),t("./mip-story-layer");var u=t("./mip-story-share"),h=t("./mip-story-hint"),y=t("./mip-story-bookend"),b=t("customElement").create(),g=t("util"),f=g.dom,v=g.EventEmitter,w=g.Gesture,k=t("./mip-progress"),x=[];return e.prototype.init=function(){if(this.element.hasAttribute(m))this.win.document.documentElement.setAttribute("id",c);this.initStoryViews(),this.initProgress(),this.initBookend(),this.initHintLayer(),this.initShare(),this.initEvent(),this.switchTo({status:1,notIncrease:1})},e.prototype.initShare=function(){this.share=new u;var t=f.create(this.share.build());this.element.appendChild(t)},e.prototype.initHintLayer=function(){this.hint=new h;var t=f.create(this.hint.build());this.element.appendChild(t)},e.prototype.initEvent=function(){var t=this,e=new w(this.element);this.element.addEventListener("click",function(e){t.emitter.trigger(l,e)}),e.on("swipe",function(e){t.emitter.trigger(s,e)}),t.bindEvent()},e.prototype.initBookend=function(){this.bookEnd=new y;var t=f.create(this.bookEnd.build());this.element.appendChild(t)},e.prototype.initProgress=function(){if(!this.progress){this.progress=new k(this.element,x);var t=f.create(this.progress.build());this.element.appendChild(t),this.progress.updateProgress(0,1)}},e.prototype.initStoryViews=function(){x=this.element.querySelectorAll("mip-story-view")},e.prototype.bindEvent=function(){this.emitter=new v,this.emitter.on(i,this.mute.bind(this)),this.emitter.on(s,this.swip.bind(this)),this.emitter.on(r,this.unmute.bind(this)),this.emitter.on(o,this.replay.bind(this)),this.emitter.on(l,this.tapnavigation.bind(this)),this.emitter.on(n,this.switchTo.bind(this)),this.emitter.on(a,this.showbookend.bind(this)),this.emitter.on(p,this.closebookend.bind(this)),this.emitter.on(d,this.shownopreviouspagehelp.bind(this))},e.prototype.swip=function(t){var e=document.querySelector(".mip-backend");if(!f.contains(e,t.target))this.hint.showSystemLater()},e.prototype.tapnavigation=function(t){var e=document.querySelector(".mip-backend"),s=document.querySelector(".mip-backend-preview"),a=document.querySelector(".mip-backend-share"),l=document.querySelector(".mip-story-share"),m=document.querySelector(".mip-story-share-cancel"),d=document.querySelector(".mip-stoy-close"),c=document.querySelector(".mip-stoy-audio");if(t.target===d)return void history.back();if(t.target===c){return void(c.hasAttribute("muted")?this.emitter.trigger(r,t):this.emitter.trigger(i,t))}if(f.contains(s,t.target))return void this.emitter.trigger(o);else if(f.contains(e,t.target)){if(f.contains(a,t.target))this.share.showShareLayer();else this.emitter.trigger(p);return}else if(f.contains(l,t.target)){if(t.target===m)this.share.hideShareLayer();return}var u=(this.element.offsetLeft+this.element.offsetWidth)/2;if(t.pageX>u)this.emitter.trigger(n,{e:t,status:1});else this.emitter.trigger(n,{e:t,status:0})},e.prototype.setActive=function(t){for(var e=0;e<x.length;e++)if(e===this.currentIndex)x[e].setAttribute("active","");else x[e].removeAttribute("active")},e.prototype.switchTo=function(t){if(this.hint.hideDamping(),this.hint.hideSystemLater(),0===t.status&&this.currentIndex<=0)return void this.emitter.trigger(d);else if(!t.notIncrease&&1===t.status&&this.currentIndex+1>=x.length)return void this.emitter.trigger(a);if(!t.notIncrease)1===t.status?this.currentIndex++:this.currentIndex--;var e=x[this.currentIndex],i=x[this.preInex];if(e.customElement.setActive(!0,this.muted),this.currentIndex!==this.preInex)i.customElement.setActive(!1,this.muted);this.progress.updateProgress(this.currentIndex,t.status),this.preInex=this.currentIndex},e.prototype.showbookend=function(){this.bookEnd.show()},e.prototype.closebookend=function(){this.bookEnd.hide(),this.share.hideShareLayer()},e.prototype.mute=function(t){this.muted=!0,x[this.currentIndex].customElement.toggleAllMedia(t)},e.prototype.unmute=function(t){this.muted=!1,x[this.currentIndex].customElement.toggleAllMedia(t)},e.prototype.replay=function(){this.currentIndex=0,this.preInex=x.length-1,this.switchTo({status:1,notIncrease:1}),this.emitter.trigger(p)},e.prototype.shownopreviouspagehelp=function(){this.hint.showDamping()},b.prototype.firstInviewCallback=function(){new e(this.element).init()},b}),define("mip-story",["mip-story/mip-story"],function(t){return t}),function(){function t(t,e){t.registerMipElement("mip-story",e,"html#mip-i-story-standalone,html#mip-i-story-standalone body{height:100% !important;margin:0 !important;padding:0 !important;width:100% !important;cursor:auto !important}mip-story{background:#000;position:relative !important;height:100% !important;width:100% !important;-webkit-tap-highlight-color:transparent;tap-highlight-color:transparent}mip-story,mip-story-view,mip-story-layer{overflow:hidden !important}mip-story-view{display:none !important;bottom:0 !important;height:auto !important;left:0 !important;position:absolute !important;right:0 !important;top:0 !important;transition:none !important}mip-story-view[active]{display:block !important}mip-story-layer{position:absolute !important;bottom:0 !important;left:0 !important;right:0 !important;top:0 !important;padding:68px 32px 32px !important;overflow:hidden !important}mip-story-layer *{box-sizing:border-box;margin:0}.mip-story-system-layer{background:-webkit-linear-gradient(top, rgba(0,0,0,0.35), transparent);background:linear-gradient(180deg, rgba(0,0,0,0.35), transparent);position:absolute;top:0;left:0;right:0;z-index:100000;padding:23px 0}.mip-story-progress{overflow:hidden}.mip-stoy-close{display:block;float:left;height:16px;width:16px;margin-left:17px;background:url(http://mip-extensions.bj.bcebos.com/mip-story/mip-story-close.png);background-size:cover}.mip-stoy-audio{height:16px;width:17px;margin-right:17px;top:0;background:url(http://mip-extensions.bj.bcebos.com/mip-story/mip-story-unmute.png);background-size:cover;float:right}.mip-stoy-audio[muted]{background:url(http://mip-extensions.bj.bcebos.com/mip-story/mip-story-mute.png);background-size:cover}.mip-story-progress-bar{display:-webkit-flex;height:16px;align-items:center;justify-content:center;position:absolute;left:40px;right:40px}.mip-story-page-progress-bar{background:rgba(255,255,255,0.3);list-style-type:none;margin:0 5px;overflow:hidden;width:6px;height:6px;border-radius:3px}.mip-story-page-progress-bar-active{width:16px;background:#fff}.mip-story-page-progress-value{background:#fff;height:100%;width:100%;-webkit-transform-origin:left;transform-origin:left;-webkit-transform:scale(0, 1);transform:scale(0, 1)}.mip-story-template-fill,.mip-story-template-vertical,.mip-story-template-horizontal{display:flex !important;height:100%}.mip-story-template-fill>:first-child{bottom:0;display:block;height:auto;left:0;position:absolute;right:0;top:0;width:auto;object-fit:cover}.mip-story-template-fill>:not(:first-child){display:none !important}.mip-story-template-fill>mip-anim img,.mip-story-template-fill>mip-img img,.mip-story-template-fill>mip-video video{object-fit:cover !important}.mip-story-template-horizontal{flex-direction:row;align-items:stretch;align-content:flex-start}.mip-story-template-vertical{flex-direction:column;align-items:stretch;align-content:flex-start;margin-bottom:16px}.mip-story-template-vertical>*{width:100%}.mip-backend{position:absolute;z-index:100002;width:100%;height:100%;background:rgba(0,0,0,0.9);top:0;left:0;text-align:center;display:flex;justify-content:center;align-items:center;-webkit-transform:translate(1000%);transform:translateY(1000%);color:#fff}.mip-backend-outer{overflow:hidden}.mip-backend-preview{position:relative;justify-content:center;width:121px;height:121px;margin:0 auto;display:flex;align-items:center}.mip-backend-preview-mask{position:absolute;top:0;left:0;width:100%;height:100%;background:#000;opacity:.5}.mip-backend-preview-thumbnail{position:absolute}.mip-backend-preview-replay-btn{height:24px;width:24px;background:url(http://mip-extensions.bj.bcebos.com/mip-story/mip-story-replay.png);background-size:cover}.mip-backend-preview-share-btn{display:block;margin:0 auto;width:25px;height:25px;background:url(http://mip-extensions.bj.bcebos.com/mip-story/mip-story-share.png);background-size:cover}.mip-backend-preview-thumbnail span{display:block;font-size:13px;margin-top:8px !important;color:#e8eaea}.mip-backend-description{display:block;font-size:16px;margin-top:16px}.mip-backend-info{display:block;font-size:13px;margin-top:10px;color:#bababa}.mip-backend-share{display:block;margin-top:68px;overflow:hidden}.mip-backend-share-btn{display:block;margin-top:10px;font-size:13px;color:#fff}.mip-story-hint{position:absolute;left:0;right:0;top:0;bottom:0;z-index:100005;display:none}.mip-story-hint-left{flex:1}.mip-story-hint-right{flex:1}.mip-story-hint-shadow{display:block;height:100%;width:25%;background:-webkit-linear-gradient(left, rgba(0,0,0,0.5), transparent) !important;background:linear-gradient(90deg, rgba(0,0,0,0.5), transparent) !important}.mip-story-hint-damping-hide .mip-story-hint-shadow{display:none}.mip-story-hint-system,.mip-story-hint-rotate{display:none;height:100%}.mip-story-hint-system{background:#000;opacity:.8;display:none}.mip-story-system-show .mip-story-hint-system{display:flex}.mip-story-hint-left,.mip-story-hint-middle,.mip-story-hint-right{height:100%;flex:1}.mip-story-hint-left{background:url(http://mip-extensions.bj.bcebos.com/mip-story/mip-story-arrow.png);background-size:30px 30px;background-repeat:no-repeat;background-position:26px}.mip-story-hint-middle-top{position:absolute;left:50%;top:0;width:1px;background:#ddd;height:40%;font-size:13px}.mip-story-hint-middle-icon{position:absolute;top:40%;height:20%;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column}.mip-story-hint-middle-icon span{display:block;text-align:center;margin-bottom:10px}.mip-story-hint-middle-bottom{position:absolute;left:50%;bottom:0;width:1px;background:#fff;height:40%}.mip-story-hint-right{background:url(http://mip-extensions.bj.bcebos.com/mip-story/mip-story-arrow.png);background-size:30px 30px;background-repeat:no-repeat;background-position:26px;transform:rotate(180deg)}.mip-story-hint-touch-icon{background:url(http://mip-extensions.bj.bcebos.com/mip-story%2Fmip-story-touch.png);width:46px;height:50px;margin-top:14px;background-size:cover}.mip-story-hint-rotate{position:absolute;z-index:100003;left:0;top:0;height:100%;width:100%;background:#000;color:#fff;text-align:center}.mip-story-hint-rotate p{margin-top:10px}.mip-story-hint-rotate mip-img{width:47px;height:45px}@media all and (orientation:portrait){.mip-story-hint-rotate{display:none}}@media all and (orientation:landscape){.mip-story-hint{display:block !important}.mip-story-hint-rotate{display:flex;flex-direction:column;align-items:center;justify-content:center}}.mip-story-share{width:100%;position:absolute;z-index:100004;bottom:-500%}.mip-story-share-show{bottom:0;transition:bottom 200ms ease;-webkit-transition:bottom 200ms ease}.mip-story-share mip-share{width:100%}.mip-story-share-cancel{width:100%;background:#fff;height:30px;display:block;font-size:20px;text-align:center;padding:18px 0;border-top:1px solid #eee}")}if(window.MIP)require(["mip-story"],function(e){t(window.MIP,e)});else require(["mip","mip-story"],t)}()}});
