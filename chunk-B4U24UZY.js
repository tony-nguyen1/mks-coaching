import{a as V,b as u,c as k,d as I,e as N,f as U,g as T,h as D,j as G,k as q}from"./chunk-XHYNTRRS.js";import{a as h,b as A,d as M,h as P}from"./chunk-HUVJEQ6H.js";import{C as z,F as R}from"./chunk-GICCHK2Q.js";import{$ as x,Ea as S,Ja as c,Qa as m,Ta as o,Ua as e,Va as f,Wa as b,Xa as y,Ya as g,Za as r,_,d as F,va as l,wa as w,wb as C,xb as E}from"./chunk-XUATYPQO.js";function j(i,d){i&1&&(o(0,"div",13),r(1," Veuillez entrer un email valide. "),e())}function L(i,d){i&1&&(o(0,"div",13),r(1," Le mot de passe doit contenir au moins 6 caract\xE8res. "),e())}function O(i,d){if(i&1){let t=b();o(0,"div")(1,"form",4)(2,"div",5)(3,"label",6),r(4,"Email"),e(),f(5,"input",7),c(6,j,2,0,"div",8),e(),o(7,"div",9)(8,"label",10),r(9,"Mot de passe"),e(),f(10,"input",11),c(11,L,2,0,"div",8),e(),o(12,"button",12),y("click",function(){_(t);let p=g();return x(p.suivant())}),r(13," Suivant "),e()()()}if(i&2){let t,n,p,a=g();l(),m("formGroup",a.inscriptionForm),l(5),m("ngIf",((t=a.inscriptionForm.get("email"))==null?null:t.invalid)&&((t=a.inscriptionForm.get("email"))==null?null:t.touched)),l(5),m("ngIf",((n=a.inscriptionForm.get("password"))==null?null:n.invalid)&&((n=a.inscriptionForm.get("password"))==null?null:n.touched)),l(),m("disabled",((p=a.inscriptionForm.get("email"))==null?null:p.invalid)||((p=a.inscriptionForm.get("password"))==null?null:p.invalid))}}function H(i,d){i&1&&(o(0,"div",13),r(1," Veuillez entrer votre nom. "),e())}function J(i,d){i&1&&(o(0,"div",13),r(1," Veuillez entrer votre pr\xE9nom. "),e())}function K(i,d){i&1&&(o(0,"div",13),r(1," Vous devez avoir au moins 18 ans. "),e())}function Q(i,d){i&1&&(o(0,"div",13),r(1," Veuillez entrer un poids valide (minimum 30 kg). "),e())}function W(i,d){i&1&&(o(0,"div",13),r(1," Veuillez entrer un pseudo. "),e())}function X(i,d){if(i&1){let t=b();o(0,"div")(1,"form",4)(2,"div",5)(3,"label",14),r(4,"Nom"),e(),f(5,"input",15),c(6,H,2,0,"div",8),e(),o(7,"div",5)(8,"label",16),r(9,"Pr\xE9nom"),e(),f(10,"input",17),c(11,J,2,0,"div",8),e(),o(12,"div",5)(13,"label",18),r(14,"\xC2ge"),e(),f(15,"input",19),c(16,K,2,0,"div",8),e(),o(17,"div",5)(18,"label",20),r(19,"Poids (kg)"),e(),f(20,"input",21),c(21,Q,2,0,"div",8),e(),o(22,"div",9)(23,"label",22),r(24,"Pseudo"),e(),f(25,"input",23),c(26,W,2,0,"div",8),e(),o(27,"button",12),y("click",function(){_(t);let p=g();return x(p.soumettre())}),r(28," S'inscrire "),e()()()}if(i&2){let t,n,p,a,v,s=g();l(),m("formGroup",s.inscriptionForm),l(5),m("ngIf",((t=s.inscriptionForm.get("nom"))==null?null:t.invalid)&&((t=s.inscriptionForm.get("nom"))==null?null:t.touched)),l(5),m("ngIf",((n=s.inscriptionForm.get("prenom"))==null?null:n.invalid)&&((n=s.inscriptionForm.get("prenom"))==null?null:n.touched)),l(5),m("ngIf",((p=s.inscriptionForm.get("age"))==null?null:p.invalid)&&((p=s.inscriptionForm.get("age"))==null?null:p.touched)),l(5),m("ngIf",((a=s.inscriptionForm.get("poids"))==null?null:a.invalid)&&((a=s.inscriptionForm.get("poids"))==null?null:a.touched)),l(5),m("ngIf",((v=s.inscriptionForm.get("pseudo"))==null?null:v.invalid)&&((v=s.inscriptionForm.get("pseudo"))==null?null:v.touched)),l(),m("disabled",s.inscriptionForm.invalid)}}var Y=z(R),Z=M(Y),B=class i{constructor(d){this.fb=d;this.inscriptionForm=this.fb.group({email:["",[u.required,u.email]],password:["",[u.required,u.minLength(6)]],nom:["",u.required],prenom:["",u.required],age:[18,[u.required,u.min(18)]],poids:[30,[u.required,u.min(30)]],pseudo:["",u.required]})}inscriptionForm;etape=1;suivant(){this.etape===1&&this.inscriptionForm.get("email")?.valid&&this.inscriptionForm?.get("password")?.valid&&(this.etape=2)}soumettre(){return F(this,null,function*(){if(this.inscriptionForm.valid){let d=Date.now().toString(),t=yield P(A(Z,"user"),{email:this.inscriptionForm.value.email,nom:this.inscriptionForm.value.nom,prenom:this.inscriptionForm.value.prenom,age:this.inscriptionForm.value.age,poids:[{unPoid:this.inscriptionForm.value.poids,createdAt:h.now()}],pseudo:this.inscriptionForm.value.pseudo,createdAt:h.now(),role:"client"}).then(n=>{console.log("Document \xE9crit avec ID :",n.id," ts :",d)}).catch(n=>{console.error("Erreur lors de l'ajout du document :",n)});console.log("Apr\xE8s \xE9criture du Document")}else console.error("Formulaire invalide")})}static \u0275fac=function(t){return new(t||i)(w(G))};static \u0275cmp=S({type:i,selectors:[["app-sign-up"]],decls:6,vars:2,consts:[[1,"bg-gray-100","flex","items-center","justify-center","h-screen"],[1,"container","mx-auto","p-4","max-w-md","bg-white","rounded-lg","shadow-md"],[1,"text-2xl","font-bold","text-center","mb-6","text-gray-800"],[4,"ngIf"],[3,"formGroup"],[1,"mb-4"],["for","email",1,"block","text-sm","font-medium","text-gray-700"],["id","email","formControlName","email","type","email","placeholder","Votre email",1,"mt-1","block","w-full","px-3","py-2","border","border-gray-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-indigo-500","focus:border-indigo-500"],["class","text-red-500 text-sm mt-1",4,"ngIf"],[1,"mb-6"],["for","password",1,"block","text-sm","font-medium","text-gray-700"],["id","password","formControlName","password","type","password","placeholder","Votre mot de passe",1,"mt-1","block","w-full","px-3","py-2","border","border-gray-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-indigo-500","focus:border-indigo-500"],["type","button",1,"w-full","bg-indigo-600","text-white","py-2","px-4","rounded-md","hover:bg-indigo-700","focus:outline-none","focus:ring-2","focus:ring-indigo-500","focus:ring-offset-2","disabled:bg-gray-400","disabled:cursor-not-allowed",3,"click","disabled"],[1,"text-red-500","text-sm","mt-1"],["for","nom",1,"block","text-sm","font-medium","text-gray-700"],["id","nom","formControlName","nom","type","text","placeholder","Votre nom",1,"mt-1","block","w-full","px-3","py-2","border","border-gray-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-indigo-500","focus:border-indigo-500"],["for","prenom",1,"block","text-sm","font-medium","text-gray-700"],["id","prenom","formControlName","prenom","type","text","placeholder","Votre pr\xE9nom",1,"mt-1","block","w-full","px-3","py-2","border","border-gray-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-indigo-500","focus:border-indigo-500"],["for","age",1,"block","text-sm","font-medium","text-gray-700"],["id","age","formControlName","age","type","number","placeholder","Votre \xE2ge",1,"mt-1","block","w-full","px-3","py-2","border","border-gray-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-indigo-500","focus:border-indigo-500"],["for","poids",1,"block","text-sm","font-medium","text-gray-700"],["id","poids","formControlName","poids","type","number","placeholder","Votre poids",1,"mt-1","block","w-full","px-3","py-2","border","border-gray-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-indigo-500","focus:border-indigo-500"],["for","pseudo",1,"block","text-sm","font-medium","text-gray-700"],["id","pseudo","formControlName","pseudo","type","text","placeholder","Votre pseudo",1,"mt-1","block","w-full","px-3","py-2","border","border-gray-300","rounded-md","shadow-sm","focus:outline-none","focus:ring-indigo-500","focus:border-indigo-500"]],template:function(t,n){t&1&&(o(0,"div",0)(1,"div",1)(2,"h2",2),r(3,"Inscription"),e(),c(4,O,14,4,"div",3)(5,X,29,7,"div",3),e()()),t&2&&(l(4),m("ngIf",n.etape===1),l(),m("ngIf",n.etape===2))},dependencies:[q,N,V,U,k,I,T,D,E,C],encapsulation:2})};export{B as SignUpComponent};
