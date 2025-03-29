import{g as S,j as E,r as A,k as _,l as N,m as T,n as U,p as F,q as I,s as w,v as L,x as D,y as k,z as x,A as j,B as H,C as V,D as z,E as M,F as W,G}from"./Dh7W40zv.js";async function B(t,a=S()){const{path:v,matched:p}=a.resolve(t);if(!p.length||(a._routePreloaded||(a._routePreloaded=new Set),a._routePreloaded.has(v)))return;const g=a._preloadPromises||(a._preloadPromises=[]);if(g.length>4)return Promise.all(g).then(()=>B(t,a));a._routePreloaded.add(v);const e=p.map(n=>{var o;return(o=n.components)==null?void 0:o.default}).filter(n=>typeof n=="function");for(const n of e){const o=Promise.resolve(n()).catch(()=>{}).finally(()=>g.splice(g.indexOf(o)));g.push(o)}await Promise.all(g)}const $=(...t)=>t.find(a=>a!==void 0);function Q(t){const a=t.componentName||"NuxtLink";function v(e){return typeof e=="string"&&e.startsWith("#")}function p(e,n){if(!e||t.trailingSlash!=="append"&&t.trailingSlash!=="remove")return e;if(typeof e=="string")return O(e,t.trailingSlash);const o="path"in e&&e.path!==void 0?e.path:n(e).path;return{...e,name:void 0,path:O(o,t.trailingSlash)}}function g(e){const n=S(),o=V(),u=x(()=>!!e.target&&e.target!=="_self"),d=x(()=>{const f=e.to||e.href||"";return typeof f=="string"&&j(f,{acceptRelative:!0})}),R=L("RouterLink"),y=typeof R!="string"?R.useLink:void 0,m=x(()=>{if(e.external)return!0;const f=e.to||e.href||"";return typeof f=="object"?!1:f===""||d.value}),r=x(()=>{const f=e.to||e.href||"";return m.value?f:p(f,n.resolve)}),c=m.value||y==null?void 0:y({...e,to:r}),b=x(()=>{var f;if(!r.value||d.value||v(r.value))return r.value;if(m.value){const C=typeof r.value=="object"&&"path"in r.value?k(r.value):r.value,P=typeof C=="object"?n.resolve(C).href:C;return p(P,n.resolve)}return typeof r.value=="object"?((f=n.resolve(r.value))==null?void 0:f.href)??null:p(H(o.app.baseURL,r.value),n.resolve)});return{to:r,hasTarget:u,isAbsoluteUrl:d,isExternal:m,href:b,isActive:(c==null?void 0:c.isActive)??x(()=>r.value===n.currentRoute.value.path),isExactActive:(c==null?void 0:c.isExactActive)??x(()=>r.value===n.currentRoute.value.path),route:(c==null?void 0:c.route)??x(()=>n.resolve(r.value)),async navigate(f){await z(b.value,{replace:e.replace,external:m.value||u.value})}}}return E({name:a,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},prefetchOn:{type:[String,Object],default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},useLink:g,setup(e,{slots:n}){const o=S(),{to:u,href:d,navigate:R,isExternal:y,hasTarget:m,isAbsoluteUrl:r}=g(e),c=A(!1),b=A(null),f=l=>{var s;b.value=e.custom?(s=l==null?void 0:l.$el)==null?void 0:s.nextElementSibling:l==null?void 0:l.$el};function C(l){var s,i;return!c.value&&(typeof e.prefetchOn=="string"?e.prefetchOn===l:((s=e.prefetchOn)==null?void 0:s[l])??((i=t.prefetchOn)==null?void 0:i[l]))&&(e.prefetch??t.prefetch)!==!1&&e.noPrefetch!==!0&&e.target!=="_blank"&&!X()}async function P(l=_()){if(c.value)return;c.value=!0;const s=typeof u.value=="string"?u.value:y.value?k(u.value):o.resolve(u.value).fullPath,i=y.value?new URL(s,window.location.href).href:s;await Promise.all([l.hooks.callHook("link:prefetch",i).catch(()=>{}),!y.value&&!m.value&&B(u.value,o).catch(()=>{})])}if(C("visibility")){const l=_();let s,i=null;N(()=>{const h=J();T(()=>{s=U(()=>{var q;(q=b==null?void 0:b.value)!=null&&q.tagName&&(i=h.observe(b.value,async()=>{i==null||i(),i=null,await P(l)}))})})}),F(()=>{s&&I(s),i==null||i(),i=null})}return()=>{var i;if(!y.value&&!m.value&&!v(u.value)){const h={ref:f,to:u.value,activeClass:e.activeClass||t.activeClass,exactActiveClass:e.exactActiveClass||t.exactActiveClass,replace:e.replace,ariaCurrentValue:e.ariaCurrentValue,custom:e.custom};return e.custom||(C("interaction")&&(h.onPointerenter=P.bind(null,void 0),h.onFocus=P.bind(null,void 0)),c.value&&(h.class=e.prefetchedClass||t.prefetchedClass),h.rel=e.rel||void 0),w(L("RouterLink"),h,n.default)}const l=e.target||null,s=$(e.noRel?"":e.rel,t.externalRelAttribute,r.value||m.value?"noopener noreferrer":"")||null;return e.custom?n.default?n.default({href:d.value,navigate:R,prefetch:P,get route(){if(!d.value)return;const h=new URL(d.value,window.location.href);return{path:h.pathname,fullPath:h.pathname,get query(){return D(h.search)},hash:h.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:d.value}},rel:s,target:l,isExternal:y.value||m.value,isActive:!1,isExactActive:!1}):null:w("a",{ref:b,href:d.value||null,rel:s,target:l},(i=n.default)==null?void 0:i.call(n))}}})}const Z=Q(G);function O(t,a){const v=a==="append"?M:W;return j(t)&&!t.startsWith("http")?t:v(t,!0)}function J(){const t=_();if(t._observer)return t._observer;let a=null;const v=new Map,p=(e,n)=>(a||(a=new IntersectionObserver(o=>{for(const u of o){const d=v.get(u.target);(u.isIntersecting||u.intersectionRatio>0)&&d&&d()}})),v.set(e,n),a.observe(e),()=>{v.delete(e),a==null||a.unobserve(e),v.size===0&&(a==null||a.disconnect(),a=null)});return t._observer={observe:p}}const K=/2g/;function X(){const t=navigator.connection;return!!(t&&(t.saveData||K.test(t.effectiveType)))}export{Z as _};
