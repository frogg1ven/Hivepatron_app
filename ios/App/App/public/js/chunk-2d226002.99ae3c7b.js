(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d226002"],{e793:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),r={class:"center"},a={class:"bg-img"},c={class:"ion-margin"},i=Object(o["createElementVNode"])("hr",null,null,-1);function l(e,t,n,l,u,s){var d=Object(o["resolveComponent"])("ion-input"),b=Object(o["resolveComponent"])("ion-button"),m=Object(o["resolveComponent"])("ion-content"),p=Object(o["resolveComponent"])("base-layout");return Object(o["openBlock"])(),Object(o["createBlock"])(p,{"page-title":"Przypominanie hasła"},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(m,null,{default:Object(o["withCtx"])((function(){return[Object(o["createElementVNode"])("div",r,[Object(o["createElementVNode"])("div",a,[Object(o["createElementVNode"])("form",{onSubmit:t[2]||(t[2]=Object(o["withModifiers"])((function(){return s.forgetPassword&&s.forgetPassword.apply(s,arguments)}),["prevent"]))},[Object(o["createElementVNode"])("div",c,[Object(o["createVNode"])(d,{class:"input-border",modelValue:u.user.email,"onUpdate:modelValue":t[0]||(t[0]=function(e){return u.user.email=e}),name:"email",type:"email",placeholder:"Wprowadź email",ngModel:"",required:""},null,8,["modelValue"])]),Object(o["createElementVNode"])("div",null,[Object(o["createVNode"])(b,{class:"ion-margin nice-btn",size:"large",type:"submit",expand:"block"},{default:Object(o["withCtx"])((function(){return[Object(o["createTextVNode"])("Resetuj hasło")]})),_:1}),i,Object(o["createVNode"])(b,{class:"ion-margin nice-btn btn-red",size:"large",type:"button",expand:"block",onClick:t[1]||(t[1]=function(e){return s.backToLogin()})},{default:Object(o["withCtx"])((function(){return[Object(o["createTextVNode"])("Powrót")]})),_:1})])],32)])])]})),_:1})]})),_:1})}var u=n("260b"),s=(n("ea7b"),n("d867")),d={components:{IonContent:s["d"],IonInput:s["g"],IonButton:s["b"]},data:function(){return{user:{email:""}}},methods:{forgetPassword:function(){var e=this;u["a"].auth().sendPasswordResetEmail(this.user.email).then((function(){alert("Sprawdź email, przez który założyłeś konto!"),e.user={email:""},e.$router.push("/login")})).catch((function(e){alert(e)}))},backToLogin:function(){this.$router.push("/login")}}};d.render=l;t["default"]=d}}]);
//# sourceMappingURL=chunk-2d226002.99ae3c7b.js.map