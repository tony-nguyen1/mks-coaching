import{d as E,g as D}from"./chunk-SMLBMR2K.js";import{$ as p,Ea as M,Ja as g,O as b,Qa as S,Sa as f,Ta as o,Ua as n,Va as d,Wa as v,Xa as c,Ya as m,Za as r,_ as s,aa as k,kb as y,la as _,va as u,wa as h,xb as C,yb as w}from"./chunk-PR44PLR4.js";var x=class e{DARK_MODE_KEY="darkMode";prefix=this.constructor.name;darkModeSignal;constructor(){let t=localStorage.getItem(this.DARK_MODE_KEY),i=t?JSON.parse(t):!1;this.darkModeSignal=_(i)}toggleDarkMode(){localStorage.setItem(this.DARK_MODE_KEY,JSON.stringify(this.darkModeSignal())),console.log(`${this.prefix}: sending signal`),this.darkModeSignal.set(!this.darkModeSignal())}updateGlobalTheme(t){y(()=>{this.darkModeSignal()?(console.log(`${this.prefix}:`,"adding the dark theme"),t.removeAttribute(document.body,"data-theme"),t.setAttribute(document.body,"data-theme","dark")):(console.log(`${this.prefix}:`,"adding the bumblebee theme"),t.removeAttribute(document.body,"data-theme"),t.setAttribute(document.body,"data-theme","bumblebee"))})}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})};function T(e,t){if(e&1){let i=v();o(0,"button",16),c("click",function(){s(i);let l=m();return p(l.toggleDarkMode())}),d(1,"img",17),n()}}function I(e,t){if(e&1){let i=v();o(0,"button",16),c("click",function(){s(i);let l=m();return p(l.toggleDarkMode())}),d(1,"img",18),n()}}function L(e,t){e&1&&d(0,"img",26)}function V(e,t){e&1&&d(0,"img",27)}function A(e,t){if(e&1){let i=v();o(0,"div",19)(1,"div",20)(2,"a",21),r(3,"Accueil"),n(),o(4,"a",22),r(5,"Services"),n(),o(6,"a",23),r(7,"Contact"),n(),o(8,"button",24),r(9," Se connecter "),n(),o(10,"button",25),c("click",function(){s(i);let l=m();return p(l.toggleDarkMode())}),g(11,L,1,0,"img",26)(12,V,1,0,"img",27),n()()()}if(e&2){let i=m();u(11),f(i.darkModeService.darkModeSignal()?11:12)}}var N=class e{constructor(t){this.darkModeService=t}isMenuOpen=!1;prefix=this.constructor.name;toggleDarkMode(){console.log(`${this.prefix}: toggleDarkMode()`),this.darkModeService.toggleDarkMode()}toggleMenu(){this.isMenuOpen=!this.isMenuOpen}static \u0275fac=function(i){return new(i||e)(h(x))};static \u0275cmp=M({type:e,selectors:[["app-nav-bar"]],decls:22,vars:2,consts:[[1,"bg-white","shadow-md"],[1,"max-w-7xl","mx-auto","px-4","sm:px-6","lg:px-8"],[1,"flex","justify-between","h-16"],[1,"flex-shrink-0","flex","items-center"],["routerLink","/",1,"text-xl","font-bold","text-gray-800","logo"],[1,"hidden","md:flex","space-x-4","items-center"],["routerLink","/",1,"text-gray-800","hover:text-indigo-600","px-3","py-2"],["routerLink","/service",1,"text-gray-800","hover:text-indigo-600","px-3","py-2"],["routerLink","/contact",1,"text-gray-800","hover:text-indigo-600","px-3","py-2"],["routerLink","/auth",1,"btn","btn-primary"],[1,"btn","btn-active"],[1,"flex","items-center","md:hidden"],["type","button","aria-label","BurgerMenu",1,"inline-flex","items-center","justify-center","p-2","rounded-md","text-gray-800","hover:text-indigo-600","focus:outline-none",3,"click"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke","currentColor",1,"h-6","w-6"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M4 6h16M4 12h16m-7 6h7"],["class","md:hidden",4,"ngIf"],[1,"btn","btn-active",3,"click"],["src","img/light_mode.svg","alt","Un petit soleil"],["src","img/dark_mode.svg","alt","Une petite demi-lune",1,"dark"],[1,"md:hidden"],[1,"px-2","pt-2","pb-3","space-y-1","sm:px-3"],["routerLink","/",1,"block","text-gray-800","hover:text-indigo-600","px-3","py-2"],["routerLink","/service",1,"block","text-gray-800","hover:text-indigo-600","px-3","py-2"],["routerLink","/contact",1,"block","text-gray-800","hover:text-indigo-600","px-3","py-2"],["routerLink","/auth",1,"bg-blue-600","text-white","font-semibold","py-2","px-6","rounded-lg","shadow-md","hover:bg-blue-700","transition","duration-300","ease-in-out","transform","hover:scale-105"],[1,"btn","btn-active","block",3,"click"],["src","img/dark_mode.svg","alt","Une petite demi-lune"],["src","img/light_mode.svg","alt","Un petit soleil",1,"dark"]],template:function(i,a){i&1&&(o(0,"nav",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"a",4),r(5,"MKS"),n()(),o(6,"div",5)(7,"a",6),r(8,"Accueil"),n(),o(9,"a",7),r(10,"Services"),n(),o(11,"a",8),r(12,"Contact"),n(),o(13,"button",9),r(14," Se connecter "),n(),g(15,T,2,0,"button",10)(16,I,2,0,"button",10),n(),o(17,"div",11)(18,"button",12),c("click",function(){return a.toggleMenu()}),k(),o(19,"svg",13),d(20,"path",14),n()()()()(),g(21,A,13,1,"div",15),n()),i&2&&(u(15),f(a.darkModeService.darkModeSignal()?15:16),u(6),S("ngIf",a.isMenuOpen))},dependencies:[w,C,D,E],styles:[".btn[_ngcontent-%COMP%] > img.dark[_ngcontent-%COMP%]{--custom-filter: invert(100%);filter:var(--custom-filter)}"]})};export{x as a,N as b};
