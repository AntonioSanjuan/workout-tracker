(self.webpackChunkshell=self.webpackChunkshell||[]).push([[1476],{1476:(F,g,s)=>{s.r(g),s.d(g,{MAT_PAGINATOR_DEFAULT_OPTIONS:()=>b,MAT_PAGINATOR_INTL_PROVIDER:()=>h,MAT_PAGINATOR_INTL_PROVIDER_FACTORY:()=>_,MatPaginator:()=>P,MatPaginatorIntl:()=>l,MatPaginatorModule:()=>A,PageEvent:()=>L});var t=s(3731),x=s(3635),d=s(470),c=s(5189),m=s(9565),I=s(5077),u=s(3122);function T(i,r){if(1&i&&(t.\u0275\u0275elementStart(0,"mat-option",18),t.\u0275\u0275text(1),t.\u0275\u0275elementEnd()),2&i){const e=r.$implicit;t.\u0275\u0275property("value",e),t.\u0275\u0275advance(),t.\u0275\u0275textInterpolate1(" ",e," ")}}function S(i,r){if(1&i){const e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"mat-form-field",16)(1,"mat-select",17),t.\u0275\u0275listener("selectionChange",function(a){t.\u0275\u0275restoreView(e);const o=t.\u0275\u0275nextContext(2);return t.\u0275\u0275resetView(o._changePageSize(a.value))}),t.\u0275\u0275repeaterCreate(2,T,2,2,"mat-option",18,t.\u0275\u0275repeaterTrackByIdentity),t.\u0275\u0275elementEnd()()}if(2&i){const e=t.\u0275\u0275nextContext(2);t.\u0275\u0275property("appearance",e._formFieldAppearance)("color",e.color),t.\u0275\u0275advance(),t.\u0275\u0275property("value",e.pageSize)("disabled",e.disabled)("aria-labelledby",e._pageSizeLabelId)("panelClass",e.selectConfig.panelClass||"")("disableOptionCentering",e.selectConfig.disableOptionCentering),t.\u0275\u0275advance(),t.\u0275\u0275repeater(e._displayedPageSizeOptions)}}function z(i,r){if(1&i&&(t.\u0275\u0275elementStart(0,"div",19),t.\u0275\u0275text(1),t.\u0275\u0275elementEnd()),2&i){const e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(),t.\u0275\u0275textInterpolate(e.pageSize)}}function M(i,r){if(1&i&&(t.\u0275\u0275elementStart(0,"div",12)(1,"div",13),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(3,S,4,7,"mat-form-field",14)(4,z,2,1,"div",15),t.\u0275\u0275elementEnd()),2&i){const e=t.\u0275\u0275nextContext();t.\u0275\u0275advance(),t.\u0275\u0275attribute("id",e._pageSizeLabelId),t.\u0275\u0275advance(),t.\u0275\u0275textInterpolate1(" ",e._intl.itemsPerPageLabel," "),t.\u0275\u0275advance(),t.\u0275\u0275conditional(3,e._displayedPageSizeOptions.length>1?3:-1),t.\u0275\u0275advance(),t.\u0275\u0275conditional(4,e._displayedPageSizeOptions.length<=1?4:-1)}}function O(i,r){if(1&i){const e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",20),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);const a=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(a.firstPage())}),t.\u0275\u0275namespaceSVG(),t.\u0275\u0275elementStart(1,"svg",7),t.\u0275\u0275element(2,"path",21),t.\u0275\u0275elementEnd()()}if(2&i){const e=t.\u0275\u0275nextContext();t.\u0275\u0275property("matTooltip",e._intl.firstPageLabel)("matTooltipDisabled",e._previousButtonsDisabled())("matTooltipPosition","above")("disabled",e._previousButtonsDisabled()),t.\u0275\u0275attribute("aria-label",e._intl.firstPageLabel)}}function D(i,r){if(1&i){const e=t.\u0275\u0275getCurrentView();t.\u0275\u0275namespaceSVG(),t.\u0275\u0275namespaceHTML(),t.\u0275\u0275elementStart(0,"button",22),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);const a=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(a.lastPage())}),t.\u0275\u0275namespaceSVG(),t.\u0275\u0275elementStart(1,"svg",7),t.\u0275\u0275element(2,"path",23),t.\u0275\u0275elementEnd()()}if(2&i){const e=t.\u0275\u0275nextContext();t.\u0275\u0275property("matTooltip",e._intl.lastPageLabel)("matTooltipDisabled",e._nextButtonsDisabled())("matTooltipPosition","above")("disabled",e._nextButtonsDisabled()),t.\u0275\u0275attribute("aria-label",e._intl.lastPageLabel)}}let l=(()=>{class i{constructor(){this.changes=new x.Subject,this.itemsPerPageLabel="Items per page:",this.nextPageLabel="Next page",this.previousPageLabel="Previous page",this.firstPageLabel="First page",this.lastPageLabel="Last page",this.getRangeLabel=(e,n,a)=>{if(0==a||0==n)return`0 of ${a}`;const o=e*n;return`${o+1} \u2013 ${o<(a=Math.max(a,0))?Math.min(o+n,a):o+n} of ${a}`}}static#t=this.\u0275fac=function(n){return new(n||i)};static#e=this.\u0275prov=t.\u0275\u0275defineInjectable({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function _(i){return i||new l}const h={provide:l,deps:[[new t.Optional,new t.SkipSelf,l]],useFactory:_};class L{}const b=new t.InjectionToken("MAT_PAGINATOR_DEFAULT_OPTIONS"),E=(0,u.mixinInitialized)(class{});let y=0,P=(()=>{class i extends E{get pageIndex(){return this._pageIndex}set pageIndex(e){this._pageIndex=Math.max(e||0,0),this._changeDetectorRef.markForCheck()}get length(){return this._length}set length(e){this._length=e||0,this._changeDetectorRef.markForCheck()}get pageSize(){return this._pageSize}set pageSize(e){this._pageSize=Math.max(e||0,0),this._updateDisplayedPageSizeOptions()}get pageSizeOptions(){return this._pageSizeOptions}set pageSizeOptions(e){this._pageSizeOptions=(e||[]).map(n=>(0,t.numberAttribute)(n,0)),this._updateDisplayedPageSizeOptions()}constructor(e,n,a){if(super(),this._intl=e,this._changeDetectorRef=n,this._pageSizeLabelId="mat-paginator-page-size-label-"+y++,this._pageIndex=0,this._length=0,this._pageSizeOptions=[],this.hidePageSize=!1,this.showFirstLastButtons=!1,this.selectConfig={},this.disabled=!1,this.page=new t.EventEmitter,this._intlChanges=e.changes.subscribe(()=>this._changeDetectorRef.markForCheck()),a){const{pageSize:o,pageSizeOptions:p,hidePageSize:f,showFirstLastButtons:v}=a;null!=o&&(this._pageSize=o),null!=p&&(this._pageSizeOptions=p),null!=f&&(this.hidePageSize=f),null!=v&&(this.showFirstLastButtons=v)}this._formFieldAppearance=a?.formFieldAppearance||"outline"}ngOnInit(){this._initialized=!0,this._updateDisplayedPageSizeOptions(),this._markInitialized()}ngOnDestroy(){this._intlChanges.unsubscribe()}nextPage(){if(!this.hasNextPage())return;const e=this.pageIndex;this.pageIndex=this.pageIndex+1,this._emitPageEvent(e)}previousPage(){if(!this.hasPreviousPage())return;const e=this.pageIndex;this.pageIndex=this.pageIndex-1,this._emitPageEvent(e)}firstPage(){if(!this.hasPreviousPage())return;const e=this.pageIndex;this.pageIndex=0,this._emitPageEvent(e)}lastPage(){if(!this.hasNextPage())return;const e=this.pageIndex;this.pageIndex=this.getNumberOfPages()-1,this._emitPageEvent(e)}hasPreviousPage(){return this.pageIndex>=1&&0!=this.pageSize}hasNextPage(){const e=this.getNumberOfPages()-1;return this.pageIndex<e&&0!=this.pageSize}getNumberOfPages(){return this.pageSize?Math.ceil(this.length/this.pageSize):0}_changePageSize(e){const a=this.pageIndex;this.pageIndex=Math.floor(this.pageIndex*this.pageSize/e)||0,this.pageSize=e,this._emitPageEvent(a)}_nextButtonsDisabled(){return this.disabled||!this.hasNextPage()}_previousButtonsDisabled(){return this.disabled||!this.hasPreviousPage()}_updateDisplayedPageSizeOptions(){this._initialized&&(this.pageSize||(this._pageSize=0!=this.pageSizeOptions.length?this.pageSizeOptions[0]:50),this._displayedPageSizeOptions=this.pageSizeOptions.slice(),-1===this._displayedPageSizeOptions.indexOf(this.pageSize)&&this._displayedPageSizeOptions.push(this.pageSize),this._displayedPageSizeOptions.sort((e,n)=>e-n),this._changeDetectorRef.markForCheck())}_emitPageEvent(e){this.page.emit({previousPageIndex:e,pageIndex:this.pageIndex,pageSize:this.pageSize,length:this.length})}static#t=this.\u0275fac=function(n){return new(n||i)(t.\u0275\u0275directiveInject(l),t.\u0275\u0275directiveInject(t.ChangeDetectorRef),t.\u0275\u0275directiveInject(b,8))};static#e=this.\u0275cmp=t.\u0275\u0275defineComponent({type:i,selectors:[["mat-paginator"]],hostAttrs:["role","group",1,"mat-mdc-paginator"],inputs:{color:"color",pageIndex:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"pageIndex","pageIndex",t.numberAttribute],length:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"length","length",t.numberAttribute],pageSize:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"pageSize","pageSize",t.numberAttribute],pageSizeOptions:"pageSizeOptions",hidePageSize:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"hidePageSize","hidePageSize",t.booleanAttribute],showFirstLastButtons:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"showFirstLastButtons","showFirstLastButtons",t.booleanAttribute],selectConfig:"selectConfig",disabled:[t.\u0275\u0275InputFlags.HasDecoratorInputTransform,"disabled","disabled",t.booleanAttribute]},outputs:{page:"page"},exportAs:["matPaginator"],standalone:!0,features:[t.\u0275\u0275InputTransformsFeature,t.\u0275\u0275InheritDefinitionFeature,t.\u0275\u0275StandaloneFeature],decls:14,vars:14,consts:[[1,"mat-mdc-paginator-outer-container"],[1,"mat-mdc-paginator-container"],["class","mat-mdc-paginator-page-size"],[1,"mat-mdc-paginator-range-actions"],["aria-live","polite",1,"mat-mdc-paginator-range-label"],["mat-icon-button","","type","button","class","mat-mdc-paginator-navigation-first",3,"matTooltip","matTooltipDisabled","matTooltipPosition","disabled"],["mat-icon-button","","type","button",1,"mat-mdc-paginator-navigation-previous",3,"matTooltip","matTooltipDisabled","matTooltipPosition","disabled","click"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true",1,"mat-mdc-paginator-icon"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["mat-icon-button","","type","button",1,"mat-mdc-paginator-navigation-next",3,"matTooltip","matTooltipDisabled","matTooltipPosition","disabled","click"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],["mat-icon-button","","type","button","class","mat-mdc-paginator-navigation-last",3,"matTooltip","matTooltipDisabled","matTooltipPosition","disabled"],[1,"mat-mdc-paginator-page-size"],[1,"mat-mdc-paginator-page-size-label"],["class","mat-mdc-paginator-page-size-select",3,"appearance","color"],["class","mat-mdc-paginator-page-size-value"],[1,"mat-mdc-paginator-page-size-select",3,"appearance","color"],["hideSingleSelectionIndicator","",3,"value","disabled","aria-labelledby","panelClass","disableOptionCentering","selectionChange"],[3,"value"],[1,"mat-mdc-paginator-page-size-value"],["mat-icon-button","","type","button",1,"mat-mdc-paginator-navigation-first",3,"matTooltip","matTooltipDisabled","matTooltipPosition","disabled","click"],["d","M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"],["mat-icon-button","","type","button",1,"mat-mdc-paginator-navigation-last",3,"matTooltip","matTooltipDisabled","matTooltipPosition","disabled","click"],["d","M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],template:function(n,a){1&n&&(t.\u0275\u0275elementStart(0,"div",0)(1,"div",1),t.\u0275\u0275template(2,M,5,4,"div",2),t.\u0275\u0275elementStart(3,"div",3)(4,"div",4),t.\u0275\u0275text(5),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(6,O,3,5,"button",5),t.\u0275\u0275elementStart(7,"button",6),t.\u0275\u0275listener("click",function(){return a.previousPage()}),t.\u0275\u0275namespaceSVG(),t.\u0275\u0275elementStart(8,"svg",7),t.\u0275\u0275element(9,"path",8),t.\u0275\u0275elementEnd()(),t.\u0275\u0275namespaceHTML(),t.\u0275\u0275elementStart(10,"button",9),t.\u0275\u0275listener("click",function(){return a.nextPage()}),t.\u0275\u0275namespaceSVG(),t.\u0275\u0275elementStart(11,"svg",7),t.\u0275\u0275element(12,"path",10),t.\u0275\u0275elementEnd()(),t.\u0275\u0275template(13,D,3,5,"button",11),t.\u0275\u0275elementEnd()()()),2&n&&(t.\u0275\u0275advance(2),t.\u0275\u0275conditional(2,a.hidePageSize?-1:2),t.\u0275\u0275advance(3),t.\u0275\u0275textInterpolate1(" ",a._intl.getRangeLabel(a.pageIndex,a.pageSize,a.length)," "),t.\u0275\u0275advance(),t.\u0275\u0275conditional(6,a.showFirstLastButtons?6:-1),t.\u0275\u0275advance(),t.\u0275\u0275property("matTooltip",a._intl.previousPageLabel)("matTooltipDisabled",a._previousButtonsDisabled())("matTooltipPosition","above")("disabled",a._previousButtonsDisabled()),t.\u0275\u0275attribute("aria-label",a._intl.previousPageLabel),t.\u0275\u0275advance(3),t.\u0275\u0275property("matTooltip",a._intl.nextPageLabel)("matTooltipDisabled",a._nextButtonsDisabled())("matTooltipPosition","above")("disabled",a._nextButtonsDisabled()),t.\u0275\u0275attribute("aria-label",a._intl.nextPageLabel),t.\u0275\u0275advance(3),t.\u0275\u0275conditional(13,a.showFirstLastButtons?13:-1))},dependencies:[I.MatFormField,c.MatSelect,u.MatOption,d.MatIconButton,m.MatTooltip],styles:[".mat-mdc-paginator{display:block;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-paginator-container-text-color);background-color:var(--mat-paginator-container-background-color);font-family:var(--mat-paginator-container-text-font);line-height:var(--mat-paginator-container-text-line-height);font-size:var(--mat-paginator-container-text-size);font-weight:var(--mat-paginator-container-text-weight);letter-spacing:var(--mat-paginator-container-text-tracking)}.mat-mdc-paginator .mat-mdc-select-value{font-size:var(--mat-paginator-select-trigger-text-size)}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap;width:100%;min-height:var(--mat-paginator-container-size)}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:84px}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px;fill:var(--mat-paginator-enabled-icon-color)}.mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon{fill:var(--mat-paginator-disabled-icon-color)}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon,.cdk-high-contrast-active .mat-mdc-paginator-icon{fill:currentColor;fill:CanvasText}.cdk-high-contrast-active .mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}"],encapsulation:2,changeDetection:0})}return i})(),A=(()=>{class i{static#t=this.\u0275fac=function(n){return new(n||i)};static#e=this.\u0275mod=t.\u0275\u0275defineNgModule({type:i});static#a=this.\u0275inj=t.\u0275\u0275defineInjector({providers:[h],imports:[d.MatButtonModule,c.MatSelectModule,m.MatTooltipModule,P]})}return i})()}}]);