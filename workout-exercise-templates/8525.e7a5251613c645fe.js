(self.webpackChunkworkout_exercise_templates=self.webpackChunkworkout_exercise_templates||[]).push([[8525],{8337:(Q,x,h)=>{h.d(x,{Ov:()=>m,Z9:()=>p,dS:()=>f,eX:()=>L,k:()=>T,o2:()=>t,yy:()=>P});var M=h(3635),R=h(3731);class t{}function p(r){return r&&"function"==typeof r.connect&&!(r instanceof M.ConnectableObservable)}var f=function(r){return r[r.REPLACED=0]="REPLACED",r[r.INSERTED=1]="INSERTED",r[r.MOVED=2]="MOVED",r[r.REMOVED=3]="REMOVED",r}(f||{});const T=new R.InjectionToken("_ViewRepeater");class P{applyChanges(a,s,o,g,d){a.forEachOperation((u,O,S)=>{let b,C;if(null==u.previousIndex){const I=o(u,O,S);b=s.createEmbeddedView(I.templateRef,I.context,I.index),C=f.INSERTED}else null==S?(s.remove(O),C=f.REMOVED):(b=s.get(O),s.move(b,S),C=f.MOVED);d&&d({context:b?.context,operation:C,record:u})})}detach(){}}class L{constructor(){this.viewCacheSize=20,this._viewCache=[]}applyChanges(a,s,o,g,d){a.forEachOperation((u,O,S)=>{let b,C;null==u.previousIndex?(b=this._insertView(()=>o(u,O,S),S,s,g(u)),C=b?f.INSERTED:f.REPLACED):null==S?(this._detachAndCacheView(O,s),C=f.REMOVED):(b=this._moveView(O,S,s,g(u)),C=f.MOVED),d&&d({context:b?.context,operation:C,record:u})})}detach(){for(const a of this._viewCache)a.destroy();this._viewCache=[]}_insertView(a,s,o,g){const d=this._insertViewFromCache(s,o);if(d)return void(d.context.$implicit=g);const u=a();return o.createEmbeddedView(u.templateRef,u.context,u.index)}_detachAndCacheView(a,s){const o=s.detach(a);this._maybeCacheView(o,s)}_moveView(a,s,o,g){const d=o.get(a);return o.move(d,s),d.context.$implicit=g,d}_maybeCacheView(a,s){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(a);else{const o=s.indexOf(a);-1===o?a.destroy():s.remove(o)}}_insertViewFromCache(a,s){const o=this._viewCache.pop();return o&&s.insert(o,a),o||null}}class m{get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}constructor(a=!1,s,o=!0,g){this._multiple=a,this._emitChanges=o,this.compareWith=g,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new M.Subject,s&&s.length&&(a?s.forEach(d=>this._markSelected(d)):this._markSelected(s[0]),this._selectedToEmit.length=0)}select(...a){this._verifyValueAssignment(a),a.forEach(o=>this._markSelected(o));const s=this._hasQueuedChanges();return this._emitChangeEvent(),s}deselect(...a){this._verifyValueAssignment(a),a.forEach(o=>this._unmarkSelected(o));const s=this._hasQueuedChanges();return this._emitChangeEvent(),s}setSelection(...a){this._verifyValueAssignment(a);const s=this.selected,o=new Set(a);a.forEach(d=>this._markSelected(d)),s.filter(d=>!o.has(this._getConcreteValue(d,o))).forEach(d=>this._unmarkSelected(d));const g=this._hasQueuedChanges();return this._emitChangeEvent(),g}toggle(a){return this.isSelected(a)?this.deselect(a):this.select(a)}clear(a=!0){this._unmarkAll();const s=this._hasQueuedChanges();return a&&this._emitChangeEvent(),s}isSelected(a){return this._selection.has(this._getConcreteValue(a))}isEmpty(){return 0===this._selection.size}hasValue(){return!this.isEmpty()}sort(a){this._multiple&&this.selected&&this._selected.sort(a)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(a){a=this._getConcreteValue(a),this.isSelected(a)||(this._multiple||this._unmarkAll(),this.isSelected(a)||this._selection.add(a),this._emitChanges&&this._selectedToEmit.push(a))}_unmarkSelected(a){a=this._getConcreteValue(a),this.isSelected(a)&&(this._selection.delete(a),this._emitChanges&&this._deselectedToEmit.push(a))}_unmarkAll(){this.isEmpty()||this._selection.forEach(a=>this._unmarkSelected(a))}_verifyValueAssignment(a){}_hasQueuedChanges(){return!(!this._deselectedToEmit.length&&!this._selectedToEmit.length)}_getConcreteValue(a,s){if(this.compareWith){s=s??this._selection;for(let o of s)if(this.compareWith(a,o))return o;return a}return a}}},8525:(Q,x,h)=>{h.r(x),h.d(x,{MAT_SELECT_CONFIG:()=>j,MAT_SELECT_SCROLL_STRATEGY:()=>V,MAT_SELECT_SCROLL_STRATEGY_PROVIDER:()=>H,MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY:()=>U,MAT_SELECT_TRIGGER:()=>F,MatError:()=>E.MatError,MatFormField:()=>E.MatFormField,MatHint:()=>E.MatHint,MatLabel:()=>E.MatLabel,MatOptgroup:()=>p.MatOptgroup,MatOption:()=>p.MatOption,MatPrefix:()=>E.MatPrefix,MatSelect:()=>z,MatSelectChange:()=>N,MatSelectModule:()=>q,MatSelectTrigger:()=>Y,MatSuffix:()=>E.MatSuffix,matSelectAnimations:()=>I});var M=h(9594),R=h(6571),t=h(3731),p=h(3122),E=h(5077),f=h(6672),T=h(4300),P=h(9388),L=h(8337),m=h(6028),A=h(6751),D=h(3635),r=h(5893),a=h(8012);const s=["trigger"],o=["panel"];function g(l,w){if(1&l&&(t.\u0275\u0275elementStart(0,"span",9),t.\u0275\u0275text(1),t.\u0275\u0275elementEnd()),2&l){const e=t.\u0275\u0275nextContext();t.\u0275\u0275advance(),t.\u0275\u0275textInterpolate(e.placeholder)}}function d(l,w){1&l&&t.\u0275\u0275projection(0)}function u(l,w){if(1&l&&(t.\u0275\u0275elementStart(0,"span",11),t.\u0275\u0275text(1),t.\u0275\u0275elementEnd()),2&l){const e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(),t.\u0275\u0275textInterpolate(e.triggerValue)}}function O(l,w){if(1&l&&(t.\u0275\u0275elementStart(0,"span",10),t.\u0275\u0275template(1,d,1,0)(2,u,2,1),t.\u0275\u0275elementEnd()),2&l){const e=t.\u0275\u0275nextContext();t.\u0275\u0275advance(),t.\u0275\u0275conditional(1,e.customTrigger?1:2)}}function S(l,w){if(1&l){const e=t.\u0275\u0275getCurrentView();t.\u0275\u0275namespaceSVG(),t.\u0275\u0275namespaceHTML(),t.\u0275\u0275elementStart(0,"div",12,13),t.\u0275\u0275listener("@transformPanel.done",function(n){t.\u0275\u0275restoreView(e);const c=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(c._panelDoneAnimatingStream.next(n.toState))})("keydown",function(n){t.\u0275\u0275restoreView(e);const c=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(c._handleKeydown(n))}),t.\u0275\u0275projection(2,1),t.\u0275\u0275elementEnd()}if(2&l){const e=t.\u0275\u0275nextContext();t.\u0275\u0275classMapInterpolate1("mat-mdc-select-panel mdc-menu-surface mdc-menu-surface--open ",e._getPanelTheme(),""),t.\u0275\u0275property("ngClass",e.panelClass)("@transformPanel","showing"),t.\u0275\u0275attribute("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}const b=[[["mat-select-trigger"]],"*"],C=["mat-select-trigger","*"],I={transformPanelWrap:(0,a.trigger)("transformPanelWrap",[(0,a.transition)("* => void",(0,a.query)("@transformPanel",[(0,a.animateChild)()],{optional:!0}))]),transformPanel:(0,a.trigger)("transformPanel",[(0,a.state)("void",(0,a.style)({opacity:0,transform:"scale(1, 0.8)"})),(0,a.transition)("void => showing",(0,a.animate)("120ms cubic-bezier(0, 0, 0.2, 1)",(0,a.style)({opacity:1,transform:"scale(1, 1)"}))),(0,a.transition)("* => void",(0,a.animate)("100ms linear",(0,a.style)({opacity:0})))])};let K=0;const V=new t.InjectionToken("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{const l=(0,t.inject)(M.aV);return()=>l.scrollStrategies.reposition()}});function U(l){return()=>l.scrollStrategies.reposition()}const j=new t.InjectionToken("MAT_SELECT_CONFIG"),H={provide:V,deps:[M.aV],useFactory:U},F=new t.InjectionToken("MatSelectTrigger");class N{constructor(w,e){this.source=w,this.value=e}}let z=(()=>{class l{_scrollOptionIntoView(e){const i=this.options.toArray()[e];if(i){const n=this.panel.nativeElement,c=(0,p._countGroupLabelsBeforeOption)(e,this.options,this.optionGroups),_=i._getHostElement();n.scrollTop=0===e&&1===c?0:(0,p._getOptionScrollPosition)(_.offsetTop,_.offsetHeight,n.scrollTop,n.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new N(this,e)}get focused(){return this._focused||this._panelOpen}get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}get required(){return this._required??this.ngControl?.control?.hasValidator(A.Validators.required)??!1}set required(e){this._required=e,this.stateChanges.next()}get multiple(){return this._multiple}set multiple(e){this._multiple=e}get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}constructor(e,i,n,c,_,k,y,X,$,G,Z,J,ee,W){this._viewportRuler=e,this._changeDetectorRef=i,this._ngZone=n,this._elementRef=_,this._dir=k,this._parentFormField=$,this.ngControl=G,this._liveAnnouncer=ee,this._defaultOptions=W,this._positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}],this._panelOpen=!1,this._compareWith=(v,B)=>v===B,this._uid="mat-select-"+K++,this._triggerAriaLabelledBy=null,this._destroy=new D.Subject,this.stateChanges=new D.Subject,this._onChange=()=>{},this._onTouched=()=>{},this._valueId="mat-select-value-"+K++,this._panelDoneAnimatingStream=new D.Subject,this._overlayPanelClass=this._defaultOptions?.overlayPanelClass||"",this._focused=!1,this.controlType="mat-select",this.disabled=!1,this.disableRipple=!1,this.tabIndex=0,this._hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1,this._multiple=!1,this.disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1,this.ariaLabel="",this.panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto",this.optionSelectionChanges=(0,D.defer)(()=>{const v=this.options;return v?v.changes.pipe((0,r.startWith)(v),(0,r.switchMap)(()=>(0,D.merge)(...v.map(B=>B.onSelectionChange)))):this._ngZone.onStable.pipe((0,r.take)(1),(0,r.switchMap)(()=>this.optionSelectionChanges))}),this.openedChange=new t.EventEmitter,this._openedStream=this.openedChange.pipe((0,r.filter)(v=>v),(0,r.map)(()=>{})),this._closedStream=this.openedChange.pipe((0,r.filter)(v=>!v),(0,r.map)(()=>{})),this.selectionChange=new t.EventEmitter,this.valueChange=new t.EventEmitter,this._trackedModal=null,this._skipPredicate=v=>!this.panelOpen&&v.disabled,this.ngControl&&(this.ngControl.valueAccessor=this),null!=W?.typeaheadDebounceInterval&&(this.typeaheadDebounceInterval=W.typeaheadDebounceInterval),this._errorStateTracker=new p._ErrorStateTracker(c,G,X,y,this.stateChanges),this._scrollStrategyFactory=J,this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=parseInt(Z)||0,this.id=this.id}ngOnInit(){this._selectionModel=new L.Ov(this.multiple),this.stateChanges.next(),this._panelDoneAnimatingStream.pipe((0,r.distinctUntilChanged)(),(0,r.takeUntil)(this._destroy)).subscribe(()=>this._panelDoneAnimating(this.panelOpen)),this._viewportRuler.change().pipe((0,r.takeUntil)(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initKeyManager(),this._selectionModel.changed.pipe((0,r.takeUntil)(this._destroy)).subscribe(e=>{e.added.forEach(i=>i.select()),e.removed.forEach(i=>i.deselect())}),this.options.changes.pipe((0,r.startWith)(null),(0,r.takeUntil)(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){const e=this._getTriggerAriaLabelledby(),i=this.ngControl;if(e!==this._triggerAriaLabelledBy){const n=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?n.setAttribute("aria-labelledby",e):n.removeAttribute("aria-labelledby")}i&&(this._previousControl!==i.control&&(void 0!==this._previousControl&&null!==i.disabled&&i.disabled!==this.disabled&&(this.disabled=i.disabled),this._previousControl=i.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval)}ngOnDestroy(){this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}_applyModalPanelOwnership(){const e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;const i=`${this.id}-panel`;this._trackedModal&&(0,T.iD)(this._trackedModal,"aria-owns",i),(0,T.Zf)(e,"aria-owns",i),this._trackedModal=e}_clearFromModal(){this._trackedModal&&((0,T.iD)(this._trackedModal,"aria-owns",`${this.id}-panel`),this._trackedModal=null)}close(){this._panelOpen&&(this._panelOpen=!1,this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next())}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){const e=this._selectionModel.selected.map(i=>i.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return!!this._dir&&"rtl"===this._dir.value}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){const i=e.keyCode,n=i===m.JH||i===m.LH||i===m.oh||i===m.SV,c=i===m.K5||i===m.L_,_=this._keyManager;if(!_.isTyping()&&c&&!(0,m.Vb)(e)||(this.multiple||e.altKey)&&n)e.preventDefault(),this.open();else if(!this.multiple){const k=this.selected;_.onKeydown(e);const y=this.selected;y&&k!==y&&this._liveAnnouncer.announce(y.viewValue,1e4)}}_handleOpenKeydown(e){const i=this._keyManager,n=e.keyCode,c=n===m.JH||n===m.LH,_=i.isTyping();if(c&&e.altKey)e.preventDefault(),this.close();else if(_||n!==m.K5&&n!==m.L_||!i.activeItem||(0,m.Vb)(e))if(!_&&this._multiple&&n===m.A&&e.ctrlKey){e.preventDefault();const k=this.options.some(y=>!y.disabled&&!y.selected);this.options.forEach(y=>{y.disabled||(k?y.select():y.deselect())})}else{const k=i.activeItemIndex;i.onKeydown(e),this._multiple&&c&&e.shiftKey&&i.activeItem&&i.activeItemIndex!==k&&i.activeItem._selectViaInteraction()}else e.preventDefault(),i.activeItem._selectViaInteraction()}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}_onAttached(){this._overlayDir.positionChange.pipe((0,r.take)(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()})}_getPanelTheme(){return this._parentFormField?`mat-${this._parentFormField.color}`:""}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(i=>i.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(i=>this._selectOptionByValue(i)),this._sortValues();else{const i=this._selectOptionByValue(e);i?this._keyManager.updateActiveItem(i):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){const i=this.options.find(n=>{if(this._selectionModel.isSelected(n))return!1;try{return null!=n.value&&this._compareWith(n.value,e)}catch{return!1}});return i&&this._selectionModel.select(i),i}_assignValue(e){return!!(e!==this._value||this._multiple&&Array.isArray(e))&&(this.options&&this._setSelectionByValue(e),this._value=e,!0)}_getOverlayWidth(e){return"auto"===this.panelWidth?(e instanceof M.xu?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:null===this.panelWidth?"":this.panelWidth}_syncParentProperties(){if(this.options)for(const e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new T.s1(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){const e=(0,D.merge)(this.options.changes,this._destroy);this.optionSelectionChanges.pipe((0,r.takeUntil)(e)).subscribe(i=>{this._onSelect(i.source,i.isUserInput),i.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),(0,D.merge)(...this.options.map(i=>i._stateChanges)).pipe((0,r.takeUntil)(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,i){const n=this._selectionModel.isSelected(e);null!=e.value||this._multiple?(n!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),i&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),i&&this.focus())):(e.deselect(),this._selectionModel.clear(),null!=this.value&&this._propagateChanges(e.value)),n!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){const e=this.options.toArray();this._selectionModel.sort((i,n)=>this.sortComparator?this.sortComparator(i,n,e):e.indexOf(i)-e.indexOf(n)),this.stateChanges.next()}}_propagateChanges(e){let i;i=this.multiple?this.selected.map(n=>n.value):this.selected?this.selected.value:e,this._value=i,this.valueChange.emit(i),this._onChange(i),this.selectionChange.emit(this._getChangeEvent(i)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let i=0;i<this.options.length;i++)if(!this.options.get(i).disabled){e=i;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;const e=this._parentFormField?.getLabelId();return this.ariaLabelledby?(e?e+" ":"")+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;const e=this._parentFormField?.getLabelId();let i=(e?e+" ":"")+this._valueId;return this.ariaLabelledby&&(i+=" "+this.ariaLabelledby),i}_panelDoneAnimating(e){this.openedChange.emit(e)}setDescribedByIds(e){e.length?this._elementRef.nativeElement.setAttribute("aria-describedby",e.join(" ")):this._elementRef.nativeElement.removeAttribute("aria-describedby")}onContainerClick(){this.focus(),this.open()}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static#e=this.\u0275fac=function(i){return new(i||l)(t.\u0275\u0275directiveInject(f.rL),t.\u0275\u0275directiveInject(t.ChangeDetectorRef),t.\u0275\u0275directiveInject(t.NgZone),t.\u0275\u0275directiveInject(p.ErrorStateMatcher),t.\u0275\u0275directiveInject(t.ElementRef),t.\u0275\u0275directiveInject(P.Is,8),t.\u0275\u0275directiveInject(A.NgForm,8),t.\u0275\u0275directiveInject(A.FormGroupDirective,8),t.\u0275\u0275directiveInject(E.MAT_FORM_FIELD,8),t.\u0275\u0275directiveInject(A.NgControl,10),t.\u0275\u0275injectAttribute("tabindex"),t.\u0275\u0275directiveInject(V),t.\u0275\u0275directiveInject(T.Kd),t.\u0275\u0275directiveInject(j,8))};static#t=this.\u0275cmp=t.\u0275\u0275defineComponent({type:l,selectors:[["mat-select"]],contentQueries:function(i,n,c){if(1&i&&(t.\u0275\u0275contentQuery(c,F,5),t.\u0275\u0275contentQuery(c,p.MatOption,5),t.\u0275\u0275contentQuery(c,p.MAT_OPTGROUP,5)),2&i){let _;t.\u0275\u0275queryRefresh(_=t.\u0275\u0275loadQuery())&&(n.customTrigger=_.first),t.\u0275\u0275queryRefresh(_=t.\u0275\u0275loadQuery())&&(n.options=_),t.\u0275\u0275queryRefresh(_=t.\u0275\u0275loadQuery())&&(n.optionGroups=_)}},viewQuery:function(i,n){if(1&i&&(t.\u0275\u0275viewQuery(s,5),t.\u0275\u0275viewQuery(o,5),t.\u0275\u0275viewQuery(M.pI,5)),2&i){let c;t.\u0275\u0275queryRefresh(c=t.\u0275\u0275loadQuery())&&(n.trigger=c.first),t.\u0275\u0275queryRefresh(c=t.\u0275\u0275loadQuery())&&(n.panel=c.first),t.\u0275\u0275queryRefresh(c=t.\u0275\u0275loadQuery())&&(n._overlayDir=c.first)}},hostAttrs:["role","combobox","aria-autocomplete","none","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:19,hostBindings:function(i,n){1&i&&t.\u0275\u0275listener("keydown",function(_){return n._handleKeydown(_)})("focus",function(){return n._onFocus()})("blur",function(){return n._onBlur()}),2&i&&(t.\u0275\u0275attribute("id",n.id)("tabindex",n.disabled?-1:n.tabIndex)("aria-controls",n.panelOpen?n.id+"-panel":null)("aria-expanded",n.panelOpen)("aria-label",n.ariaLabel||null)("aria-required",n.required.toString())("aria-disabled",n.disabled.toString())("aria-invalid",n.errorState)("aria-activedescendant",n._getAriaActiveDescendant()),t.\u0275\u0275classProp("mat-mdc-select-disabled",n.disabled)("mat-mdc-select-invalid",n.errorState)("mat-mdc-select-required",n.required)("mat-mdc-select-empty",n.empty)("mat-mdc-select-multiple",n.multiple))},inputs:{userAriaDescribedBy:[t.\u0275\u0275InputFlags.None,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"disabled","disabled",t.booleanAttribute],disableRipple:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"disableRipple","disableRipple",t.booleanAttribute],tabIndex:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"tabIndex","tabIndex",e=>null==e?0:(0,t.numberAttribute)(e)],hideSingleSelectionIndicator:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",t.booleanAttribute],placeholder:"placeholder",required:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"required","required",t.booleanAttribute],multiple:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"multiple","multiple",t.booleanAttribute],disableOptionCentering:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"disableOptionCentering","disableOptionCentering",t.booleanAttribute],compareWith:"compareWith",value:"value",ariaLabel:[t.\u0275\u0275InputFlags.None,"aria-label","ariaLabel"],ariaLabelledby:[t.\u0275\u0275InputFlags.None,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"typeaheadDebounceInterval","typeaheadDebounceInterval",t.numberAttribute],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth"},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],standalone:!0,features:[t.\u0275\u0275ProvidersFeature([{provide:E.MatFormFieldControl,useExisting:l},{provide:p.MAT_OPTION_PARENT_COMPONENT,useExisting:l}]),t.\u0275\u0275InputTransformsFeature,t.\u0275\u0275NgOnChangesFeature,t.\u0275\u0275StandaloneFeature],ngContentSelectors:C,decls:11,vars:8,consts:[["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],[1,"mat-mdc-select-value"],["class","mat-mdc-select-placeholder mat-mdc-select-min-line"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayLockPosition","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayOpen","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","backdropClick","attach","detach"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",3,"ngClass","keydown"],["panel",""]],template:function(i,n){if(1&i&&(t.\u0275\u0275projectionDef(b),t.\u0275\u0275elementStart(0,"div",0,1),t.\u0275\u0275listener("click",function(){return n.open()}),t.\u0275\u0275elementStart(3,"div",2),t.\u0275\u0275template(4,g,2,1,"span",3)(5,O,3,1),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(6,"div",4)(7,"div",5),t.\u0275\u0275namespaceSVG(),t.\u0275\u0275elementStart(8,"svg",6),t.\u0275\u0275element(9,"path",7),t.\u0275\u0275elementEnd()()()(),t.\u0275\u0275template(10,S,3,9,"ng-template",8),t.\u0275\u0275listener("backdropClick",function(){return n.close()})("attach",function(){return n._onAttached()})("detach",function(){return n.close()})),2&i){const c=t.\u0275\u0275reference(1);t.\u0275\u0275advance(3),t.\u0275\u0275attribute("id",n._valueId),t.\u0275\u0275advance(),t.\u0275\u0275conditional(4,n.empty?4:5),t.\u0275\u0275advance(6),t.\u0275\u0275property("cdkConnectedOverlayPanelClass",n._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",n._scrollStrategy)("cdkConnectedOverlayOrigin",n._preferredOverlayOrigin||c)("cdkConnectedOverlayOpen",n.panelOpen)("cdkConnectedOverlayPositions",n._positions)("cdkConnectedOverlayWidth",n._overlayWidth)}},dependencies:[M.xu,M.pI,R.NgClass],styles:['.mat-mdc-select{display:inline-block;width:100%;outline:none;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-select-enabled-trigger-text-color);font-family:var(--mat-select-trigger-text-font);line-height:var(--mat-select-trigger-text-line-height);font-size:var(--mat-select-trigger-text-size);font-weight:var(--mat-select-trigger-text-weight);letter-spacing:var(--mat-select-trigger-text-tracking)}.mat-mdc-select-disabled{color:var(--mat-select-disabled-trigger-text-color)}.mat-mdc-select-trigger{display:inline-flex;align-items:center;cursor:pointer;position:relative;box-sizing:border-box;width:100%}.mat-mdc-select-disabled .mat-mdc-select-trigger{-webkit-user-select:none;user-select:none;cursor:default}.mat-mdc-select-value{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-mdc-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-mdc-select-arrow-wrapper{height:24px;flex-shrink:0;display:inline-flex;align-items:center}.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper{transform:translateY(-8px)}.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper{transform:none}.mat-mdc-select-arrow{width:10px;height:5px;position:relative;color:var(--mat-select-enabled-arrow-color)}.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow{color:var(--mat-select-focused-arrow-color)}.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow{color:var(--mat-select-invalid-arrow-color)}.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow{color:var(--mat-select-disabled-arrow-color)}.mat-mdc-select-arrow svg{fill:currentColor;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.cdk-high-contrast-active .mat-mdc-select-arrow svg{fill:CanvasText}.mat-mdc-select-disabled .cdk-high-contrast-active .mat-mdc-select-arrow svg{fill:GrayText}div.mat-mdc-select-panel{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);width:100%;max-height:275px;outline:0;overflow:auto;padding:8px 0;border-radius:4px;box-sizing:border-box;position:static;background-color:var(--mat-select-panel-background-color)}.cdk-high-contrast-active div.mat-mdc-select-panel{outline:solid 1px}.cdk-overlay-pane:not(.mat-mdc-select-panel-above) div.mat-mdc-select-panel{border-top-left-radius:0;border-top-right-radius:0;transform-origin:top center}.mat-mdc-select-panel-above div.mat-mdc-select-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:bottom center}.mat-mdc-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);color:var(--mat-select-placeholder-text-color)}._mat-animation-noopable .mat-mdc-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-mdc-select-placeholder{color:rgba(0,0,0,0);-webkit-text-fill-color:rgba(0,0,0,0);transition:none;display:block}.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper{cursor:pointer}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label{max-width:calc(100% - 18px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 24px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch{max-width:calc(100% - 24px)}.mat-mdc-select-min-line:empty::before{content:" ";white-space:pre;width:1px;display:inline-block;visibility:hidden}'],encapsulation:2,data:{animation:[I.transformPanel]},changeDetection:0})}return l})(),Y=(()=>{class l{static#e=this.\u0275fac=function(i){return new(i||l)};static#t=this.\u0275dir=t.\u0275\u0275defineDirective({type:l,selectors:[["mat-select-trigger"]],standalone:!0,features:[t.\u0275\u0275ProvidersFeature([{provide:F,useExisting:l}])]})}return l})(),q=(()=>{class l{static#e=this.\u0275fac=function(i){return new(i||l)};static#t=this.\u0275mod=t.\u0275\u0275defineNgModule({type:l});static#i=this.\u0275inj=t.\u0275\u0275defineInjector({providers:[H],imports:[R.CommonModule,M.U8,p.MatOptionModule,p.MatCommonModule,f.ZD,E.MatFormFieldModule,p.MatOptionModule,p.MatCommonModule]})}return l})()}}]);