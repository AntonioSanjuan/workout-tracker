(self.webpackChunkshell=self.webpackChunkshell||[]).push([[4300],{4300:(q,N,l)=>{l.d(N,{$s:()=>_,Em:()=>C,Kd:()=>Ee,X6:()=>G,Zf:()=>F,iD:()=>D,ic:()=>j,kH:()=>Ae,mK:()=>he,qV:()=>K,qm:()=>J,rt:()=>Ie,s1:()=>y,tE:()=>X,yG:()=>Q});var f=l(6571),r=l(3731),h=l(2831),m=l(3635),d=l(6028),v=l(5893),O=l(7131),b=l(2495),P=l(1088);const k=" ";function F(n,s,e){const t=T(n,s);e=e.trim(),!t.some(i=>i.trim()===e)&&(t.push(e),n.setAttribute(s,t.join(k)))}function D(n,s,e){const t=T(n,s);e=e.trim();const i=t.filter(o=>o!==e);i.length?n.setAttribute(s,i.join(k)):n.removeAttribute(s)}function T(n,s){return n.getAttribute(s)?.match(/\S+/g)??[]}const u="cdk-describedby-message",p="cdk-describedby-host";let a=0,_=(()=>{class n{constructor(e,t){this._platform=t,this._messageRegistry=new Map,this._messagesContainer=null,this._id=""+a++,this._document=e,this._id=(0,r.inject)(r.APP_ID)+"-"+a++}describe(e,t,i){if(!this._canBeDescribed(e,t))return;const o=I(t,i);"string"!=typeof t?(E(t,this._id),this._messageRegistry.set(o,{messageElement:t,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(t,i),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o)}removeDescription(e,t,i){if(!t||!this._isElementNode(e))return;const o=I(t,i);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),"string"==typeof t){const c=this._messageRegistry.get(o);c&&0===c.referenceCount&&this._deleteMessageElement(o)}0===this._messagesContainer?.childNodes.length&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){const e=this._document.querySelectorAll(`[${p}="${this._id}"]`);for(let t=0;t<e.length;t++)this._removeCdkDescribedByReferenceIds(e[t]),e[t].removeAttribute(p);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,t){const i=this._document.createElement("div");E(i,this._id),i.textContent=e,t&&i.setAttribute("role",t),this._createMessagesContainer(),this._messagesContainer.appendChild(i),this._messageRegistry.set(I(e,t),{messageElement:i,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;const e="cdk-describedby-message-container",t=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<t.length;o++)t[o].remove();const i=this._document.createElement("div");i.style.visibility="hidden",i.classList.add(e),i.classList.add("cdk-visually-hidden"),this._platform&&!this._platform.isBrowser&&i.setAttribute("platform","server"),this._document.body.appendChild(i),this._messagesContainer=i}_removeCdkDescribedByReferenceIds(e){const t=T(e,"aria-describedby").filter(i=>0!=i.indexOf(u));e.setAttribute("aria-describedby",t.join(" "))}_addMessageReference(e,t){const i=this._messageRegistry.get(t);F(e,"aria-describedby",i.messageElement.id),e.setAttribute(p,this._id),i.referenceCount++}_removeMessageReference(e,t){const i=this._messageRegistry.get(t);i.referenceCount--,D(e,"aria-describedby",i.messageElement.id),e.removeAttribute(p)}_isElementDescribedByMessage(e,t){const i=T(e,"aria-describedby"),o=this._messageRegistry.get(t),c=o&&o.messageElement.id;return!!c&&-1!=i.indexOf(c)}_canBeDescribed(e,t){if(!this._isElementNode(e))return!1;if(t&&"object"==typeof t)return!0;const i=null==t?"":`${t}`.trim(),o=e.getAttribute("aria-label");return!(!i||o&&o.trim()===i)}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static#e=this.\u0275fac=function(t){return new(t||n)(r.\u0275\u0275inject(f.DOCUMENT),r.\u0275\u0275inject(h.t4))};static#t=this.\u0275prov=r.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function I(n,s){return"string"==typeof n?`${s||""}/${n}`:n}function E(n,s){n.id||(n.id=`${u}-${s}-${a++}`)}class A{constructor(s){this._items=s,this._activeItemIndex=-1,this._activeItem=null,this._wrap=!1,this._letterKeyStream=new m.Subject,this._typeaheadSubscription=m.Subscription.EMPTY,this._vertical=!0,this._allowedModifierKeys=[],this._homeAndEnd=!1,this._pageUpAndDown={enabled:!1,delta:10},this._skipPredicateFn=e=>e.disabled,this._pressedLetters=[],this.tabOut=new m.Subject,this.change=new m.Subject,s instanceof r.QueryList&&(this._itemChangesSubscription=s.changes.subscribe(e=>{if(this._activeItem){const i=e.toArray().indexOf(this._activeItem);i>-1&&i!==this._activeItemIndex&&(this._activeItemIndex=i)}}))}skipPredicate(s){return this._skipPredicateFn=s,this}withWrap(s=!0){return this._wrap=s,this}withVerticalOrientation(s=!0){return this._vertical=s,this}withHorizontalOrientation(s){return this._horizontal=s,this}withAllowedModifierKeys(s){return this._allowedModifierKeys=s,this}withTypeAhead(s=200){return this._typeaheadSubscription.unsubscribe(),this._typeaheadSubscription=this._letterKeyStream.pipe((0,v.tap)(e=>this._pressedLetters.push(e)),(0,v.debounceTime)(s),(0,v.filter)(()=>this._pressedLetters.length>0),(0,v.map)(()=>this._pressedLetters.join(""))).subscribe(e=>{const t=this._getItemsArray();for(let i=1;i<t.length+1;i++){const o=(this._activeItemIndex+i)%t.length,c=t[o];if(!this._skipPredicateFn(c)&&0===c.getLabel().toUpperCase().trim().indexOf(e)){this.setActiveItem(o);break}}this._pressedLetters=[]}),this}cancelTypeahead(){return this._pressedLetters=[],this}withHomeAndEnd(s=!0){return this._homeAndEnd=s,this}withPageUpDown(s=!0,e=10){return this._pageUpAndDown={enabled:s,delta:e},this}setActiveItem(s){const e=this._activeItem;this.updateActiveItem(s),this._activeItem!==e&&this.change.next(this._activeItemIndex)}onKeydown(s){const e=s.keyCode,i=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!s[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case d.Mf:return void this.tabOut.next();case d.JH:if(this._vertical&&i){this.setNextItemActive();break}return;case d.LH:if(this._vertical&&i){this.setPreviousItemActive();break}return;case d.SV:if(this._horizontal&&i){"rtl"===this._horizontal?this.setPreviousItemActive():this.setNextItemActive();break}return;case d.oh:if(this._horizontal&&i){"rtl"===this._horizontal?this.setNextItemActive():this.setPreviousItemActive();break}return;case d.Sd:if(this._homeAndEnd&&i){this.setFirstItemActive();break}return;case d.uR:if(this._homeAndEnd&&i){this.setLastItemActive();break}return;case d.Ku:if(this._pageUpAndDown.enabled&&i){const o=this._activeItemIndex-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}return;case d.VM:if(this._pageUpAndDown.enabled&&i){const o=this._activeItemIndex+this._pageUpAndDown.delta,c=this._getItemsArray().length;this._setActiveItemByIndex(o<c?o:c-1,-1);break}return;default:return void((i||(0,d.Vb)(s,"shiftKey"))&&(s.key&&1===s.key.length?this._letterKeyStream.next(s.key.toLocaleUpperCase()):(e>=d.A&&e<=d.Z||e>=d.xE&&e<=d.aO)&&this._letterKeyStream.next(String.fromCharCode(e))))}this._pressedLetters=[],s.preventDefault()}get activeItemIndex(){return this._activeItemIndex}get activeItem(){return this._activeItem}isTyping(){return this._pressedLetters.length>0}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._items.length-1,-1)}setNextItemActive(){this._activeItemIndex<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(s){const e=this._getItemsArray(),t="number"==typeof s?s:e.indexOf(s);this._activeItem=e[t]??null,this._activeItemIndex=t}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._letterKeyStream.complete(),this.tabOut.complete(),this.change.complete(),this._pressedLetters=[]}_setActiveItemByDelta(s){this._wrap?this._setActiveInWrapMode(s):this._setActiveInDefaultMode(s)}_setActiveInWrapMode(s){const e=this._getItemsArray();for(let t=1;t<=e.length;t++){const i=(this._activeItemIndex+s*t+e.length)%e.length;if(!this._skipPredicateFn(e[i]))return void this.setActiveItem(i)}}_setActiveInDefaultMode(s){this._setActiveItemByIndex(this._activeItemIndex+s,s)}_setActiveItemByIndex(s,e){const t=this._getItemsArray();if(t[s]){for(;this._skipPredicateFn(t[s]);)if(!t[s+=e])return;this.setActiveItem(s)}}_getItemsArray(){return this._items instanceof r.QueryList?this._items.toArray():this._items}}class y extends A{setActiveItem(s){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(s),this.activeItem&&this.activeItem.setActiveStyles()}}class C extends A{constructor(){super(...arguments),this._origin="program"}setFocusOrigin(s){return this._origin=s,this}setActiveItem(s){super.setActiveItem(s),this.activeItem&&this.activeItem.focus(this._origin)}}let j=(()=>{class n{constructor(e){this._platform=e}isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return function te(n){return!!(n.offsetWidth||n.offsetHeight||"function"==typeof n.getClientRects&&n.getClientRects().length)}(e)&&"visible"===getComputedStyle(e).visibility}isTabbable(e){if(!this._platform.isBrowser)return!1;const t=function ee(n){try{return n.frameElement}catch{return null}}(function ue(n){return n.ownerDocument&&n.ownerDocument.defaultView||window}(e));if(t&&(-1===B(t)||!this.isVisible(t)))return!1;let i=e.nodeName.toLowerCase(),o=B(e);return e.hasAttribute("contenteditable")?-1!==o:!("iframe"===i||"object"===i||this._platform.WEBKIT&&this._platform.IOS&&!function ce(n){let s=n.nodeName.toLowerCase(),e="input"===s&&n.type;return"text"===e||"password"===e||"select"===s||"textarea"===s}(e))&&("audio"===i?!!e.hasAttribute("controls")&&-1!==o:"video"===i?-1!==o&&(null!==o||this._platform.FIREFOX||e.hasAttribute("controls")):e.tabIndex>=0)}isFocusable(e,t){return function ae(n){return!function ie(n){return function oe(n){return"input"==n.nodeName.toLowerCase()}(n)&&"hidden"==n.type}(n)&&(function se(n){let s=n.nodeName.toLowerCase();return"input"===s||"select"===s||"button"===s||"textarea"===s}(n)||function ne(n){return function re(n){return"a"==n.nodeName.toLowerCase()}(n)&&n.hasAttribute("href")}(n)||n.hasAttribute("contenteditable")||$(n))}(e)&&!this.isDisabled(e)&&(t?.ignoreVisibility||this.isVisible(e))}static#e=this.\u0275fac=function(t){return new(t||n)(r.\u0275\u0275inject(h.t4))};static#t=this.\u0275prov=r.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function $(n){if(!n.hasAttribute("tabindex")||void 0===n.tabIndex)return!1;let s=n.getAttribute("tabindex");return!(!s||isNaN(parseInt(s,10)))}function B(n){if(!$(n))return null;const s=parseInt(n.getAttribute("tabindex")||"",10);return isNaN(s)?-1:s}class de{get enabled(){return this._enabled}set enabled(s){this._enabled=s,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(s,this._startAnchor),this._toggleAnchorTabIndex(s,this._endAnchor))}constructor(s,e,t,i,o=!1){this._element=s,this._checker=e,this._ngZone=t,this._document=i,this._hasAttached=!1,this.startAnchorListener=()=>this.focusLastTabbableElement(),this.endAnchorListener=()=>this.focusFirstTabbableElement(),this._enabled=!0,o||this.attachAnchors()}destroy(){const s=this._startAnchor,e=this._endAnchor;s&&(s.removeEventListener("focus",this.startAnchorListener),s.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return!!this._hasAttached||(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(s){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(s)))})}focusFirstTabbableElementWhenReady(s){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(s)))})}focusLastTabbableElementWhenReady(s){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(s)))})}_getRegionBoundary(s){const e=this._element.querySelectorAll(`[cdk-focus-region-${s}], [cdkFocusRegion${s}], [cdk-focus-${s}]`);return"start"==s?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(s){const e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){const t=this._getFirstTabbableElement(e);return t?.focus(s),!!t}return e.focus(s),!0}return this.focusFirstTabbableElement(s)}focusFirstTabbableElement(s){const e=this._getRegionBoundary("start");return e&&e.focus(s),!!e}focusLastTabbableElement(s){const e=this._getRegionBoundary("end");return e&&e.focus(s),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(s){if(this._checker.isFocusable(s)&&this._checker.isTabbable(s))return s;const e=s.children;for(let t=0;t<e.length;t++){const i=e[t].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[t]):null;if(i)return i}return null}_getLastTabbableElement(s){if(this._checker.isFocusable(s)&&this._checker.isTabbable(s))return s;const e=s.children;for(let t=e.length-1;t>=0;t--){const i=e[t].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[t]):null;if(i)return i}return null}_createAnchor(){const s=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,s),s.classList.add("cdk-visually-hidden"),s.classList.add("cdk-focus-trap-anchor"),s.setAttribute("aria-hidden","true"),s}_toggleAnchorTabIndex(s,e){s?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex")}toggleAnchors(s){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(s,this._startAnchor),this._toggleAnchorTabIndex(s,this._endAnchor))}_executeOnStable(s){this._ngZone.isStable?s():this._ngZone.onStable.pipe((0,v.take)(1)).subscribe(s)}}let K=(()=>{class n{constructor(e,t,i){this._checker=e,this._ngZone=t,this._document=i}create(e,t=!1){return new de(e,this._checker,this._ngZone,this._document,t)}static#e=this.\u0275fac=function(t){return new(t||n)(r.\u0275\u0275inject(j),r.\u0275\u0275inject(r.NgZone),r.\u0275\u0275inject(f.DOCUMENT))};static#t=this.\u0275prov=r.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),he=(()=>{class n{get enabled(){return this.focusTrap?.enabled||!1}set enabled(e){this.focusTrap&&(this.focusTrap.enabled=e)}constructor(e,t,i){this._elementRef=e,this._focusTrapFactory=t,this._previouslyFocusedElement=null,(0,r.inject)(h.t4).isBrowser&&(this.focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement,!0))}ngOnDestroy(){this.focusTrap?.destroy(),this._previouslyFocusedElement&&(this._previouslyFocusedElement.focus(),this._previouslyFocusedElement=null)}ngAfterContentInit(){this.focusTrap?.attachAnchors(),this.autoCapture&&this._captureFocus()}ngDoCheck(){this.focusTrap&&!this.focusTrap.hasAttached()&&this.focusTrap.attachAnchors()}ngOnChanges(e){const t=e.autoCapture;t&&!t.firstChange&&this.autoCapture&&this.focusTrap?.hasAttached()&&this._captureFocus()}_captureFocus(){this._previouslyFocusedElement=(0,h.ht)(),this.focusTrap?.focusInitialElementWhenReady()}static#e=this.\u0275fac=function(t){return new(t||n)(r.\u0275\u0275directiveInject(r.ElementRef),r.\u0275\u0275directiveInject(K),r.\u0275\u0275directiveInject(f.DOCUMENT))};static#t=this.\u0275dir=r.\u0275\u0275defineDirective({type:n,selectors:[["","cdkTrapFocus",""]],inputs:{enabled:[r.\u0275\u0275InputFlags.HasDecoratorInputTransform,"cdkTrapFocus","enabled",r.booleanAttribute],autoCapture:[r.\u0275\u0275InputFlags.HasDecoratorInputTransform,"cdkTrapFocusAutoCapture","autoCapture",r.booleanAttribute]},exportAs:["cdkTrapFocus"],standalone:!0,features:[r.\u0275\u0275InputTransformsFeature,r.\u0275\u0275NgOnChangesFeature]})}return n})();function G(n){return 0===n.buttons||0===n.detail}function Q(n){const s=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return!(!s||-1!==s.identifier||null!=s.radiusX&&1!==s.radiusX||null!=s.radiusY&&1!==s.radiusY)}const le=new r.InjectionToken("cdk-input-modality-detector-options"),_e={ignoreKeys:[d.zL,d.jx,d.b2,d.MW,d.JU]},L=(0,h.i$)({passive:!0,capture:!0});let fe=(()=>{class n{get mostRecentModality(){return this._modality.value}constructor(e,t,i,o){this._platform=e,this._mostRecentTarget=null,this._modality=new m.BehaviorSubject(null),this._lastTouchMs=0,this._onKeydown=c=>{this._options?.ignoreKeys?.some(g=>g===c.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=(0,h.sA)(c))},this._onMousedown=c=>{Date.now()-this._lastTouchMs<650||(this._modality.next(G(c)?"keyboard":"mouse"),this._mostRecentTarget=(0,h.sA)(c))},this._onTouchstart=c=>{Q(c)?this._modality.next("keyboard"):(this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=(0,h.sA)(c))},this._options={..._e,...o},this.modalityDetected=this._modality.pipe((0,v.skip)(1)),this.modalityChanged=this.modalityDetected.pipe((0,v.distinctUntilChanged)()),e.isBrowser&&t.runOutsideAngular(()=>{i.addEventListener("keydown",this._onKeydown,L),i.addEventListener("mousedown",this._onMousedown,L),i.addEventListener("touchstart",this._onTouchstart,L)})}ngOnDestroy(){this._modality.complete(),this._platform.isBrowser&&(document.removeEventListener("keydown",this._onKeydown,L),document.removeEventListener("mousedown",this._onMousedown,L),document.removeEventListener("touchstart",this._onTouchstart,L))}static#e=this.\u0275fac=function(t){return new(t||n)(r.\u0275\u0275inject(h.t4),r.\u0275\u0275inject(r.NgZone),r.\u0275\u0275inject(f.DOCUMENT),r.\u0275\u0275inject(le,8))};static#t=this.\u0275prov=r.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();const me=new r.InjectionToken("liveAnnouncerElement",{providedIn:"root",factory:function ge(){return null}}),pe=new r.InjectionToken("LIVE_ANNOUNCER_DEFAULT_OPTIONS");let be=0,Ee=(()=>{class n{constructor(e,t,i,o){this._ngZone=t,this._defaultOptions=o,this._document=i,this._liveElement=e||this._createLiveElement()}announce(e,...t){const i=this._defaultOptions;let o,c;return 1===t.length&&"number"==typeof t[0]?c=t[0]:[o,c]=t,this.clear(),clearTimeout(this._previousTimeout),o||(o=i&&i.politeness?i.politeness:"polite"),null==c&&i&&(c=i.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(g=>this._currentResolve=g)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{this._liveElement.textContent=e,"number"==typeof c&&(this._previousTimeout=setTimeout(()=>this.clear(),c)),this._currentResolve(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){const e="cdk-live-announcer-element",t=this._document.getElementsByClassName(e),i=this._document.createElement("div");for(let o=0;o<t.length;o++)t[o].remove();return i.classList.add(e),i.classList.add("cdk-visually-hidden"),i.setAttribute("aria-atomic","true"),i.setAttribute("aria-live","polite"),i.id="cdk-live-announcer-"+be++,this._document.body.appendChild(i),i}_exposeAnnouncerToModals(e){const t=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let i=0;i<t.length;i++){const o=t[i],c=o.getAttribute("aria-owns");c?-1===c.indexOf(e)&&o.setAttribute("aria-owns",c+" "+e):o.setAttribute("aria-owns",e)}}static#e=this.\u0275fac=function(t){return new(t||n)(r.\u0275\u0275inject(me,8),r.\u0275\u0275inject(r.NgZone),r.\u0275\u0275inject(f.DOCUMENT),r.\u0275\u0275inject(pe,8))};static#t=this.\u0275prov=r.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var S=function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n}(S||{});const ve=new r.InjectionToken("cdk-focus-monitor-default-options"),R=(0,h.i$)({passive:!0,capture:!0});let X=(()=>{class n{constructor(e,t,i,o,c){this._ngZone=e,this._platform=t,this._inputModalityDetector=i,this._origin=null,this._windowFocused=!1,this._originFromTouchInteraction=!1,this._elementInfo=new Map,this._monitoredElementCount=0,this._rootNodeFocusListenerCount=new Map,this._windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=window.setTimeout(()=>this._windowFocused=!1)},this._stopInputModalityDetector=new m.Subject,this._rootNodeFocusAndBlurListener=g=>{for(let w=(0,h.sA)(g);w;w=w.parentElement)"focus"===g.type?this._onFocus(g,w):this._onBlur(g,w)},this._document=o,this._detectionMode=c?.detectionMode||S.IMMEDIATE}monitor(e,t=!1){const i=(0,b.fI)(e);if(!this._platform.isBrowser||1!==i.nodeType)return(0,m.of)();const o=(0,h.kV)(i)||this._getDocument(),c=this._elementInfo.get(i);if(c)return t&&(c.checkChildren=!0),c.subject;const g={checkChildren:t,subject:new m.Subject,rootNode:o};return this._elementInfo.set(i,g),this._registerGlobalListeners(g),g.subject}stopMonitoring(e){const t=(0,b.fI)(e),i=this._elementInfo.get(t);i&&(i.subject.complete(),this._setClasses(t),this._elementInfo.delete(t),this._removeGlobalListeners(i))}focusVia(e,t,i){const o=(0,b.fI)(e);o===this._getDocument().activeElement?this._getClosestElementsInfo(o).forEach(([g,V])=>this._originChanged(g,t,V)):(this._setOrigin(t),"function"==typeof o.focus&&o.focus(i))}ngOnDestroy(){this._elementInfo.forEach((e,t)=>this.stopMonitoring(t))}_getDocument(){return this._document||document}_getWindow(){return this._getDocument().defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===S.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,t){e.classList.toggle("cdk-focused",!!t),e.classList.toggle("cdk-touch-focused","touch"===t),e.classList.toggle("cdk-keyboard-focused","keyboard"===t),e.classList.toggle("cdk-mouse-focused","mouse"===t),e.classList.toggle("cdk-program-focused","program"===t)}_setOrigin(e,t=!1){this._ngZone.runOutsideAngular(()=>{this._origin=e,this._originFromTouchInteraction="touch"===e&&t,this._detectionMode===S.IMMEDIATE&&(clearTimeout(this._originTimeoutId),this._originTimeoutId=setTimeout(()=>this._origin=null,this._originFromTouchInteraction?650:1))})}_onFocus(e,t){const i=this._elementInfo.get(t),o=(0,h.sA)(e);!i||!i.checkChildren&&t!==o||this._originChanged(t,this._getFocusOrigin(o),i)}_onBlur(e,t){const i=this._elementInfo.get(t);!i||i.checkChildren&&e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||(this._setClasses(t),this._emitOrigin(i,null))}_emitOrigin(e,t){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(t))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;const t=e.rootNode,i=this._rootNodeFocusListenerCount.get(t)||0;i||this._ngZone.runOutsideAngular(()=>{t.addEventListener("focus",this._rootNodeFocusAndBlurListener,R),t.addEventListener("blur",this._rootNodeFocusAndBlurListener,R)}),this._rootNodeFocusListenerCount.set(t,i+1),1==++this._monitoredElementCount&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe((0,v.takeUntil)(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){const t=e.rootNode;if(this._rootNodeFocusListenerCount.has(t)){const i=this._rootNodeFocusListenerCount.get(t);i>1?this._rootNodeFocusListenerCount.set(t,i-1):(t.removeEventListener("focus",this._rootNodeFocusAndBlurListener,R),t.removeEventListener("blur",this._rootNodeFocusAndBlurListener,R),this._rootNodeFocusListenerCount.delete(t))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,t,i){this._setClasses(e,t),this._emitOrigin(i,t),this._lastFocusOrigin=t}_getClosestElementsInfo(e){const t=[];return this._elementInfo.forEach((i,o)=>{(o===e||i.checkChildren&&o.contains(e))&&t.push([o,i])}),t}_isLastInteractionFromInputLabel(e){const{_mostRecentTarget:t,mostRecentModality:i}=this._inputModalityDetector;if("mouse"!==i||!t||t===e||"INPUT"!==e.nodeName&&"TEXTAREA"!==e.nodeName||e.disabled)return!1;const o=e.labels;if(o)for(let c=0;c<o.length;c++)if(o[c].contains(t))return!0;return!1}static#e=this.\u0275fac=function(t){return new(t||n)(r.\u0275\u0275inject(r.NgZone),r.\u0275\u0275inject(h.t4),r.\u0275\u0275inject(fe),r.\u0275\u0275inject(f.DOCUMENT,8),r.\u0275\u0275inject(ve,8))};static#t=this.\u0275prov=r.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ae=(()=>{class n{constructor(e,t){this._elementRef=e,this._focusMonitor=t,this._focusOrigin=null,this.cdkFocusChange=new r.EventEmitter}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){const e=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(e,1===e.nodeType&&e.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(t=>{this._focusOrigin=t,this.cdkFocusChange.emit(t)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription&&this._monitorSubscription.unsubscribe()}static#e=this.\u0275fac=function(t){return new(t||n)(r.\u0275\u0275directiveInject(r.ElementRef),r.\u0275\u0275directiveInject(X))};static#t=this.\u0275dir=r.\u0275\u0275defineDirective({type:n,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"],standalone:!0})}return n})();var M=function(n){return n[n.NONE=0]="NONE",n[n.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",n[n.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",n}(M||{});const W="cdk-high-contrast-black-on-white",z="cdk-high-contrast-white-on-black",H="cdk-high-contrast-active";let J=(()=>{class n{constructor(e,t){this._platform=e,this._document=t,this._breakpointSubscription=(0,r.inject)(P.Yg).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return M.NONE;const e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);const t=this._document.defaultView||window,i=t&&t.getComputedStyle?t.getComputedStyle(e):null,o=(i&&i.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return M.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return M.BLACK_ON_WHITE}return M.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){const e=this._document.body.classList;e.remove(H,W,z),this._hasCheckedHighContrastMode=!0;const t=this.getHighContrastMode();t===M.BLACK_ON_WHITE?e.add(H,W):t===M.WHITE_ON_BLACK&&e.add(H,z)}}static#e=this.\u0275fac=function(t){return new(t||n)(r.\u0275\u0275inject(h.t4),r.\u0275\u0275inject(f.DOCUMENT))};static#t=this.\u0275prov=r.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ie=(()=>{class n{constructor(e){e._applyBodyHighContrastModeCssClasses()}static#e=this.\u0275fac=function(t){return new(t||n)(r.\u0275\u0275inject(J))};static#t=this.\u0275mod=r.\u0275\u0275defineNgModule({type:n});static#s=this.\u0275inj=r.\u0275\u0275defineInjector({imports:[O.Q8]})}return n})()},6028:(q,N,l)=>{l.d(N,{A:()=>K,JH:()=>E,JU:()=>v,K5:()=>d,Ku:()=>T,LH:()=>_,L_:()=>D,MW:()=>W,Mf:()=>h,SV:()=>I,Sd:()=>p,VM:()=>U,Vb:()=>we,Z:()=>M,ZH:()=>r,aO:()=>B,b2:()=>De,hY:()=>F,jx:()=>O,oh:()=>a,uR:()=>u,xE:()=>j,zL:()=>b});const r=8,h=9,d=13,v=16,O=17,b=18,F=27,D=32,T=33,U=34,u=35,p=36,a=37,_=38,I=39,E=40,j=48,B=57,K=65,M=90,W=91,De=224;function we(x,...ye){return ye.length?ye.some(Ne=>x[Ne]):x.altKey||x.shiftKey||x.ctrlKey||x.metaKey}},1088:(q,N,l)=>{l.d(N,{Yg:()=>D,u3:()=>U});var f=l(3731),r=l(2495),h=l(3635),m=l(5893),d=l(2831);const O=new Set;let b,P=(()=>{class u{constructor(a,_){this._platform=a,this._nonce=_,this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):F}matchMedia(a){return(this._platform.WEBKIT||this._platform.BLINK)&&function k(u,p){if(!O.has(u))try{b||(b=document.createElement("style"),p&&(b.nonce=p),b.setAttribute("type","text/css"),document.head.appendChild(b)),b.sheet&&(b.sheet.insertRule(`@media ${u} {body{ }}`,0),O.add(u))}catch(a){console.error(a)}}(a,this._nonce),this._matchMedia(a)}static#e=this.\u0275fac=function(_){return new(_||u)(f.\u0275\u0275inject(d.t4),f.\u0275\u0275inject(f.CSP_NONCE,8))};static#t=this.\u0275prov=f.\u0275\u0275defineInjectable({token:u,factory:u.\u0275fac,providedIn:"root"})}return u})();function F(u){return{matches:"all"===u||""===u,media:u,addListener:()=>{},removeListener:()=>{}}}let D=(()=>{class u{constructor(a,_){this._mediaMatcher=a,this._zone=_,this._queries=new Map,this._destroySubject=new h.Subject}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(a){return T((0,r.Eq)(a)).some(I=>this._registerQuery(I).mql.matches)}observe(a){const I=T((0,r.Eq)(a)).map(A=>this._registerQuery(A).observable);let E=(0,h.combineLatest)(I);return E=(0,h.concat)(E.pipe((0,m.take)(1)),E.pipe((0,m.skip)(1),(0,m.debounceTime)(0))),E.pipe((0,m.map)(A=>{const y={matches:!1,breakpoints:{}};return A.forEach(({matches:C,query:Z})=>{y.matches=y.matches||C,y.breakpoints[Z]=C}),y}))}_registerQuery(a){if(this._queries.has(a))return this._queries.get(a);const _=this._mediaMatcher.matchMedia(a),E={observable:new h.Observable(A=>{const y=C=>this._zone.run(()=>A.next(C));return _.addListener(y),()=>{_.removeListener(y)}}).pipe((0,m.startWith)(_),(0,m.map)(({matches:A})=>({query:a,matches:A})),(0,m.takeUntil)(this._destroySubject)),mql:_};return this._queries.set(a,E),E}static#e=this.\u0275fac=function(_){return new(_||u)(f.\u0275\u0275inject(P),f.\u0275\u0275inject(f.NgZone))};static#t=this.\u0275prov=f.\u0275\u0275defineInjectable({token:u,factory:u.\u0275fac,providedIn:"root"})}return u})();function T(u){return u.map(p=>p.split(",")).reduce((p,a)=>p.concat(a)).map(p=>p.trim())}const U={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"}}}]);