(self.webpackChunkaccount=self.webpackChunkaccount||[]).push([[3274],{2495:(y,_,i)=>{i.d(_,{Eq:()=>E,HM:()=>d,Ig:()=>p,fI:()=>b,su:()=>f,t6:()=>m});var a=i(3731);function p(t){return null!=t&&"false"!=`${t}`}function f(t,n=0){return m(t)?Number(t):n}function m(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function E(t){return Array.isArray(t)?t:[t]}function d(t){return null==t?"":"string"==typeof t?t:`${t}px`}function b(t){return t instanceof a.ElementRef?t.nativeElement:t}},7131:(y,_,i)=>{i.d(_,{Q8:()=>b});var a=i(3731);i(3635),i(5893);let m=(()=>{class r{create(n){return typeof MutationObserver>"u"?null:new MutationObserver(n)}static#e=this.\u0275fac=function(s){return new(s||r)};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})(),b=(()=>{class r{static#e=this.\u0275fac=function(s){return new(s||r)};static#t=this.\u0275mod=a.\u0275\u0275defineNgModule({type:r});static#n=this.\u0275inj=a.\u0275\u0275defineInjector({providers:[m]})}return r})()},2831:(y,_,i)=>{i.d(_,{Mq:()=>O,Oy:()=>C,ht:()=>D,i$:()=>s,kV:()=>I,qK:()=>r,sA:()=>M,t4:()=>m});var a=i(3731),p=i(6571);let f;try{f=typeof Intl<"u"&&Intl.v8BreakIterator}catch{f=!1}let d,m=(()=>{class e{constructor(h){this._platformId=h,this.isBrowser=this._platformId?(0,p.isPlatformBrowser)(this._platformId):"object"==typeof document&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!(!window.chrome&&!f)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}static#e=this.\u0275fac=function(v){return new(v||e)(a.\u0275\u0275inject(a.PLATFORM_ID))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();const b=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function r(){if(d)return d;if("object"!=typeof document||!document)return d=new Set(b),d;let e=document.createElement("input");return d=new Set(b.filter(o=>(e.setAttribute("type",o),e.type===o))),d}let t,c,g;function s(e){return function n(){if(null==t&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>t=!0}))}finally{t=t||!1}return t}()?e:!!e.capture}function O(){if(null==c){if("object"!=typeof document||!document||"function"!=typeof Element||!Element)return c=!1,c;if("scrollBehavior"in document.documentElement.style)c=!0;else{const e=Element.prototype.scrollTo;c=!!e&&!/\{\s*\[native code\]\s*\}/.test(e.toString())}}return c}function I(e){if(function w(){if(null==g){const e=typeof document<"u"?document.head:null;g=!(!e||!e.createShadowRoot&&!e.attachShadow)}return g}()){const o=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&o instanceof ShadowRoot)return o}return null}function D(){let e=typeof document<"u"&&document?document.activeElement:null;for(;e&&e.shadowRoot;){const o=e.shadowRoot.activeElement;if(o===e)break;e=o}return e}function M(e){return e.composedPath?e.composedPath()[0]:e.target}function C(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}}}]);