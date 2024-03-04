(self.webpackChunkaccount=self.webpackChunkaccount||[]).push([[2596],{2596:(Z,T,l)=>{l.r(T),l.d(T,{MAT_TOOLTIP_DEFAULT_OPTIONS:()=>w,MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY:()=>C,MAT_TOOLTIP_SCROLL_STRATEGY:()=>v,MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY:()=>P,MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER:()=>D,MatTooltip:()=>j,MatTooltipModule:()=>G,SCROLL_THROTTLE_MS:()=>g,TOOLTIP_PANEL_CLASS:()=>U,TooltipComponent:()=>M,getMatTooltipInvalidPositionError:()=>k,matTooltipAnimations:()=>B});var c=l(5893),_=l(2495),y=l(6028),o=l(3731),f=l(6571),b=l(2831),u=l(4300),x=l(9388),p=l(9594),I=l(6672),S=l(8484),E=l(3635),h=l(8012),O=l(3122);const N=["tooltip"],g=20;function k(n){return Error(`Tooltip position "${n}" is invalid.`)}const v=new o.InjectionToken("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{const n=(0,o.inject)(p.aV);return()=>n.scrollStrategies.reposition({scrollThrottle:g})}});function P(n){return()=>n.scrollStrategies.reposition({scrollThrottle:g})}const D={provide:v,deps:[p.aV],useFactory:P};function C(){return{showDelay:0,hideDelay:0,touchendHideDelay:1500}}const w=new o.InjectionToken("mat-tooltip-default-options",{providedIn:"root",factory:C}),U="mat-mdc-tooltip-panel",A="tooltip-panel",R=(0,b.i$)({passive:!0});let j=(()=>{class n{get position(){return this._position}set position(t){t!==this._position&&(this._position=t,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(t){this._positionAtOrigin=(0,_.Ig)(t),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(t){this._disabled=(0,_.Ig)(t),this._disabled?this.hide(0):this._setupPointerEnterEventsIfNeeded()}get showDelay(){return this._showDelay}set showDelay(t){this._showDelay=(0,_.su)(t)}get hideDelay(){return this._hideDelay}set hideDelay(t){this._hideDelay=(0,_.su)(t),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}get message(){return this._message}set message(t){this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this._message,"tooltip"),this._message=null!=t?String(t).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage(),this._ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")})}))}get tooltipClass(){return this._tooltipClass}set tooltipClass(t){this._tooltipClass=t,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}constructor(t,i,e,s,a,d,m,X,W,L,r,K){this._overlay=t,this._elementRef=i,this._scrollDispatcher=e,this._viewContainerRef=s,this._ngZone=a,this._platform=d,this._ariaDescriber=m,this._focusMonitor=X,this._dir=L,this._defaultOptions=r,this._position="below",this._positionAtOrigin=!1,this._disabled=!1,this._viewInitialized=!1,this._pointerExitEventsInitialized=!1,this._tooltipComponent=M,this._viewportMargin=8,this._cssClassPrefix="mat-mdc",this.touchGestures="auto",this._message="",this._passiveListeners=[],this._destroyed=new E.Subject,this._scrollStrategy=W,this._document=K,r&&(this._showDelay=r.showDelay,this._hideDelay=r.hideDelay,r.position&&(this.position=r.position),r.positionAtOrigin&&(this.positionAtOrigin=r.positionAtOrigin),r.touchGestures&&(this.touchGestures=r.touchGestures)),L.change.pipe((0,c.takeUntil)(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)}),this._viewportMargin=8}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe((0,c.takeUntil)(this._destroyed)).subscribe(t=>{t?"keyboard"===t&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){const t=this._elementRef.nativeElement;clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._passiveListeners.forEach(([i,e])=>{t.removeEventListener(i,e,R)}),this._passiveListeners.length=0,this._destroyed.next(),this._destroyed.complete(),this._ariaDescriber.removeDescription(t,this.message,"tooltip"),this._focusMonitor.stopMonitoring(t)}show(t=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible())return void this._tooltipInstance?._cancelPendingAnimations();const e=this._createOverlay(i);this._detach(),this._portal=this._portal||new S.C5(this._tooltipComponent,this._viewContainerRef);const s=this._tooltipInstance=e.attach(this._portal).instance;s._triggerElement=this._elementRef.nativeElement,s._mouseLeaveHideDelay=this._hideDelay,s.afterHidden().pipe((0,c.takeUntil)(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),s.show(t)}hide(t=this.hideDelay){const i=this._tooltipInstance;i&&(i.isVisible()?i.hide(t):(i._cancelPendingAnimations(),this._detach()))}toggle(t){this._isTooltipVisible()?this.hide():this.show(void 0,t)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(t){if(this._overlayRef){const s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!t)&&s._origin instanceof o.ElementRef)return this._overlayRef;this._detach()}const i=this._scrollDispatcher.getAncestorScrollContainers(this._elementRef),e=this._overlay.position().flexibleConnectedTo(this.positionAtOrigin&&t||this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i);return e.positionChanges.pipe((0,c.takeUntil)(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=this._overlay.create({direction:this._dir,positionStrategy:e,panelClass:`${this._cssClassPrefix}-${A}`,scrollStrategy:this._scrollStrategy()}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe((0,c.takeUntil)(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe((0,c.takeUntil)(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe((0,c.takeUntil)(this._destroyed)).subscribe(s=>{this._isTooltipVisible()&&s.keyCode===y.hY&&!(0,y.Vb)(s)&&(s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0)))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(t){const i=t.getConfig().positionStrategy,e=this._getOrigin(),s=this._getOverlayPosition();i.withPositions([this._addOffset({...e.main,...s.main}),this._addOffset({...e.fallback,...s.fallback})])}_addOffset(t){const e=!this._dir||"ltr"==this._dir.value;return"top"===t.originY?t.offsetY=-8:"bottom"===t.originY?t.offsetY=8:"start"===t.originX?t.offsetX=e?-8:8:"end"===t.originX&&(t.offsetX=e?8:-8),t}_getOrigin(){const t=!this._dir||"ltr"==this._dir.value,i=this.position;let e;"above"==i||"below"==i?e={originX:"center",originY:"above"==i?"top":"bottom"}:"before"==i||"left"==i&&t||"right"==i&&!t?e={originX:"start",originY:"center"}:("after"==i||"right"==i&&t||"left"==i&&!t)&&(e={originX:"end",originY:"center"});const{x:s,y:a}=this._invertPosition(e.originX,e.originY);return{main:e,fallback:{originX:s,originY:a}}}_getOverlayPosition(){const t=!this._dir||"ltr"==this._dir.value,i=this.position;let e;"above"==i?e={overlayX:"center",overlayY:"bottom"}:"below"==i?e={overlayX:"center",overlayY:"top"}:"before"==i||"left"==i&&t||"right"==i&&!t?e={overlayX:"end",overlayY:"center"}:("after"==i||"right"==i&&t||"left"==i&&!t)&&(e={overlayX:"start",overlayY:"center"});const{x:s,y:a}=this._invertPosition(e.overlayX,e.overlayY);return{main:e,fallback:{overlayX:s,overlayY:a}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),this._ngZone.onMicrotaskEmpty.pipe((0,c.take)(1),(0,c.takeUntil)(this._destroyed)).subscribe(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()}))}_setTooltipClass(t){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=t,this._tooltipInstance._markForCheck())}_invertPosition(t,i){return"above"===this.position||"below"===this.position?"top"===i?i="bottom":"bottom"===i&&(i="top"):"end"===t?t="start":"start"===t&&(t="end"),{x:t,y:i}}_updateCurrentPositionClass(t){const{overlayY:i,originX:e,originY:s}=t;let a;if(a="center"===i?this._dir&&"rtl"===this._dir.value?"end"===e?"left":"right":"start"===e?"left":"right":"bottom"===i&&"top"===s?"above":"below",a!==this._currentPosition){const d=this._overlayRef;if(d){const m=`${this._cssClassPrefix}-${A}-`;d.removePanelClass(m+this._currentPosition),d.addPanelClass(m+a)}this._currentPosition=a}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._passiveListeners.length||(this._platformSupportsMouseEvents()?this._passiveListeners.push(["mouseenter",t=>{let i;this._setupPointerExitEventsIfNeeded(),void 0!==t.x&&void 0!==t.y&&(i=t),this.show(void 0,i)}]):"off"!==this.touchGestures&&(this._disableNativeGesturesIfNecessary(),this._passiveListeners.push(["touchstart",t=>{const i=t.targetTouches?.[0],e=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),clearTimeout(this._touchstartTimeout),this._touchstartTimeout=setTimeout(()=>this.show(void 0,e),500)}])),this._addListeners(this._passiveListeners))}_setupPointerExitEventsIfNeeded(){if(this._pointerExitEventsInitialized)return;this._pointerExitEventsInitialized=!0;const t=[];if(this._platformSupportsMouseEvents())t.push(["mouseleave",i=>{const e=i.relatedTarget;(!e||!this._overlayRef?.overlayElement.contains(e))&&this.hide()}],["wheel",i=>this._wheelListener(i)]);else if("off"!==this.touchGestures){this._disableNativeGesturesIfNecessary();const i=()=>{clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions.touchendHideDelay)};t.push(["touchend",i],["touchcancel",i])}this._addListeners(t),this._passiveListeners.push(...t)}_addListeners(t){t.forEach(([i,e])=>{this._elementRef.nativeElement.addEventListener(i,e,R)})}_platformSupportsMouseEvents(){return!this._platform.IOS&&!this._platform.ANDROID}_wheelListener(t){if(this._isTooltipVisible()){const i=this._document.elementFromPoint(t.clientX,t.clientY),e=this._elementRef.nativeElement;i!==e&&!e.contains(i)&&this.hide()}}_disableNativeGesturesIfNecessary(){const t=this.touchGestures;if("off"!==t){const i=this._elementRef.nativeElement,e=i.style;("on"===t||"INPUT"!==i.nodeName&&"TEXTAREA"!==i.nodeName)&&(e.userSelect=e.msUserSelect=e.webkitUserSelect=e.MozUserSelect="none"),("on"===t||!i.draggable)&&(e.webkitUserDrag="none"),e.touchAction="none",e.webkitTapHighlightColor="transparent"}}static#t=this.\u0275fac=function(i){return new(i||n)(o.\u0275\u0275directiveInject(p.aV),o.\u0275\u0275directiveInject(o.ElementRef),o.\u0275\u0275directiveInject(I.mF),o.\u0275\u0275directiveInject(o.ViewContainerRef),o.\u0275\u0275directiveInject(o.NgZone),o.\u0275\u0275directiveInject(b.t4),o.\u0275\u0275directiveInject(u.$s),o.\u0275\u0275directiveInject(u.tE),o.\u0275\u0275directiveInject(v),o.\u0275\u0275directiveInject(x.Is),o.\u0275\u0275directiveInject(w,8),o.\u0275\u0275directiveInject(f.DOCUMENT))};static#i=this.\u0275dir=o.\u0275\u0275defineDirective({type:n,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,e){2&i&&o.\u0275\u0275classProp("mat-mdc-tooltip-disabled",e.disabled)},inputs:{position:[o.\u0275\u0275InputFlags.None,"matTooltipPosition","position"],positionAtOrigin:[o.\u0275\u0275InputFlags.None,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[o.\u0275\u0275InputFlags.None,"matTooltipDisabled","disabled"],showDelay:[o.\u0275\u0275InputFlags.None,"matTooltipShowDelay","showDelay"],hideDelay:[o.\u0275\u0275InputFlags.None,"matTooltipHideDelay","hideDelay"],touchGestures:[o.\u0275\u0275InputFlags.None,"matTooltipTouchGestures","touchGestures"],message:[o.\u0275\u0275InputFlags.None,"matTooltip","message"],tooltipClass:[o.\u0275\u0275InputFlags.None,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"],standalone:!0})}return n})(),M=(()=>{class n{constructor(t,i,e){this._changeDetectorRef=t,this._elementRef=i,this._isMultiline=!1,this._closeOnInteraction=!1,this._isVisible=!1,this._onHide=new E.Subject,this._showAnimation="mat-mdc-tooltip-show",this._hideAnimation="mat-mdc-tooltip-hide",this._animationsDisabled="NoopAnimations"===e}show(t){null!=this._hideTimeoutId&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},t)}hide(t){null!=this._showTimeoutId&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},t)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:t}){(!t||!this._triggerElement.contains(t))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){const t=this._elementRef.nativeElement.getBoundingClientRect();return t.height>24&&t.width>=200}_handleAnimationEnd({animationName:t}){(t===this._showAnimation||t===this._hideAnimation)&&this._finalizeAnimation(t===this._showAnimation)}_cancelPendingAnimations(){null!=this._showTimeoutId&&clearTimeout(this._showTimeoutId),null!=this._hideTimeoutId&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(t){t?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(t){const i=this._tooltip.nativeElement,e=this._showAnimation,s=this._hideAnimation;if(i.classList.remove(t?s:e),i.classList.add(t?e:s),this._isVisible=t,t&&!this._animationsDisabled&&"function"==typeof getComputedStyle){const a=getComputedStyle(i);("0s"===a.getPropertyValue("animation-duration")||"none"===a.getPropertyValue("animation-name"))&&(this._animationsDisabled=!0)}t&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(t))}static#t=this.\u0275fac=function(i){return new(i||n)(o.\u0275\u0275directiveInject(o.ChangeDetectorRef),o.\u0275\u0275directiveInject(o.ElementRef),o.\u0275\u0275directiveInject(o.ANIMATION_MODULE_TYPE,8))};static#i=this.\u0275cmp=o.\u0275\u0275defineComponent({type:n,selectors:[["mat-tooltip-component"]],viewQuery:function(i,e){if(1&i&&o.\u0275\u0275viewQuery(N,7),2&i){let s;o.\u0275\u0275queryRefresh(s=o.\u0275\u0275loadQuery())&&(e._tooltip=s.first)}},hostAttrs:["aria-hidden","true"],hostVars:2,hostBindings:function(i,e){1&i&&o.\u0275\u0275listener("mouseleave",function(a){return e._handleMouseLeave(a)}),2&i&&o.\u0275\u0275styleProp("zoom",e.isVisible()?1:null)},standalone:!0,features:[o.\u0275\u0275StandaloneFeature],decls:4,vars:4,consts:[[1,"mdc-tooltip","mdc-tooltip--shown","mat-mdc-tooltip",3,"ngClass","animationend"],["tooltip",""],[1,"mdc-tooltip__surface","mdc-tooltip__surface-animation"]],template:function(i,e){1&i&&(o.\u0275\u0275elementStart(0,"div",0,1),o.\u0275\u0275listener("animationend",function(a){return e._handleAnimationEnd(a)}),o.\u0275\u0275elementStart(2,"div",2),o.\u0275\u0275text(3),o.\u0275\u0275elementEnd()()),2&i&&(o.\u0275\u0275classProp("mdc-tooltip--multiline",e._isMultiline),o.\u0275\u0275property("ngClass",e.tooltipClass),o.\u0275\u0275advance(3),o.\u0275\u0275textInterpolate(e.message))},dependencies:[f.NgClass],styles:['.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip--showing-transition .mdc-tooltip__surface-animation{transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-tooltip--hide-transition .mdc-tooltip__surface-animation{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-tooltip{position:fixed;display:none;z-index:9}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-tooltip__surface::before{border-color:CanvasText}}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;display:flex;flex-direction:column;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(200px - 2*8px);margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(320px - 2*8px);align-self:stretch}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions,.mdc-tooltip__content,.mdc-tooltip__title{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);outline:1px solid rgba(0,0,0,0);z-index:-1}@media screen and (forced-colors: active){.mdc-tooltip__caret-surface-bottom{outline-color:CanvasText}}.mat-mdc-tooltip .mdc-tooltip__surface{background-color:var(--mdc-plain-tooltip-container-color)}.mat-mdc-tooltip .mdc-tooltip__surface{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__caret-surface-top,.mat-mdc-tooltip .mdc-tooltip__caret-surface-bottom{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__surface{color:var(--mdc-plain-tooltip-supporting-text-color)}.mat-mdc-tooltip .mdc-tooltip__surface{font-family:var(--mdc-plain-tooltip-supporting-text-font);line-height:var(--mdc-plain-tooltip-supporting-text-line-height);font-size:var(--mdc-plain-tooltip-supporting-text-size);font-weight:var(--mdc-plain-tooltip-supporting-text-weight);letter-spacing:var(--mdc-plain-tooltip-supporting-text-tracking)}.mat-mdc-tooltip{position:relative;transform:scale(0)}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}'],encapsulation:2,changeDetection:0})}return n})();const B={tooltipState:(0,h.trigger)("state",[(0,h.state)("initial, void, hidden",(0,h.style)({opacity:0,transform:"scale(0.8)"})),(0,h.state)("visible",(0,h.style)({transform:"scale(1)"})),(0,h.transition)("* => visible",(0,h.animate)("150ms cubic-bezier(0, 0, 0.2, 1)")),(0,h.transition)("* => hidden",(0,h.animate)("75ms cubic-bezier(0.4, 0, 1, 1)"))])};let G=(()=>{class n{static#t=this.\u0275fac=function(i){return new(i||n)};static#i=this.\u0275mod=o.\u0275\u0275defineNgModule({type:n});static#e=this.\u0275inj=o.\u0275\u0275defineInjector({providers:[D],imports:[u.rt,f.CommonModule,p.U8,O.MatCommonModule,O.MatCommonModule,I.ZD]})}return n})()}}]);