"use strict";(()=>{var Ne=Object.defineProperty;var i=(t,e)=>()=>(t&&(e=t(t=0)),e);var d=(t,e)=>{for(var n in e)Ne(t,n,{get:e[n],enumerable:!0})};function w(t){let e=function(){};return e[K]=function(){return e[Ce]??=t()},new Proxy(e,De)}var K,Ce,Xt,Kt,De,lt=i(()=>{"use strict";K=Symbol("lazyFactory"),Ce=Symbol("lazyCache"),Xt=["arguments","caller","prototype"],Kt=function(t){return typeof t=="string"&&Xt.includes(t)},De={...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map(function(t){return[t,function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Reflect[t](e[K](),...r)}]})),ownKeys:function(t){let e=Reflect.ownKeys(t[K]());return Xt.forEach(function(n){return Kt(n)&&e.push(n)}),e},getOwnPropertyDescriptor:function(t,e){if(Kt(e))return Reflect.getOwnPropertyDescriptor(t,e);let n=Reflect.getOwnPropertyDescriptor(t[K](),e);return n&&Object.defineProperty(t,e,n),n}}});var Jt,_,X=i(()=>{Jt=["a","b","i"],_=new Map});function Zt(t,e,n,r,o){let a=_.get(e)?.[t];if(!a)return o?Reflect.construct(e[t],n,r):e[t].apply(r,n);for(let c of a.b.values()){let l=c.call(r,n);Array.isArray(l)&&(n=l)}let s=function(){for(var c=arguments.length,l=new Array(c),g=0;g<c;g++)l[g]=arguments[g];return o?Reflect.construct(a.o,l,r):a.o.apply(r,l)};for(let c of a.i.values()){let l=s;s=function(){for(var g=arguments.length,ut=new Array(g),y=0;y<g;y++)ut[y]=arguments[y];return c.call(r,ut,l)}}let u=s(...n);for(let c of a.a.values())u=c.call(r,n,u)??u;return u}var qt=i(()=>{X()});function Qt(t,e,n,r){let o=_.get(t),a=o?.[e];return a?.[r].has(n)?(a[r].delete(n),Jt.every(function(s){return a[s].size===0})&&(Reflect.defineProperty(t,e,{value:a.o,writable:!0,configurable:!0})||(t[e]=a.o),delete o[e]),Object.keys(o).length==0&&_.delete(t),!0):!1}var ft=i(()=>{X()});function J(t){return function(e,n,r){let o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(typeof n[e]!="function")throw new Error(`${e} is not a function in ${n.constructor.name}`);_.has(n)||_.set(n,{});let a=_.get(n);if(!a[e]){let c=n[e];a[e]={o:c,b:new Map,i:new Map,a:new Map};let l=function(y,E,B){let Te=Zt(e,n,E,y,B);return o&&u(),Te},g=new Proxy(c,{apply:function(y,E,B){return l(E,B,!1)},construct:function(y,E){return l(c,E,!0)},get:function(y,E,B){return E=="toString"?c.toString.bind(c):Reflect.get(y,E,B)}});Reflect.defineProperty(n,e,{value:g,configurable:!0,writable:!0})||(n[e]=g)}let s=Symbol(),u=function(){return Qt(n,e,s,t)};return a[e][t].set(s,r),u}}var te=i(()=>{qt();X();ft()});var ee,ne,Z,dt=i(()=>{te();ft();ee=J("b"),ne=J("i"),Z=J("a")});var ht={};d(ht,{AssetManager:()=>M,Colors:()=>p,Constants:()=>L,FluxDispatcher:()=>mt,Forms:()=>A,I18n:()=>q,NavigationNative:()=>Q,Styles:()=>pt});var M,q,A,Q,pt,p,L,mt,P=i(()=>{"use strict";h();M=b("getAssetByID"),q=b("Messages"),A=b("FormSection"),Q=b("NavigationContainer"),pt=b("createThemedStyleSheet"),p=b("unsafe_rawColors"),L=b("NODE_SIZE"),mt=b("dispatch","subscribe")});var bt={};d(bt,{_resolveReady:()=>gt,common:()=>ht,factoryCallbacks:()=>O,filters:()=>x,findByDisplayName:()=>ie,findByDisplayNameLazy:()=>Fe,findByName:()=>ae,findByNameLazy:()=>Le,findByProps:()=>j,findByPropsLazy:()=>b,findByStoreName:()=>se,findByStoreNameLazy:()=>tt,findInitializedModule:()=>R,findLazy:()=>Me,getInitializedModules:()=>oe,initMetro:()=>yt,onceReady:()=>F,waitForModule:()=>S});function re(t){return t==null||t===globalThis||typeof t=="boolean"||typeof t=="number"||typeof t=="string"||t["whar???"]===null}function Be(t){Object.defineProperty(modules,t,{value:modules[t],enumerable:!1,configurable:!0,writable:!0})}function yt(){for(let t in modules){let e=modules[t];e.factory&&Z("factory",e,function(n){let{5:r}=n;re(r)||O.forEach(function(o){return o(r)})},!0)}S(["dispatch","_actionHandlers"],function(t){let e=function(){gt(),t.unsubscribe("CONNECTION_OPEN",e)};t.subscribe("CONNECTION_OPEN",e)})}function*oe(){for(let t in modules)if(modules[t].isInitialized){if(re(modules[t].publicModule.exports)){Be(t);continue}yield modules[t].publicModule}}function S(t,e){typeof t!="function"&&(t=Array.isArray(t)?x.byProps(...t):x.byProps(t));let n=R(t);if(n)return e(n),function(){};let r=function(o){o.default&&o.__esModule&&t(o.default)&&(O.delete(r),e(o.default)),t(o)&&(O.delete(r),e(o))};return O.add(r),function(){return O.delete(r)}}function R(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;for(let{exports:n}of oe()){if(n?.default&&n.__esModule&&t(n.default))return e?n.default:n;if(t(n))return n}}function Me(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return w(function(){return R(t,e)})}function j(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return R(x.byProps(...e))}function b(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return w(function(){return j(...e)})}function ae(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return R(x.byName(t),e)}function Le(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return w(function(){return ae(t,e)})}function ie(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return R(x.byDisplayName(t),e)}function Fe(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return w(function(){return ie(t,e)})}function se(t){return R(x.byStoreName(t))}function tt(t){return w(function(){return se(t)})}var O,gt,F,x,h=i(()=>{"use strict";lt();dt();P();O=new Set,F=new Promise(function(t){return gt=t});x={byProps:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(r){return e.length===1?r[e[0]]!=null:e.every(function(o){return r?.[o]!=null})}},byName:function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return function(n){return(e?n.name:n.default?.name)===t}},byDisplayName:function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return function(n){return(e?n.displayName:n.default?.displayName)===t}},byStoreName:function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return function(n){return n._dispatcher&&(e?n:n.default)?.getName?.()===t}}}});function et(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var xt=i(()=>{});function ce(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function nt(t,e,n){return e&&ce(t.prototype,e),n&&ce(t,n),t}var wt=i(()=>{});function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var _t=i(()=>{});var St={};d(St,{readFile:()=>Et,writeFile:()=>rt});async function rt(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"pyoncord/";return void await vt.writeFile("documents",`${n}${t}`,e,"utf8")}async function Et(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"pyoncord/";try{return await vt.readFile(`${vt.getConstants().DocumentsDirPath}/${n}${t}`,"utf8")}catch{return rt(t,e),e}}var vt,Pt=i(()=>{"use strict";({RTNFileManager:vt}=ReactNative.NativeModules)});var Rt={};d(Rt,{default:()=>m,patchesInstances:()=>ot});var ot,m,I=i(()=>{"use strict";xt();wt();_t();h();dt();ot=new Map,m=function(){"use strict";function t(e){var n=this;if(et(this,t),f(this,"identifier",void 0),f(this,"patches",[]),f(this,"stopped",!1),f(this,"before",function(r,o,a){return n.addUnpatcher(ee(o,r,a))}),f(this,"after",function(r,o,a){return n.addUnpatcher(Z(o,r,a))}),f(this,"instead",function(r,o,a){return n.addUnpatcher(ne(o,r,a))}),f(this,"patch",function(r){return{before:function(o,a){return n.waitAndPatch("before",r,o,a)},after:function(o,a){return n.waitAndPatch("after",r,o,a)},instead:function(o,a){return n.waitAndPatch("instead",r,o,a)}}}),f(this,"addUnpatcher",function(r){if(n.stopped)return function(){return!1};if(typeof r!="function")throw new Error("Unpatcher must be a function");return n.patches.push(r),r}),!e||typeof e!="string")throw new Error("Patcher identifier must be a non-empty string");if(ot.has(e))throw new Error(`Patcher with identifier "${e}" already exists`);this.identifier=e,ot.set(e,this)}return nt(t,[{key:"waitAndPatch",value:function(n,r,o,a){var s=this;let u,c=S(r,function(l){if(s.stopped)return!1;u=s[n](l,o,a)});return function(){return s.addUnpatcher(c),u()}}},{key:"unpatchAllAndStop",value:function(){let n=!0;this.stopped=!0;for(let r of this.patches)try{if(r?.()===!1)throw void 0}catch{n=!1}return ot.delete(this.identifier),n}}]),t}()});var T={};d(T,{getAssetByID:()=>He,getAssetByName:()=>ze,getAssetIDByName:()=>H,patchAssets:()=>It,registeredAssets:()=>z});function It(){let t=je(M,"registerAsset",function(r,o){let[a]=r;z[a.name]={...a,id:o}}),e,n=1;for(;e=M.getAssetByID(n);)z[e.name]??={...e,id:n++};return t}var je,z,ze,He,H,at=i(()=>{"use strict";I();P();({after:je}=new m("assets-patcher")),z={};ze=function(t){return z[t]},He=function(t){return M.getAssetByID(t)},H=function(t){return z[t]?.id}});function At(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;return new Promise(function(n){let r=setInterval(function(){t()&&(clearInterval(r),n())},e)})}var ue=i(()=>{"use strict"});function N(t,e){return U(t,e,{walkable:["props","children","child","sibling"]})}var le=i(()=>{"use strict";k()});function Ot(t,e,n,r){if(!(r>n.maxDepth)&&t){try{if(e(t))return t}catch{}if(Array.isArray(t)){for(let o of t)if(!(typeof o!="object"||o===null))try{let a=Ot(o,e,n,r+1);if(a)return a}catch{}}else if(typeof t=="object"){for(let o of Object.keys(t))if(!(typeof t[o]!="object"||t[o]===null)&&!(n.walkable.length&&!n.walkable.includes(o))&&!n.ignore.includes(o))try{let a=Ot(t[o],e,n,r+1);if(a)return a}catch{}}}}function U(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return Ot(t,e,{walkable:[],ignore:[],maxDepth:100,...n},0)}var fe=i(()=>{"use strict"});async function C(t,e,n,r){let o=await e.then(function(a){return a.default});typeof n=="string"&&(n={title:n}),t.navigate("PyoncordCustomPage",{...n,render:function(){return React.createElement(o,r)}})}var de=i(()=>{"use strict"});function D(t,e){let n={get(r,o){let a=r[o];return typeof a=="object"?D(a,e):a},set(r,o,a){return r[o]=a,e(r),!0},deleteProperty(r,o){return delete r[o],e(r),!0}};return new Proxy(t,n)}var pe=i(()=>{"use strict"});var Tt={};d(Tt,{assets:()=>T,awaitUntil:()=>At,findInReactTree:()=>N,findInTree:()=>U,lazyNavigate:()=>C,observeObject:()=>D,proxyLazy:()=>w});var k=i(()=>{"use strict";at();ue();le();fe();de();pe();lt()});var Dt={};d(Dt,{_globalAwaiter:()=>Nt,default:()=>Ct});var Nt,Ct,Bt=i(()=>{"use strict";xt();wt();_t();Pt();k();Nt=Promise.resolve(),Ct=function(){"use strict";function t(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};var r=this;et(this,t),f(this,"path",void 0),f(this,"defaultData",void 0),f(this,"_cachedProxy",void 0),f(this,"_readAwaiter",void 0),f(this,"callbacks",void 0),f(this,"snapshot",void 0),f(this,"init",void 0),f(this,"subscribe",void 0),f(this,"useStorage",void 0),this.path=e,this.defaultData=n,this._cachedProxy=null,this.callbacks=new Set,this.init=async function(){return r._readAwaiter?r._readAwaiter:(r.snapshot=JSON.parse(await Et(r.path,JSON.stringify(r.defaultData))),r)},this.subscribe=function(o){return r.callbacks.add(o),function(){return r.callbacks.delete(o)}},this.useStorage=function(){let o=React.useReducer(function(a){return~a},0)[1];return React.useEffect(function(){let a=r.subscribe(o);return function(){return void a()}},[]),r.proxy},this._readAwaiter=this.init()}return nt(t,[{key:"proxy",get:function(){var e=this;if(!this.snapshot)throw new Error("StorageWrapper not initialized");return this._cachedProxy??=D(this.snapshot,async function(n){e.callbacks.forEach(function(o){return o(e.snapshot)});let r=rt(e.path,JSON.stringify(n));Nt=Nt.then(function(){return r})})}}]),t}()});var Mt={};d(Mt,{connectToDebugger:()=>it});function it(){if(v)return;v=new WebSocket("ws://localhost:9090/");let t={...pyoncord.metro,...pyoncord.utils,patcher:ke},[e,n]=[Object.keys(t),Object.values(t)];v.addEventListener("open",function(){return console.log("Connected to debug websocket")}),v.addEventListener("error",function(o){return console.error(o.message)}),v.addEventListener("message",function(o){try{new Ve(...e,`return (${o.data})`)(...n).then(console.log).catch(console.error)}catch(a){console.error(a)}});let r=Ue(globalThis,"nativeLoggingHook",function(o){let[a,s]=o;v?.readyState===WebSocket.OPEN&&v.send(JSON.stringify({level:s,message:a}))});v.addEventListener("close",function(){r(),v=null,setTimeout(it,3e3)})}var Ue,ke,v,Ve,Lt=i(()=>{"use strict";I();({before:Ue}=new m("debug-ws-patcher")),ke=new m("ws-patcher"),v=null,Ve=Object.getPrototypeOf(async function(){}).constructor});async function V(){let t,e,n=S(function(r){return typeof r?.defaultProps?.hideGiftButton=="boolean"},function(r){e=r,{hideGiftButton:t}=r.defaultProps,r.defaultProps.hideGiftButton=!0});return function(){return t!==void 0?e.defaultProps.hideGiftButton=t:n()}}var me=i(()=>{"use strict";h()});async function $(){try{await F,he.getCurrentUser().flags|=1,he._dispatcher._actionHandlers._computeOrderedActionHandlers("OVERLAY_INITIALIZE").forEach(function(t){let{name:e,actionHandler:n}=t;e.includes?.("Experiment")&&n?.({serializedExperimentStore:$e.getSerializedState(),user:{flags:1}})})}catch(t){console.error("An error occurred while patching experiments",t)}}var he,$e,ge=i(()=>{"use strict";h();he=tt("UserStore"),$e=tt("ExperimentStore")});async function G(){return await F,ye.before(mt,"dispatch",function(t){if(t[0].type==="IDLE")return[{type:"THIS_TYPE_DOES_NOT_EXIST"}]}),ye.unpatchAllAndStop}var ye,be=i(()=>{"use strict";I();h();P();ye=new m("idle-patcher")});var we={};d(we,{default:()=>xe});function xe(){let t=st.useStorage();return React.createElement(Ge,{style:{flex:1},contentContainerStyle:{paddingBottom:38}},React.createElement(Ye,{title:"Settings",titleStyleType:"no_border"},React.createElement(jt,{label:"Enable Discord's experiments menu",subLabel:"Enables the experiments menu in Discord's settings, which only staff has access to.",leading:React.createElement(Ft.Icon,{source:H("ic_badge_staff")}),value:t.experiments,onValueChange:function(e){return t.experiments=e}}),React.createElement(jt,{label:"Hide gift button on chat input",subLabel:"Hides the gift button on the chat input.",leading:React.createElement(Ft.Icon,{source:H("ic_gift_24px")}),value:t.hideGiftButton,onValueChange:function(e){return t.hideGiftButton=e}}),React.createElement(jt,{label:"Hide idle status",subLabel:"Hides the idling status when app is backgrounded.",leading:React.createElement(Ft.Icon,{source:H("StatusIdle")}),value:t.hideIdling,onValueChange:function(e){return t.hideIdling=e}})))}var Ge,Ye,Ft,jt,_e=i(()=>{"use strict";zt();P();at();({ScrollView:Ge}=ReactNative),{FormSection:Ye,FormRow:Ft,FormSwitchRow:jt}=A});var ct,ve=i(()=>{"use strict";P();ct=pt.createThemedStyleSheet({container:{flex:1},list:{paddingVertical:14,paddingHorizontal:8},card:{borderRadius:10,margin:5,backgroundColor:p.colors.BACKGROUND_TERTIARY},header:{flexDirection:"row",flexWrap:"wrap"},bodyCard:{backgroundColor:p.colors.BACKGROUND_SECONDARY,borderBottomLeftRadius:10,borderBottomRightRadius:10},bodyText:{color:p.colors.TEXT_NORMAL,paddingHorizontal:16,paddingTop:10,paddingBottom:18,textAlignVertical:"top"},actions:{justifyContent:"flex-start",flexDirection:"row",alignItems:"center",paddingLeft:16,paddingRight:12,paddingBottom:10},iconsContainer:{flexDirection:"row",justifyContent:"flex-start"},icons:{width:24,height:24,marginHorizontal:4,tintColor:p.colors.INTERACTIVE_NORMAL},headerText:{fontFamily:L.Fonts.PRIMARY_SEMIBOLD,color:p.colors.TEXT_NORMAL,fontSize:16},link:{color:p.colors.TEXT_LINK},emptyPageImage:{display:"flex",justifyContent:"center",alignItems:"center",alignSelf:"center",marginTop:"10%"},emptyPageText:{marginTop:10,color:p.colors.TEXT_NORMAL,fontFamily:L.Fonts.PRIMARY_SEMIBOLD,textAlign:"center"},search:{margin:0,marginBottom:0,paddingBottom:5,paddingRight:15,paddingLeft:15,backgroundColor:"none",borderBottomWidth:0,background:"none"},button:{height:34,paddingHorizontal:16,marginLeft:6},buttonIcon:{width:14,height:14,marginRight:6,color:p.colors.TEXT_NORMAL},invalidHeader:{flexDirection:"column",flexWrap:"wrap"},invalidInfoText:{color:p.colors.TEXT_MUTED,fontSize:12,fontWeight:"400"},warningText:{color:p.colors.TEXT_WARNING,fontFamily:L.Fonts.PRIMARY_NORMAL,fontSize:12,paddingTop:5}})});var Se={};d(Se,{default:()=>Ee});function Ee(){return React.createElement(Xe,{style:ct.container},React.createElement(We,{style:ct.emptyPageImage},React.createElement(Ke,{style:ct.emptyPageText},"Plugin system coming soon (never).")))}var We,Ke,Xe,Pe=i(()=>{"use strict";ve();({View:We,Text:Ke,ScrollView:Xe}=ReactNative)});function Je(){let{FormSection:t,FormRow:e,FormIcon:n}=A,r=Q.useNavigation(),o="Pyoncord (1b29d1d) ".trimEnd();return React.createElement(t,{key:"Pyoncord",title:o},React.createElement(e,{label:"Pyoncord",leading:React.createElement(n,{source:T.getAssetIDByName("Discord")}),trailing:e.Arrow,onPress:function(){return C(r,Promise.resolve().then(()=>(_e(),we)),"Pyoncord")}}),React.createElement(e,{label:"Plugins",leading:React.createElement(n,{source:T.getAssetIDByName("ic_progress_wrench_24px")}),trailing:e.Arrow,onPress:function(){return C(r,Promise.resolve().then(()=>(Pe(),Se)),"Plugins")}}))}function W(){Y.patch(x.byName("getScreens",!1)).after("default",function(e,n){return Object.assign(n,{PyoncordCustomPage:{title:"Pyoncord",render:function(r){let{render:o,...a}=r,s=Q.useNavigation();return React.useEffect(function(){s.setOptions({...a})},[]),React.createElement(o,null)}}})});let t=Y.patch(x.byName("UserSettingsOverviewWrapper",!1)).after("default",function(e,n){let r=N(n.props.children,function(o){return o.type?.name==="UserSettingsOverview"});Y.after(r.type.prototype,"renderSupportAndAcknowledgements",function(o,a){let{props:{children:s}}=a;try{let u=s.findIndex(function(c){return c?.type?.name==="UploadLogsButton"});u!==-1&&s.splice(u,1)}catch{}}),Y.after(r.type.prototype,"render",function(o,a){try{let s=[q.Messages.BILLING_SETTINGS,q.Messages.PREMIUM_SETTINGS],u=N(a.props.children,function(l){return l?.children?.[1]?.type===A.FormSection}).children,c=u.findIndex(function(l){return s.includes(l?.props.label)});u.splice(-~c||4,0,React.createElement(Je,null))}catch(s){console.error("An error occurred while trying to append Pyoncord's settings section. "+s?.stack)}}),t()});return function(){return Y.unpatchAllAndStop()}}var Y,Re=i(()=>{"use strict";I();h();P();k();Y=new m("settings-patcher")});var Ut={};d(Ut,{getCurrentTheme:()=>Ht});function Ht(){throw new Error("Not implemented")}var kt=i(()=>{"use strict"});async function $t(){}var Vt,Ie=i(()=>{"use strict";I();h();kt();Vt=new m("theme-patcher")});var Gt={};d(Gt,{patchChatInput:()=>V,patchExperiments:()=>$,patchIdle:()=>G,patchSettings:()=>W,patchTheme:()=>$t});var Yt=i(()=>{"use strict";me();ge();be();Re();Ie()});var Wt={};d(Wt,{Patcher:()=>Rt,SettingsAPI:()=>Dt});var Ae=i(()=>{"use strict";I();Bt()});var Oe={};d(Oe,{api:()=>Wt,debug:()=>Mt,default:()=>Ze,metro:()=>bt,native:()=>St,patches:()=>Gt,settings:()=>st,themes:()=>Ut,utils:()=>Tt});async function Ze(){yt(),it();let t=(await st.init()).proxy,e=[It(),t.experiments&&$(),t.hideGiftButton&&V(),t.hideIdling&&G(),W()];return await Promise.all(e),function(){console.log("Unloading Pyoncord..."),e.forEach(async function(n){return n&&(await n)?.()})}}var st,zt=i(()=>{"use strict";Bt();Lt();h();Yt();at();Ae();Lt();h();Pt();Yt();kt();k();st=new Ct("settings.json",{experiments:!0,hideGiftButton:!0,hideIdling:!0})});h();console.log(`Pyon! (Pyoncord, hash=1b29d1d, dev=${!1})`);async function qe(){try{window.React=j("createElement"),window.ReactNative=j("View"),window.pyoncord={...await Promise.resolve().then(()=>(zt(),Oe))},pyoncord.unload=await pyoncord.default(),delete pyoncord.default}catch(t){t=t?.stack??t,alert([`Failed to load Pyoncord.
`,"Build Hash: 1b29d1d",`Debug Build: ${!1}`,`Build Number: ${nativeModuleProxy.RTNClientInfoManager?.Build}`,t].join(`
`)),console.error(t)}}qe();})();
//# sourceURL=pyoncord