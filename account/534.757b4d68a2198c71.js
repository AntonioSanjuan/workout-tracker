(self.webpackChunkaccount=self.webpackChunkaccount||[]).push([[534],{9058:(oe,k,O)=>{O.d(k,{BH:()=>ce,G6:()=>ve,L:()=>D,LL:()=>de,Pz:()=>re,Sg:()=>ke,UG:()=>Y,ZB:()=>d,ZR:()=>X,aH:()=>H,b$:()=>Ee,eu:()=>Ie,hl:()=>we,jU:()=>le,m9:()=>Re,ne:()=>K,pd:()=>Be,r3:()=>Ce,ru:()=>ye,tV:()=>a,uI:()=>_e,vZ:()=>pe,w1:()=>ue,xO:()=>xe,xb:()=>Oe,z$:()=>G,zd:()=>Z});const E=function(t){const e=[];let n=0;for(let o=0;o<t.length;o++){let i=t.charCodeAt(o);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=63&i|128):55296==(64512&i)&&o+1<t.length&&56320==(64512&t.charCodeAt(o+1))?(i=65536+((1023&i)<<10)+(1023&t.charCodeAt(++o)),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=63&i|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=63&i|128)}return e},T={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,o=[];for(let i=0;i<t.length;i+=3){const u=t[i],h=i+1<t.length,I=h?t[i+1]:0,M=i+2<t.length,x=M?t[i+2]:0;let $=(15&I)<<2|x>>6,ne=63&x;M||(ne=64,h||($=64)),o.push(n[u>>2],n[(3&u)<<4|I>>4],n[$],n[ne])}return o.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(E(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){const e=[];let n=0,o=0;for(;n<t.length;){const i=t[n++];if(i<128)e[o++]=String.fromCharCode(i);else if(i>191&&i<224){const u=t[n++];e[o++]=String.fromCharCode((31&i)<<6|63&u)}else if(i>239&&i<365){const M=((7&i)<<18|(63&t[n++])<<12|(63&t[n++])<<6|63&t[n++])-65536;e[o++]=String.fromCharCode(55296+(M>>10)),e[o++]=String.fromCharCode(56320+(1023&M))}else{const u=t[n++],h=t[n++];e[o++]=String.fromCharCode((15&i)<<12|(63&u)<<6|63&h)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,o=[];for(let i=0;i<t.length;){const u=n[t.charAt(i++)],I=i<t.length?n[t.charAt(i)]:0;++i;const x=i<t.length?n[t.charAt(i)]:64;++i;const _=i<t.length?n[t.charAt(i)]:64;if(++i,null==u||null==I||null==x||null==_)throw new N;o.push(u<<2|I>>4),64!==x&&(o.push(I<<4&240|x>>2),64!==_&&o.push(x<<6&192|_))}return o},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class N extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const D=function(t){return function(t){const e=E(t);return T.encodeByteArray(e,!0)}(t).replace(/\./g,"")},a=function(t){try{return T.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function d(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:return new Date(e.getTime());case Object:void 0===t&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!g(n)||(t[n]=d(t[n],e[n]));return t}function g(t){return"__proto__"!==t}const A=()=>{try{return function w(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__||(()=>{if(typeof process>"u"||typeof process.env>"u")return;const t=process.env.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||(()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&a(t[1]);return e&&JSON.parse(e)})()}catch(t){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`)}},H=()=>{var t;return null===(t=A())||void 0===t?void 0:t.config},re=t=>{var e;return null===(e=A())||void 0===e?void 0:e[`_${t}`]};class ce{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,o)=>{n?this.reject(n):this.resolve(o),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(n):e(n,o))}}}function ke(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const o=e||"demo-project",i=t.iat||0,u=t.sub||t.user_id;if(!u)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h=Object.assign({iss:`https://securetoken.google.com/${o}`,aud:o,iat:i,exp:i+3600,auth_time:i,sub:u,user_id:u,firebase:{sign_in_provider:"custom",identities:{}}},t);return[D(JSON.stringify({alg:"none",type:"JWT"})),D(JSON.stringify(h)),""].join(".")}function G(){return typeof navigator<"u"&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function _e(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(G())}function Y(){var t;const e=null===(t=A())||void 0===t?void 0:t.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch{return!1}}function le(){return"object"==typeof self&&self.self===self}function ye(){const t="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof t&&void 0!==t.id}function Ee(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function ue(){const t=G();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function ve(){return!Y()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function we(){try{return"object"==typeof indexedDB}catch{return!1}}function Ie(){return new Promise((t,e)=>{try{let n=!0;const o="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(o);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(o),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var u;e((null===(u=i.error)||void 0===u?void 0:u.message)||"")}}catch(n){e(n)}})}class X extends Error{constructor(e,n,o){super(n),this.code=e,this.customData=o,this.name="FirebaseError",Object.setPrototypeOf(this,X.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,de.prototype.create)}}class de{constructor(e,n,o){this.service=e,this.serviceName=n,this.errors=o}create(e,...n){const o=n[0]||{},i=`${this.service}/${e}`,u=this.errors[e],h=u?function Se(t,e){return t.replace(Ae,(n,o)=>{const i=e[o];return null!=i?String(i):`<${o}?>`})}(u,o):"Error";return new X(i,`${this.serviceName}: ${h} (${i}).`,o)}}const Ae=/\{\$([^}]+)}/g;function Ce(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Oe(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function pe(t,e){if(t===e)return!0;const n=Object.keys(t),o=Object.keys(e);for(const i of n){if(!o.includes(i))return!1;const u=t[i],h=e[i];if(me(u)&&me(h)){if(!pe(u,h))return!1}else if(u!==h)return!1}for(const i of o)if(!n.includes(i))return!1;return!0}function me(t){return null!==t&&"object"==typeof t}function xe(t){const e=[];for(const[n,o]of Object.entries(t))Array.isArray(o)?o.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(o));return e.length?"&"+e.join("&"):""}function Z(t){const e={};return t.replace(/^\?/,"").split("&").forEach(o=>{if(o){const[i,u]=o.split("=");e[decodeURIComponent(i)]=decodeURIComponent(u)}}),e}function Be(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function K(t,e){const n=new be(t,e);return n.subscribe.bind(n)}class be{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(o=>{this.error(o)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,o){let i;if(void 0===e&&void 0===n&&void 0===o)throw new Error("Missing Observer.");i=function q(t,e){if("object"!=typeof t||null===t)return!1;for(const n of e)if(n in t&&"function"==typeof t[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:n,complete:o},void 0===i.next&&(i.next=ee),void 0===i.error&&(i.error=ee),void 0===i.complete&&(i.complete=ee);const u=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),u}unsubscribeOne(e){void 0===this.observers||void 0===this.observers[e]||(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{n(this.observers[e])}catch(o){typeof console<"u"&&console.error&&console.error(o)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ee(){}function Re(t){return t&&t._delegate?t._delegate:t}},9671:(oe,k,O)=>{function v(B,E,R,T,N,L,D){try{var a=B[L](D),l=a.value}catch(d){return void R(d)}a.done?E(l):Promise.resolve(l).then(T,N)}function p(B){return function(){var E=this,R=arguments;return new Promise(function(T,N){var L=B.apply(E,R);function D(l){v(L,T,N,D,a,"next",l)}function a(l){v(L,T,N,D,a,"throw",l)}D(void 0)})}}O.d(k,{Z:()=>p})},534:(oe,k,O)=>{O.r(k),O.d(k,{FirebaseError:()=>E.ZR,SDK_VERSION:()=>qe,_DEFAULT_ENTRY_NAME:()=>Z,_addComponent:()=>be,_addOrOverwriteComponent:()=>Je,_apps:()=>U,_clearComponents:()=>ie,_components:()=>K,_getProvider:()=>ee,_registerComponent:()=>q,_removeServiceInstance:()=>Ye,deleteApp:()=>Me,getApp:()=>et,getApps:()=>Ne,initializeApp:()=>Te,onLog:()=>tt,registerVersion:()=>te,setLogLevel:()=>nt});var v=O(9671),p=O(4537),B=O(7879),E=O(9058);const R=(s,r)=>r.some(c=>s instanceof c);let T,N;const a=new WeakMap,l=new WeakMap,d=new WeakMap,g=new WeakMap,w=new WeakMap;let W={get(s,r,c){if(s instanceof IDBTransaction){if("done"===r)return l.get(s);if("objectStoreNames"===r)return s.objectStoreNames||d.get(s);if("store"===r)return c.objectStoreNames[1]?void 0:c.objectStore(c.objectStoreNames[0])}return H(s[r])},set:(s,r,c)=>(s[r]=c,!0),has:(s,r)=>s instanceof IDBTransaction&&("done"===r||"store"===r)||r in s};function $e(s){return"function"==typeof s?function ae(s){return s!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?function D(){return N||(N=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}().includes(s)?function(...r){return s.apply(re(this),r),H(a.get(this))}:function(...r){return H(s.apply(re(this),r))}:function(r,...c){const f=s.call(re(this),r,...c);return d.set(f,r.sort?r.sort():[r]),H(f)}}(s):(s instanceof IDBTransaction&&function V(s){if(l.has(s))return;const r=new Promise((c,f)=>{const m=()=>{s.removeEventListener("complete",b),s.removeEventListener("error",y),s.removeEventListener("abort",y)},b=()=>{c(),m()},y=()=>{f(s.error||new DOMException("AbortError","AbortError")),m()};s.addEventListener("complete",b),s.addEventListener("error",y),s.addEventListener("abort",y)});l.set(s,r)}(s),R(s,function L(){return T||(T=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}())?new Proxy(s,W):s)}function H(s){if(s instanceof IDBRequest)return function P(s){const r=new Promise((c,f)=>{const m=()=>{s.removeEventListener("success",b),s.removeEventListener("error",y)},b=()=>{c(H(s.result)),m()},y=()=>{f(s.error),m()};s.addEventListener("success",b),s.addEventListener("error",y)});return r.then(c=>{c instanceof IDBCursor&&a.set(c,s)}).catch(()=>{}),w.set(r,s),r}(s);if(g.has(s))return g.get(s);const r=$e(s);return r!==s&&(g.set(s,r),w.set(r,s)),r}const re=s=>w.get(s),G=["get","getKey","getAll","getAllKeys","count"],_e=["put","add","delete","clear"],Y=new Map;function le(s,r){if(!(s instanceof IDBDatabase)||r in s||"string"!=typeof r)return;if(Y.get(r))return Y.get(r);const c=r.replace(/FromIndex$/,""),f=r!==c,m=_e.includes(c);if(!(c in(f?IDBIndex:IDBObjectStore).prototype)||!m&&!G.includes(c))return;const b=function(){var y=(0,v.Z)(function*(C,...S){const J=this.transaction(C,m?"readwrite":"readonly");let Pe=J.store;return f&&(Pe=Pe.index(S.shift())),(yield Promise.all([Pe[c](...S),m&&J.done]))[0]});return function(S){return y.apply(this,arguments)}}();return Y.set(r,b),b}!function A(s){W=s(W)}(s=>({...s,get:(r,c,f)=>le(r,c)||s.get(r,c,f),has:(r,c)=>!!le(r,c)||s.has(r,c)}));class ye{constructor(r){this.container=r}getPlatformInfoString(){return this.container.getProviders().map(c=>{if(function Ee(s){const r=s.getComponent();return"VERSION"===r?.type}(c)){const f=c.getImmediate();return`${f.library}/${f.version}`}return null}).filter(c=>c).join(" ")}}const fe="@firebase/app",z=new B.Yd("@firebase/app"),Z="[DEFAULT]",Be={[fe]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},U=new Map,K=new Map;function be(s,r){try{s.container.addComponent(r)}catch(c){z.debug(`Component ${r.name} failed to register with FirebaseApp ${s.name}`,c)}}function Je(s,r){s.container.addOrOverwriteComponent(r)}function q(s){const r=s.name;if(K.has(r))return z.debug(`There were multiple attempts to register component ${r}.`),!1;K.set(r,s);for(const c of U.values())be(c,s);return!0}function ee(s,r){const c=s.container.getProvider("heartbeat").getImmediate({optional:!0});return c&&c.triggerHeartbeat(),s.container.getProvider(r)}function Ye(s,r,c=Z){ee(s,r).clearInstance(c)}function ie(){K.clear()}const j=new E.LL("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});class Qe{constructor(r,c,f){this._isDeleted=!1,this._options=Object.assign({},r),this._config=Object.assign({},c),this._name=c.name,this._automaticDataCollectionEnabled=c.automaticDataCollectionEnabled,this._container=f,this.container.addComponent(new p.wA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(r){this.checkDestroyed(),this._automaticDataCollectionEnabled=r}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(r){this._isDeleted=r}checkDestroyed(){if(this.isDeleted)throw j.create("app-deleted",{appName:this._name})}}const qe="10.8.0";function Te(s,r={}){let c=s;"object"!=typeof r&&(r={name:r});const f=Object.assign({name:Z,automaticDataCollectionEnabled:!1},r),m=f.name;if("string"!=typeof m||!m)throw j.create("bad-app-name",{appName:String(m)});if(c||(c=(0,E.aH)()),!c)throw j.create("no-options");const b=U.get(m);if(b){if((0,E.vZ)(c,b.options)&&(0,E.vZ)(f,b.config))return b;throw j.create("duplicate-app",{appName:m})}const y=new p.H0(m);for(const S of K.values())y.addComponent(S);const C=new Qe(c,f,y);return U.set(m,C),C}function et(s=Z){const r=U.get(s);if(!r&&s===Z&&(0,E.aH)())return Te();if(!r)throw j.create("no-app",{appName:s});return r}function Ne(){return Array.from(U.values())}function Me(s){return se.apply(this,arguments)}function se(){return(se=(0,v.Z)(function*(s){const r=s.name;U.has(r)&&(U.delete(r),yield Promise.all(s.container.getProviders().map(c=>c.delete())),s.isDeleted=!0)})).apply(this,arguments)}function te(s,r,c){var f;let m=null!==(f=Be[s])&&void 0!==f?f:s;c&&(m+=`-${c}`);const b=m.match(/\s|\//),y=r.match(/\s|\//);if(b||y){const C=[`Unable to register library "${m}" with version "${r}":`];return b&&C.push(`library name "${m}" contains illegal characters (whitespace or "/")`),b&&y&&C.push("and"),y&&C.push(`version name "${r}" contains illegal characters (whitespace or "/")`),void z.warn(C.join(" "))}q(new p.wA(`${m}-version`,()=>({library:m,version:r}),"VERSION"))}function tt(s,r){if(null!==s&&"function"!=typeof s)throw j.create("invalid-log-argument");(0,B.Am)(s,r)}function nt(s){(0,B.Ub)(s)}const Le="firebase-heartbeat-database",Re=1,t="firebase-heartbeat-store";let e=null;function n(){return e||(e=function ce(s,r,{blocked:c,upgrade:f,blocking:m,terminated:b}={}){const y=indexedDB.open(s,r),C=H(y);return f&&y.addEventListener("upgradeneeded",S=>{f(H(y.result),S.oldVersion,S.newVersion,H(y.transaction),S)}),c&&y.addEventListener("blocked",S=>c(S.oldVersion,S.newVersion,S)),C.then(S=>{b&&S.addEventListener("close",()=>b()),m&&S.addEventListener("versionchange",J=>m(J.oldVersion,J.newVersion,J))}).catch(()=>{}),C}(Le,Re,{upgrade:(s,r)=>{if(0===r)try{s.createObjectStore(t)}catch(c){console.warn(c)}}}).catch(s=>{throw j.create("idb-open",{originalErrorMessage:s.message})})),e}function i(){return(i=(0,v.Z)(function*(s){try{const c=(yield n()).transaction(t),f=yield c.objectStore(t).get(I(s));return yield c.done,f}catch(r){if(r instanceof E.ZR)z.warn(r.message);else{const c=j.create("idb-get",{originalErrorMessage:r?.message});z.warn(c.message)}}})).apply(this,arguments)}function u(s,r){return h.apply(this,arguments)}function h(){return(h=(0,v.Z)(function*(s,r){try{const f=(yield n()).transaction(t,"readwrite");yield f.objectStore(t).put(r,I(s)),yield f.done}catch(c){if(c instanceof E.ZR)z.warn(c.message);else{const f=j.create("idb-set",{originalErrorMessage:c?.message});z.warn(f.message)}}})).apply(this,arguments)}function I(s){return`${s.name}!${s.options.appId}`}class F{constructor(r){this.container=r,this._heartbeatsCache=null;const c=this.container.getProvider("app").getImmediate();this._storage=new ne(c),this._heartbeatsCachePromise=this._storage.read().then(f=>(this._heartbeatsCache=f,f))}triggerHeartbeat(){var r=this;return(0,v.Z)(function*(){var c,f;const b=r.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),y=_();if((null!=(null===(c=r._heartbeatsCache)||void 0===c?void 0:c.heartbeats)||(r._heartbeatsCache=yield r._heartbeatsCachePromise,null!=(null===(f=r._heartbeatsCache)||void 0===f?void 0:f.heartbeats)))&&r._heartbeatsCache.lastSentHeartbeatDate!==y&&!r._heartbeatsCache.heartbeats.some(C=>C.date===y))return r._heartbeatsCache.heartbeats.push({date:y,agent:b}),r._heartbeatsCache.heartbeats=r._heartbeatsCache.heartbeats.filter(C=>{const S=new Date(C.date).valueOf();return Date.now()-S<=2592e6}),r._storage.overwrite(r._heartbeatsCache)})()}getHeartbeatsHeader(){var r=this;return(0,v.Z)(function*(){var c;if(null===r._heartbeatsCache&&(yield r._heartbeatsCachePromise),null==(null===(c=r._heartbeatsCache)||void 0===c?void 0:c.heartbeats)||0===r._heartbeatsCache.heartbeats.length)return"";const f=_(),{heartbeatsToSend:m,unsentEntries:b}=function $(s,r=1024){const c=[];let f=s.slice();for(const m of s){const b=c.find(y=>y.agent===m.agent);if(b){if(b.dates.push(m.date),ge(c)>r){b.dates.pop();break}}else if(c.push({agent:m.agent,dates:[m.date]}),ge(c)>r){c.pop();break}f=f.slice(1)}return{heartbeatsToSend:c,unsentEntries:f}}(r._heartbeatsCache.heartbeats),y=(0,E.L)(JSON.stringify({version:2,heartbeats:m}));return r._heartbeatsCache.lastSentHeartbeatDate=f,b.length>0?(r._heartbeatsCache.heartbeats=b,yield r._storage.overwrite(r._heartbeatsCache)):(r._heartbeatsCache.heartbeats=[],r._storage.overwrite(r._heartbeatsCache)),y})()}}function _(){return(new Date).toISOString().substring(0,10)}class ne{constructor(r){this.app=r,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}runIndexedDBEnvironmentCheck(){return(0,v.Z)(function*(){return!!(0,E.hl)()&&(0,E.eu)().then(()=>!0).catch(()=>!1)})()}read(){var r=this;return(0,v.Z)(function*(){if(yield r._canUseIndexedDBPromise){const f=yield function o(s){return i.apply(this,arguments)}(r.app);return f?.heartbeats?f:{heartbeats:[]}}return{heartbeats:[]}})()}overwrite(r){var c=this;return(0,v.Z)(function*(){var f;if(yield c._canUseIndexedDBPromise){const b=yield c.read();return u(c.app,{lastSentHeartbeatDate:null!==(f=r.lastSentHeartbeatDate)&&void 0!==f?f:b.lastSentHeartbeatDate,heartbeats:r.heartbeats})}})()}add(r){var c=this;return(0,v.Z)(function*(){var f;if(yield c._canUseIndexedDBPromise){const b=yield c.read();return u(c.app,{lastSentHeartbeatDate:null!==(f=r.lastSentHeartbeatDate)&&void 0!==f?f:b.lastSentHeartbeatDate,heartbeats:[...b.heartbeats,...r.heartbeats]})}})()}}function ge(s){return(0,E.L)(JSON.stringify({version:2,heartbeats:s})).length}!function rt(s){q(new p.wA("platform-logger",r=>new ye(r),"PRIVATE")),q(new p.wA("heartbeat",r=>new F(r),"PRIVATE")),te(fe,"0.9.27",s),te(fe,"0.9.27","esm2017"),te("fire-js","")}("")},4537:(oe,k,O)=>{O.d(k,{H0:()=>L,wA:()=>B});var v=O(9671),p=O(9058);class B{constructor(a,l,d){this.name=a,this.instanceFactory=l,this.type=d,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(a){return this.instantiationMode=a,this}setMultipleInstances(a){return this.multipleInstances=a,this}setServiceProps(a){return this.serviceProps=a,this}setInstanceCreatedCallback(a){return this.onInstanceCreated=a,this}}const E="[DEFAULT]";class R{constructor(a,l){this.name=a,this.container=l,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(a){const l=this.normalizeInstanceIdentifier(a);if(!this.instancesDeferred.has(l)){const d=new p.BH;if(this.instancesDeferred.set(l,d),this.isInitialized(l)||this.shouldAutoInitialize())try{const g=this.getOrInitializeService({instanceIdentifier:l});g&&d.resolve(g)}catch{}}return this.instancesDeferred.get(l).promise}getImmediate(a){var l;const d=this.normalizeInstanceIdentifier(a?.identifier),g=null!==(l=a?.optional)&&void 0!==l&&l;if(!this.isInitialized(d)&&!this.shouldAutoInitialize()){if(g)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:d})}catch(w){if(g)return null;throw w}}getComponent(){return this.component}setComponent(a){if(a.name!==this.name)throw Error(`Mismatching Component ${a.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=a,this.shouldAutoInitialize()){if(function N(D){return"EAGER"===D.instantiationMode}(a))try{this.getOrInitializeService({instanceIdentifier:E})}catch{}for(const[l,d]of this.instancesDeferred.entries()){const g=this.normalizeInstanceIdentifier(l);try{const w=this.getOrInitializeService({instanceIdentifier:g});d.resolve(w)}catch{}}}}clearInstance(a=E){this.instancesDeferred.delete(a),this.instancesOptions.delete(a),this.instances.delete(a)}delete(){var a=this;return(0,v.Z)(function*(){const l=Array.from(a.instances.values());yield Promise.all([...l.filter(d=>"INTERNAL"in d).map(d=>d.INTERNAL.delete()),...l.filter(d=>"_delete"in d).map(d=>d._delete())])})()}isComponentSet(){return null!=this.component}isInitialized(a=E){return this.instances.has(a)}getOptions(a=E){return this.instancesOptions.get(a)||{}}initialize(a={}){const{options:l={}}=a,d=this.normalizeInstanceIdentifier(a.instanceIdentifier);if(this.isInitialized(d))throw Error(`${this.name}(${d}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const g=this.getOrInitializeService({instanceIdentifier:d,options:l});for(const[w,P]of this.instancesDeferred.entries())d===this.normalizeInstanceIdentifier(w)&&P.resolve(g);return g}onInit(a,l){var d;const g=this.normalizeInstanceIdentifier(l),w=null!==(d=this.onInitCallbacks.get(g))&&void 0!==d?d:new Set;w.add(a),this.onInitCallbacks.set(g,w);const P=this.instances.get(g);return P&&a(P,g),()=>{w.delete(a)}}invokeOnInitCallbacks(a,l){const d=this.onInitCallbacks.get(l);if(d)for(const g of d)try{g(a,l)}catch{}}getOrInitializeService({instanceIdentifier:a,options:l={}}){let d=this.instances.get(a);if(!d&&this.component&&(d=this.component.instanceFactory(this.container,{instanceIdentifier:(D=a,D===E?void 0:D),options:l}),this.instances.set(a,d),this.instancesOptions.set(a,l),this.invokeOnInitCallbacks(d,a),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,a,d)}catch{}var D;return d||null}normalizeInstanceIdentifier(a=E){return this.component?this.component.multipleInstances?a:E:a}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class L{constructor(a){this.name=a,this.providers=new Map}addComponent(a){const l=this.getProvider(a.name);if(l.isComponentSet())throw new Error(`Component ${a.name} has already been registered with ${this.name}`);l.setComponent(a)}addOrOverwriteComponent(a){this.getProvider(a.name).isComponentSet()&&this.providers.delete(a.name),this.addComponent(a)}getProvider(a){if(this.providers.has(a))return this.providers.get(a);const l=new R(a,this);return this.providers.set(a,l),l}getProviders(){return Array.from(this.providers.values())}}},7879:(oe,k,O)=>{O.d(k,{Am:()=>D,Ub:()=>L,Yd:()=>N,in:()=>p});const v=[];var p=function(a){return a[a.DEBUG=0]="DEBUG",a[a.VERBOSE=1]="VERBOSE",a[a.INFO=2]="INFO",a[a.WARN=3]="WARN",a[a.ERROR=4]="ERROR",a[a.SILENT=5]="SILENT",a}(p||{});const B={debug:p.DEBUG,verbose:p.VERBOSE,info:p.INFO,warn:p.WARN,error:p.ERROR,silent:p.SILENT},E=p.INFO,R={[p.DEBUG]:"log",[p.VERBOSE]:"log",[p.INFO]:"info",[p.WARN]:"warn",[p.ERROR]:"error"},T=(a,l,...d)=>{if(l<a.logLevel)return;const g=(new Date).toISOString(),w=R[l];if(!w)throw new Error(`Attempted to log a message with an invalid logType (value: ${l})`);console[w](`[${g}]  ${a.name}:`,...d)};class N{constructor(l){this.name=l,this._logLevel=E,this._logHandler=T,this._userLogHandler=null,v.push(this)}get logLevel(){return this._logLevel}set logLevel(l){if(!(l in p))throw new TypeError(`Invalid value "${l}" assigned to \`logLevel\``);this._logLevel=l}setLogLevel(l){this._logLevel="string"==typeof l?B[l]:l}get logHandler(){return this._logHandler}set logHandler(l){if("function"!=typeof l)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=l}get userLogHandler(){return this._userLogHandler}set userLogHandler(l){this._userLogHandler=l}debug(...l){this._userLogHandler&&this._userLogHandler(this,p.DEBUG,...l),this._logHandler(this,p.DEBUG,...l)}log(...l){this._userLogHandler&&this._userLogHandler(this,p.VERBOSE,...l),this._logHandler(this,p.VERBOSE,...l)}info(...l){this._userLogHandler&&this._userLogHandler(this,p.INFO,...l),this._logHandler(this,p.INFO,...l)}warn(...l){this._userLogHandler&&this._userLogHandler(this,p.WARN,...l),this._logHandler(this,p.WARN,...l)}error(...l){this._userLogHandler&&this._userLogHandler(this,p.ERROR,...l),this._logHandler(this,p.ERROR,...l)}}function L(a){v.forEach(l=>{l.setLogLevel(a)})}function D(a,l){for(const d of v){let g=null;l&&l.level&&(g=B[l.level]),d.userLogHandler=null===a?null:(w,P,...V)=>{const W=V.map(A=>{if(null==A)return null;if("string"==typeof A)return A;if("number"==typeof A||"boolean"==typeof A)return A.toString();if(A instanceof Error)return A.message;try{return JSON.stringify(A)}catch{return null}}).filter(A=>A).join(" ");P>=(g??w.logLevel)&&a({level:p[P].toLowerCase(),message:W,args:V,type:w.name})}}}}}]);