(self.webpackChunkaccount=self.webpackChunkaccount||[]).push([[2939],{2939:(z,M,c)=>{c.r(M),c.d(M,{MAT_SNACK_BAR_DATA:()=>b,MAT_SNACK_BAR_DEFAULT_OPTIONS:()=>D,MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY:()=>C,MatSnackBar:()=>R,MatSnackBarAction:()=>g,MatSnackBarActions:()=>v,MatSnackBarConfig:()=>u,MatSnackBarContainer:()=>S,MatSnackBarLabel:()=>k,MatSnackBarModule:()=>K,MatSnackBarRef:()=>f,SimpleSnackBar:()=>A,matSnackBarAnimations:()=>E});var a=c(3731),y=c(470),_=c(3635),T=c(6571),d=c(8012),l=c(8484),O=c(2831),I=c(4300),x=c(1088),p=c(9594),w=c(5893),B=c(3122);function P(i,h){if(1&i){const t=a.\u0275\u0275getCurrentView();a.\u0275\u0275elementStart(0,"div",1)(1,"button",2),a.\u0275\u0275listener("click",function(){a.\u0275\u0275restoreView(t);const n=a.\u0275\u0275nextContext();return a.\u0275\u0275resetView(n.action())}),a.\u0275\u0275text(2),a.\u0275\u0275elementEnd()()}if(2&i){const t=a.\u0275\u0275nextContext();a.\u0275\u0275advance(2),a.\u0275\u0275textInterpolate1(" ",t.data.action," ")}}const j=["label"];function L(i,h){}const F=Math.pow(2,31)-1;class f{constructor(h,t){this._overlayRef=t,this._afterDismissed=new _.Subject,this._afterOpened=new _.Subject,this._onAction=new _.Subject,this._dismissedByAction=!1,this.containerInstance=h,h._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(h){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(h,F))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}}const b=new a.InjectionToken("MatSnackBarData");class u{constructor(){this.politeness="assertive",this.announcementMessage="",this.duration=0,this.data=null,this.horizontalPosition="center",this.verticalPosition="bottom"}}let k=(()=>{class i{static#t=this.\u0275fac=function(e){return new(e||i)};static#e=this.\u0275dir=a.\u0275\u0275defineDirective({type:i,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"],standalone:!0})}return i})(),v=(()=>{class i{static#t=this.\u0275fac=function(e){return new(e||i)};static#e=this.\u0275dir=a.\u0275\u0275defineDirective({type:i,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"],standalone:!0})}return i})(),g=(()=>{class i{static#t=this.\u0275fac=function(e){return new(e||i)};static#e=this.\u0275dir=a.\u0275\u0275defineDirective({type:i,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"],standalone:!0})}return i})(),A=(()=>{class i{constructor(t,e){this.snackBarRef=t,this.data=e}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static#t=this.\u0275fac=function(e){return new(e||i)(a.\u0275\u0275directiveInject(f),a.\u0275\u0275directiveInject(b))};static#e=this.\u0275cmp=a.\u0275\u0275defineComponent({type:i,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],standalone:!0,features:[a.\u0275\u0275StandaloneFeature],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["mat-button","","matSnackBarAction","",3,"click"]],template:function(e,n){1&e&&(a.\u0275\u0275elementStart(0,"div",0),a.\u0275\u0275text(1),a.\u0275\u0275elementEnd(),a.\u0275\u0275template(2,P,3,1,"div",1)),2&e&&(a.\u0275\u0275advance(),a.\u0275\u0275textInterpolate1(" ",n.data.message,"\n"),a.\u0275\u0275advance(),a.\u0275\u0275conditional(2,n.hasAction?2:-1))},dependencies:[y.MatButton,k,v,g],styles:[".mat-mdc-simple-snack-bar{display:flex}"],encapsulation:2,changeDetection:0})}return i})();const E={snackBarState:(0,d.trigger)("state",[(0,d.state)("void, hidden",(0,d.style)({transform:"scale(0.8)",opacity:0})),(0,d.state)("visible",(0,d.style)({transform:"scale(1)",opacity:1})),(0,d.transition)("* => visible",(0,d.animate)("150ms cubic-bezier(0, 0, 0.2, 1)")),(0,d.transition)("* => void, * => hidden",(0,d.animate)("75ms cubic-bezier(0.4, 0.0, 1, 1)",(0,d.style)({opacity:0})))])};let U=0,S=(()=>{class i extends l.en{constructor(t,e,n,s,r){super(),this._ngZone=t,this._elementRef=e,this._changeDetectorRef=n,this._platform=s,this.snackBarConfig=r,this._document=(0,a.inject)(T.DOCUMENT),this._trackedModals=new Set,this._announceDelay=150,this._destroyed=!1,this._onAnnounce=new _.Subject,this._onExit=new _.Subject,this._onEnter=new _.Subject,this._animationState="void",this._liveElementId="mat-snack-bar-container-live-"+U++,this.attachDomPortal=o=>{this._assertNotAttached();const m=this._portalOutlet.attachDomPortal(o);return this._afterPortalAttached(),m},this._live="assertive"!==r.politeness||r.announcementMessage?"off"===r.politeness?"off":"polite":"assertive",this._platform.FIREFOX&&("polite"===this._live&&(this._role="status"),"assertive"===this._live&&(this._role="alert"))}attachComponentPortal(t){this._assertNotAttached();const e=this._portalOutlet.attachComponentPortal(t);return this._afterPortalAttached(),e}attachTemplatePortal(t){this._assertNotAttached();const e=this._portalOutlet.attachTemplatePortal(t);return this._afterPortalAttached(),e}onAnimationEnd(t){const{fromState:e,toState:n}=t;if(("void"===n&&"void"!==e||"hidden"===n)&&this._completeExit(),"visible"===n){const s=this._onEnter;this._ngZone.run(()=>{s.next(),s.complete()})}}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce())}exit(){return this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId)}),this._onExit}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){const t=this._elementRef.nativeElement,e=this.snackBarConfig.panelClass;e&&(Array.isArray(e)?e.forEach(r=>t.classList.add(r)):t.classList.add(e)),this._exposeToModals();const n=this._label.nativeElement,s="mdc-snackbar__label";n.classList.toggle(s,!n.querySelector(`.${s}`))}_exposeToModals(){const t=this._liveElementId,e=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let n=0;n<e.length;n++){const s=e[n],r=s.getAttribute("aria-owns");this._trackedModals.add(s),r?-1===r.indexOf(t)&&s.setAttribute("aria-owns",r+" "+t):s.setAttribute("aria-owns",t)}}_clearFromModals(){this._trackedModals.forEach(t=>{const e=t.getAttribute("aria-owns");if(e){const n=e.replace(this._liveElementId,"").trim();n.length>0?t.setAttribute("aria-owns",n):t.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{const t=this._elementRef.nativeElement.querySelector("[aria-hidden]"),e=this._elementRef.nativeElement.querySelector("[aria-live]");if(t&&e){let n=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&t.contains(document.activeElement)&&(n=document.activeElement),t.removeAttribute("aria-hidden"),e.appendChild(t),n?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static#t=this.\u0275fac=function(e){return new(e||i)(a.\u0275\u0275directiveInject(a.NgZone),a.\u0275\u0275directiveInject(a.ElementRef),a.\u0275\u0275directiveInject(a.ChangeDetectorRef),a.\u0275\u0275directiveInject(O.t4),a.\u0275\u0275directiveInject(u))};static#e=this.\u0275cmp=a.\u0275\u0275defineComponent({type:i,selectors:[["mat-snack-bar-container"]],viewQuery:function(e,n){if(1&e&&(a.\u0275\u0275viewQuery(l.Pl,7),a.\u0275\u0275viewQuery(j,7)),2&e){let s;a.\u0275\u0275queryRefresh(s=a.\u0275\u0275loadQuery())&&(n._portalOutlet=s.first),a.\u0275\u0275queryRefresh(s=a.\u0275\u0275loadQuery())&&(n._label=s.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container","mdc-snackbar--open"],hostVars:1,hostBindings:function(e,n){1&e&&a.\u0275\u0275syntheticHostListener("@state.done",function(r){return n.onAnimationEnd(r)}),2&e&&a.\u0275\u0275syntheticHostProperty("@state",n._animationState)},standalone:!0,features:[a.\u0275\u0275InheritDefinitionFeature,a.\u0275\u0275StandaloneFeature],decls:6,vars:3,consts:[[1,"mdc-snackbar__surface"],[1,"mat-mdc-snack-bar-label"],["label",""],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(e,n){1&e&&(a.\u0275\u0275elementStart(0,"div",0)(1,"div",1,2)(3,"div",3),a.\u0275\u0275template(4,L,0,0,"ng-template",4),a.\u0275\u0275elementEnd(),a.\u0275\u0275element(5,"div"),a.\u0275\u0275elementEnd()()),2&e&&(a.\u0275\u0275advance(5),a.\u0275\u0275attribute("aria-live",n._live)("role",n._role)("id",n._liveElementId))},dependencies:[l.Pl],styles:['.mdc-snackbar{display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-snackbar__surface::before{border-color:CanvasText}}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{margin:8px;position:static}.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:100%}}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container{width:100vw}}.mat-mdc-snack-bar-container .mdc-snackbar__surface{max-width:672px}.mat-mdc-snack-bar-container .mdc-snackbar__surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{background-color:var(--mdc-snackbar-container-color)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{border-radius:var(--mdc-snackbar-container-shape)}.mat-mdc-snack-bar-container .mdc-snackbar__label{color:var(--mdc-snackbar-supporting-text-color)}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-size:var(--mdc-snackbar-supporting-text-size);font-family:var(--mdc-snackbar-supporting-text-font);font-weight:var(--mdc-snackbar-supporting-text-weight);line-height:var(--mdc-snackbar-supporting-text-line-height)}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){color:var(--mat-snack-bar-button-color);--mat-text-button-state-layer-color:currentColor;--mat-text-button-ripple-color:currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{opacity:.1}.mat-mdc-snack-bar-container .mdc-snackbar__label::before{display:none}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}'],encapsulation:2,data:{animation:[E.snackBarState]}})}return i})();function C(){return new u}const D=new a.InjectionToken("mat-snack-bar-default-options",{providedIn:"root",factory:C});let R=(()=>{class i{get _openedSnackBarRef(){const t=this._parentSnackBar;return t?t._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(t){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=t:this._snackBarRefAtThisLevel=t}constructor(t,e,n,s,r,o){this._overlay=t,this._live=e,this._injector=n,this._breakpointObserver=s,this._parentSnackBar=r,this._defaultConfig=o,this._snackBarRefAtThisLevel=null,this.simpleSnackBarComponent=A,this.snackBarContainerComponent=S,this.handsetCssClass="mat-mdc-snack-bar-handset"}openFromComponent(t,e){return this._attach(t,e)}openFromTemplate(t,e){return this._attach(t,e)}open(t,e="",n){const s={...this._defaultConfig,...n};return s.data={message:t,action:e},s.announcementMessage===t&&(s.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,s)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(t,e){const s=a.Injector.create({parent:e&&e.viewContainerRef&&e.viewContainerRef.injector||this._injector,providers:[{provide:u,useValue:e}]}),r=new l.C5(this.snackBarContainerComponent,e.viewContainerRef,s),o=t.attach(r);return o.instance.snackBarConfig=e,o.instance}_attach(t,e){const n={...new u,...this._defaultConfig,...e},s=this._createOverlay(n),r=this._attachSnackBarContainer(s,n),o=new f(r,s);if(t instanceof a.TemplateRef){const m=new l.UE(t,null,{$implicit:n.data,snackBarRef:o});o.instance=r.attachTemplatePortal(m)}else{const m=this._createInjector(n,o),N=new l.C5(t,void 0,m),W=r.attachComponentPortal(N);o.instance=W.instance}return this._breakpointObserver.observe(x.u3.HandsetPortrait).pipe((0,w.takeUntil)(s.detachments())).subscribe(m=>{s.overlayElement.classList.toggle(this.handsetCssClass,m.matches)}),n.announcementMessage&&r._onAnnounce.subscribe(()=>{this._live.announce(n.announcementMessage,n.politeness)}),this._animateSnackBar(o,n),this._openedSnackBarRef=o,this._openedSnackBarRef}_animateSnackBar(t,e){t.afterDismissed().subscribe(()=>{this._openedSnackBarRef==t&&(this._openedSnackBarRef=null),e.announcementMessage&&this._live.clear()}),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{t.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):t.containerInstance.enter(),e.duration&&e.duration>0&&t.afterOpened().subscribe(()=>t._dismissAfter(e.duration))}_createOverlay(t){const e=new p.X_;e.direction=t.direction;let n=this._overlay.position().global();const s="rtl"===t.direction,r="left"===t.horizontalPosition||"start"===t.horizontalPosition&&!s||"end"===t.horizontalPosition&&s,o=!r&&"center"!==t.horizontalPosition;return r?n.left("0"):o?n.right("0"):n.centerHorizontally(),"top"===t.verticalPosition?n.top("0"):n.bottom("0"),e.positionStrategy=n,this._overlay.create(e)}_createInjector(t,e){return a.Injector.create({parent:t&&t.viewContainerRef&&t.viewContainerRef.injector||this._injector,providers:[{provide:f,useValue:e},{provide:b,useValue:t.data}]})}static#t=this.\u0275fac=function(e){return new(e||i)(a.\u0275\u0275inject(p.aV),a.\u0275\u0275inject(I.Kd),a.\u0275\u0275inject(a.Injector),a.\u0275\u0275inject(x.Yg),a.\u0275\u0275inject(i,12),a.\u0275\u0275inject(D))};static#e=this.\u0275prov=a.\u0275\u0275defineInjectable({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})(),K=(()=>{class i{static#t=this.\u0275fac=function(e){return new(e||i)};static#e=this.\u0275mod=a.\u0275\u0275defineNgModule({type:i});static#a=this.\u0275inj=a.\u0275\u0275defineInjector({providers:[R],imports:[p.U8,l.eL,y.MatButtonModule,B.MatCommonModule,A,B.MatCommonModule]})}return i})()}}]);