(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{116:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(16),s=a.n(r),o=a(12),i=a(13),l=a(14),u=a(15),b=a(5),d=a(9),j=a.n(d),h=a(19),m=a(22),O=a(17),v=a.n(O),p=a(6),x=a(2);function f(){var e=Object(n.useState)(""),t=Object(m.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)(""),s=Object(m.a)(r,2),o=s[0],i=s[1],l=Object(n.useState)({}),u=Object(m.a)(l,2),b=(u[0],u[1]),d=Object(n.useState)(!0),O=Object(m.a)(d,2),f=O[0],g=O[1],y=function(){var e=Object(h.a)(j.a.mark((function e(t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,v.a.post("http://".concat(p.api_host_authentication,":").concat(p.PORT_AUTHENTICATION_MS,"/login"),{username:a,password:o});case 3:!0===(n=e.sent).data.status?(window.localStorage.setItem("token",n.data.token),window.location.href=n.data.link,b(n.data.link)):!1===n.data.status&&(window.localStorage.setItem("token","empty"),g(n.data.status));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(x.jsxs)("div",{className:"container mt-5",children:[Object(x.jsxs)("form",{onSubmit:y,children:[Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{children:"Userid"}),Object(x.jsx)("input",{required:!0,className:"form-control",value:a,onChange:function(e){return c(e.target.value)}}),Object(x.jsx)("label",{className:"mt-3",children:"Password"}),Object(x.jsx)("input",{required:!0,type:"password",className:"form-control",value:o,onChange:function(e){return i(e.target.value)}})]}),Object(x.jsx)("br",{}),Object(x.jsx)("button",{className:"btn btn-primary",children:"Submit"})]}),Object(x.jsx)("br",{}),0==f&&Object(x.jsx)("div",{className:"d-flex flex-row flex-wrap justify justify-content-between",children:Object(x.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Invalid Credentials"})})]})}var g=a(59);function y(){var e=null;try{var t=localStorage.getItem("token");t&&(e=Object(g.a)(t)).name&&(e.access_token="8a702c3bfc0e79b36b382d33992a651e")}catch(a){return!1}finally{return e}}var N=function(){return Object(x.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark",children:Object(x.jsxs)("div",{className:"container-fluid",children:[!y()&&Object(x.jsx)("a",{className:"navbar-brand",href:"/login",children:"Capstone Product"}),y()&&Object(x.jsx)("a",{className:"navbar-brand",href:"/home",children:"Capstone Product"}),Object(x.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(x.jsx)("span",{className:"navbar-toggler-icon"})}),Object(x.jsx)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:Object(x.jsxs)("ul",{className:"navbar-nav",children:[!y()&&Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)("a",{className:"nav-link","aria-current":"page",href:"/login",children:"Login"})}),y()&&Object(x.jsxs)(c.a.Fragment,{children:[Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)("a",{className:"nav-link","aria-current":"page",href:"/balanceinquiry",children:"Balance Inquiry"})}),Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)("a",{className:"nav-link",href:"/fundtransfer",children:"Fund Transfer"})}),Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)("a",{className:"nav-link",href:"/ministatement",children:"Mini Statement"})}),Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsx)("a",{className:"nav-link",href:"/logout",children:"Logout"})})]})]})})]})})},k=a(20),C=a(18),_=a(10),S=a.n(_),A=function(e){var t=e.label,a=e.type,n=void 0===a?"text":a,c=e.onChange,r=e.value,s=e.name,o=e.error;return Object(x.jsxs)("div",{className:"mb-3",children:[Object(x.jsx)("label",{htmlFor:"accountid",className:"form-label",children:t}),Object(x.jsx)("input",{type:n,onChange:c,value:r,name:s,id:s,className:"form-control",autoComplete:"off"}),o&&Object(x.jsx)("div",{className:"alert alert-danger",children:o})]})},T={get:v.a.get,post:v.a.post,put:v.a.put,delete:v.a.delete},w=a(27),I=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).onTrigger=function(){n.props.parentCallback("Welcome to GFG")},n.state={values:[],accountnumber:""},n.handleChange=n.handleChange.bind(Object(w.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=y();null==t?window.location.href="http://".concat(p.api_host_frontend,":").concat(p.PORT_FRONTEND,"/login"):null!=t&&v.a.post("http://".concat(p.api_host_accounts,":").concat(p.PORT_IPC_API,"/getAccountsForUser"),{userid:t.name}).then((function(e){return console.log(e.data),e.data})).then((function(t){e.setState({values:t})}))}},{key:"handleChange",value:function(e){this.state.accountnumber=e.target.value,console.log(e.target.value),console.log(this.state),this.props.parentCallback(e.target.value)}},{key:"render",value:function(){return Object(x.jsx)("div",{className:"drop-down",children:Object(x.jsx)("div",{className:"d-flex flex-row flex-wrap justify justify-content-between",children:Object(x.jsxs)("select",{class:"form-select","aria-label":"Default select example",onChange:this.handleChange,children:[Object(x.jsx)("option",{children:"Select Account Number"}),this.state.values.map((function(e){return Object(x.jsx)("option",{value:e.accountnumber,children:e.accountnumber})}))]})})})}}]),a}(c.a.Component),R=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={account:{accountno:""},errors:{}},e.handleChange=function(t){var a=t.currentTarget,n=Object(C.a)({},e.state.account);n[a.name]=a.value,e.setState({account:n})},e.schema=S.a.object({accountno:S.a.string().min(3).max(120).required().label("Enter Account number:")}),e.validateForm=function(){var t=e.schema.validate(e.state.account,{abortEarly:!1}).error,a=null;if(t){a={};var n,c=Object(k.a)(t.details);try{for(c.s();!(n=c.n()).done;){var r=n.value;a[r.path[0]]=r.message}}catch(s){c.e(s)}finally{c.f()}}return a},e.handleSubmit=function(){var t=Object(h.a)(j.a.mark((function t(a){var n,c,r,s,o;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),n=e.validateForm()||{},0!==Object.keys(n).length){t.next=20;break}if(c=e.state.account,r=y(),t.prev=5,!r){t.next=14;break}return t.next=9,T.get("http://".concat(p.api_host_accounts,":").concat(p.PORT_BALANCE_INQUIRY,"/balance_inquiry?accountNumber=").concat(c.accountno.toUpperCase(),"&userid=").concat(r.name,"&access_token=").concat(r.access_token));case 9:s=t.sent,o=s.data,e.setState({user:o,invalidAccount:null}),t.next=15;break;case 14:e.setState({invalidAccount:"Login to Continue / Invalid Token"});case 15:t.next=20;break;case 17:t.prev=17,t.t0=t.catch(5),t.t0.response&&e.setState({invalidAccount:t.t0.response.data.error});case 20:e.setState({errors:n});case 21:case"end":return t.stop()}}),t,null,[[5,17]])})));return function(e){return t.apply(this,arguments)}}(),e.handleCallback=function(t){var a=Object(C.a)({},e.state.account);a.accountno=t,e.setState({account:a})},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this.state,t=(e.account,e.user),a=(e.errors,e.invalidAccount);return Object(x.jsxs)("div",{className:"container mt-4",children:[Object(x.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(x.jsx)(I,{parentCallback:this.handleCallback}),Object(x.jsx)("br",{}),Object(x.jsx)("button",{disabled:this.validateForm(),className:"btn btn-primary btn-sm",children:"Submit"})]}),a&&Object(x.jsx)("h6",{className:"text-danger mt-5",children:a}),t&&!a&&Object(x.jsx)("table",{className:"table table-bordered table-responsive mt-5",children:Object(x.jsxs)("tbody",{children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Account Number"}),Object(x.jsx)("td",{children:t.accountnumber})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Balance Amount"}),Object(x.jsxs)("td",{children:[t.currency," ",t.balanceamt]})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Limit Amount"}),Object(x.jsxs)("td",{children:[t.currency," ",t.limitamt]})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Lien Amount"}),Object(x.jsxs)("td",{children:[t.currency," ",t.lienamount]})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Effective Balance"}),Object(x.jsxs)("td",{children:[t.currency," ",t.effectivebal]})]})]})})]})}}]),a}(c.a.Component),D=R,E=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={account:{senderaccountnumber:"",receiveraccountnumber:"",amount:"",currency:"",description:""},errors:{}},e.handleChange=function(t){var a=t.currentTarget,n=Object(C.a)({},e.state.account);n[a.name]=a.value,e.setState({account:n})},e.schema=S.a.object({senderaccountnumber:S.a.string().min(3).max(120).required().label("Sender Account Number"),receiveraccountnumber:S.a.string().min(3).max(120).required().label("Receiver Account Number"),amount:S.a.number().min(0).not(0).required().label("Amount"),currency:S.a.string().max(3).required().label("Currency"),description:S.a.string().max(20).optional("").allow("").label("Add Description")}),e.validateForm=function(){var t=e.schema.validate(e.state.account,{abortEarly:!1}).error,a=null;if(t){a={};var n,c=Object(k.a)(t.details);try{for(c.s();!(n=c.n()).done;){var r=n.value;a[r.path[0]]=r.message}}catch(s){c.e(s)}finally{c.f()}}return a},e.handleReset=function(){e.setState({account:{senderaccountnumber:"",receiveraccountnumber:"",amount:"",currency:"",description:""}})},e.handleSubmit=function(){var t=Object(h.a)(j.a.mark((function t(a){var n,c,r,s,o;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),n=e.validateForm()||{},0!==Object.keys(n).length){t.next=21;break}if(c=e.state.account,r=y(),t.prev=5,!r){t.next=15;break}return t.next=9,T.post("http://".concat(p.api_host_payments,":").concat(p.PORT_PAYMENTS_MICROSERVICE,"/fund_transfer?access_token=").concat(r.access_token),{from_account:c.senderaccountnumber,to_account:c.receiveraccountnumber,amount:c.amount,currency:c.currency,description:c.description,userid:r.name});case 9:s=t.sent,o=s.data,e.setState({user:o,invalidAccount:null,ran:c.receiveraccountnumber,amt:c.amount,curr:c.currency,desc:c.description||"NA"}),e.handleReset(),t.next=16;break;case 15:e.setState({invalidAccount:"Login to Continue / Invalid Token"});case 16:t.next=21;break;case 18:t.prev=18,t.t0=t.catch(5),t.t0.response&&e.setState({invalidAccount:t.t0.response.data.error});case 21:e.setState({errors:n});case 22:case"end":return t.stop()}}),t,null,[[5,18]])})));return function(e){return t.apply(this,arguments)}}(),e.handleCallback=function(t){var a=Object(C.a)({},e.state.account);a.senderaccountnumber=t,e.setState({account:a})},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this.state,t=e.account,a=e.user,n=e.errors,c=e.invalidAccount,r=e.ran,s=e.amt,o=e.curr,i=e.desc;return Object(x.jsxs)("div",{className:"container mt-4",children:[Object(x.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(x.jsx)(I,{parentCallback:this.handleCallback}),Object(x.jsx)("br",{}),Object(x.jsx)(A,{label:"Receiver Account Number",value:t.receiveraccountnumber,onChange:this.handleChange,name:"receiveraccountnumber",error:n.receiveraccountnumber}),Object(x.jsx)(A,{label:"Enter Amount",value:t.amount,onChange:this.handleChange,name:"amount",error:n.amount}),Object(x.jsx)(A,{label:"Currency",value:t.currency,onChange:this.handleChange,name:"currency",error:n.currency}),Object(x.jsx)(A,{label:"Description",value:t.description,onChange:this.handleChange,name:"description",error:n.description}),Object(x.jsx)("button",{disabled:this.validateForm(),className:"btn btn-primary btn-sm",children:"Submit"})]}),c&&Object(x.jsx)("h6",{className:"text-danger mt-5",children:c}),a&&!c&&Object(x.jsx)("table",{className:"table table-bordered table-responsive mt-5",children:Object(x.jsxs)("tbody",{children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Status"}),Object(x.jsx)("td",{children:a.status})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Transaction Number"}),Object(x.jsx)("td",{children:a.TransactionNumber})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Receiver Account Number"}),Object(x.jsx)("td",{children:r})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Amount"}),Object(x.jsxs)("td",{children:[o," ",s]})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Description"}),Object(x.jsx)("td",{children:i})]})]})})]})}}]),a}(c.a.Component),P=E,F=a(65),M=a(36),q=a(60),L=a.n(q),U=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={account:{accountno:""},errors:{}},e.handleChange=function(t){var a=t.currentTarget,n=Object(C.a)({},e.state.account);n[a.name]=a.value,e.setState({account:n})},e.schema=S.a.object({accountno:S.a.string().min(3).max(120).required().label("Enter Account number:")}),e.validateForm=function(){var t=e.schema.validate(e.state.account,{abortEarly:!1}).error,a=null;if(t){a={};var n,c=Object(k.a)(t.details);try{for(c.s();!(n=c.n()).done;){var r=n.value;a[r.path[0]]=r.message}}catch(s){c.e(s)}finally{c.f()}}return a},e.handleSubmit=function(){var t=Object(h.a)(j.a.mark((function t(a){var n,c,r,s,o;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),n=e.validateForm()||{},0!==Object.keys(n).length){t.next=20;break}if(c=e.state.account,r=y(),t.prev=5,!r){t.next=14;break}return t.next=9,T.get("http://".concat(p.api_host_payments,":").concat(p.PORT_PAYMENTS_MICROSERVICE,"/Mini_Statement?Account_Number=").concat(c.accountno.toUpperCase(),"&UserID=").concat(r.name,"&access_token=").concat(r.access_token));case 9:s=t.sent,o=s.data,e.setState({user:o.transaction,user2:o.Total_Balance,invalidAccount:null}),t.next=15;break;case 14:e.setState({invalidAccount:"Login to Continue / Invalid Token"});case 15:t.next=20;break;case 17:t.prev=17,t.t0=t.catch(5),t.t0.response&&e.setState({invalidAccount:t.t0.response.data.error});case 20:e.setState({errors:n});case 21:case"end":return t.stop()}}),t,null,[[5,17]])})));return function(e){return t.apply(this,arguments)}}(),e.pdfGenerate=function(){var e=new M.default("landscape","px","a4","false");L()(e,{html:"#StatementTable"}),e.save("MiniStatements.pdf")},e.handleCallback=function(t){var a=Object(C.a)({},e.state.account);a.accountno=t,e.setState({account:a})},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this.state,t=(e.account,e.user),a=e.user2,n=(e.errors,e.invalidAccount);return Object(x.jsxs)("div",{className:"container mt-4",children:[Object(x.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(x.jsx)(I,{parentCallback:this.handleCallback}),Object(x.jsx)("br",{}),Object(x.jsx)("button",{disabled:this.validateForm(),className:"btn btn-primary btn-sm",children:"Submit"})]}),n&&Object(x.jsx)("h6",{className:"text-danger mt-3",children:n}),t&&!n&&Object(x.jsxs)("div",{className:"container mt-3",children:[Object(x.jsxs)("h6",{children:["Total Available Balance: ",a]}),Object(x.jsxs)("table",{id:"StatementTable",className:"table table-bordered table-responsive mt-4",children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Transaction ID"}),Object(x.jsx)("th",{children:"Transaction Type"}),Object(x.jsx)("th",{children:"Transaction Amount"}),Object(x.jsx)("th",{children:"Associated Account Number"}),Object(x.jsx)("th",{children:"Description"}),Object(x.jsx)("th",{children:"Transaction Date and Time"})]})}),Object(x.jsx)("tbody",{children:t.map((function(e){return Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:e.Trans_id}),Object(x.jsx)("td",{children:e.Trans_type}),Object(x.jsx)("td",{children:e.Trans_Amount}),Object(x.jsx)("td",{children:e.Associate_Acc_Number}),Object(x.jsx)("td",{children:e.Trans_Desc}),Object(x.jsx)("td",{children:e.Date.toString().replace("T"," ").substring(0,19)})]},e.Trans_id)}))})]}),Object(x.jsxs)("div",{style:{textAlign:"center"},children:[Object(x.jsx)("br",{}),Object(x.jsx)(F.a,{onClick:this.pdfGenerate,children:"Download PDF"})]})]})]})}}]),a}(c.a.Component),B=U,G=function(e){var t=e.title,a=e.body,n=e.link;return Object(x.jsx)("a",{className:"text-decoration-none text-dark",href:n,children:Object(x.jsx)("div",{className:"card p-5 bg-secondary bg-opacity-10",style:{width:"18rem"},children:Object(x.jsxs)("div",{className:"card-body",children:[Object(x.jsx)("h5",{className:"card-title",children:t}),Object(x.jsx)("p",{className:"card-text",children:a})]})})})},V=function(){return Object(x.jsxs)("div",{className:"container",children:[Object(x.jsx)("h1",{className:"text-center mt-5",children:"Capstone Product"}),Object(x.jsxs)("div",{className:"d-flex gap-5 justify-content-center mt-5",children:[Object(x.jsx)(G,{title:"Balance Inquiry",link:"/balanceinquiry",body:"Check your Balance here"}),Object(x.jsx)(G,{title:"Fund Transfer",link:"/fundtransfer",body:"Transfer your funds here"}),Object(x.jsx)(G,{title:"Mini Statement",link:"/ministatement",body:"View your Transaction History"})]})]})},Y=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"componentDidMount",value:function(){!function(){try{localStorage.removeItem("token")}catch(e){}}(),window.location.replace("/")}},{key:"render",value:function(){return null}}]),a}(c.a.Component),W=Y,H=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return Object(x.jsxs)("div",{children:[Object(x.jsx)(N,{}),Object(x.jsxs)(b.d,{children:[Object(x.jsx)(b.b,{path:"/login",component:f}),Object(x.jsx)(b.b,{path:"/logout",component:W}),Object(x.jsx)(b.b,{path:"/home",component:V}),Object(x.jsx)(b.b,{path:"/balanceinquiry",component:D}),Object(x.jsx)(b.b,{path:"/fundTransfer",component:P}),Object(x.jsx)(b.b,{path:"/ministatement",component:B}),Object(x.jsx)(b.a,{from:"/",to:"/login"})]})]})}}]),a}(c.a.Component),J=H,Q=(a(111),a(112),a(37));s.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(Q.a,{children:Object(x.jsx)(J,{})})}),document.getElementById("root"))},6:function(e){e.exports=JSON.parse('{"postgresDatabaseConnectionURLOld":"postgres://postgres:postgres@localhost:5432/postgres","postgresDatabaseConnectionURL":"postgres://postgres:postgres@10.73.53.144:5432/capstone_team_gobi","mongoDBConnectionURL":"mongodb://10.66.119.87:27017/test","mongoAtlas":"mongodb+srv://Shivang_:4M8VCWAGwMWCycig@cluster0.90cd7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority","api_host_accounts":"10.66.119.87","PORT_BALANCE_INQUIRY":3005,"PORT_IPC_API":3010,"api_host_authentication":"10.66.119.87","PORT_AUTHENTICATION_MS":5000,"api_host_frontend":"10.66.119.87","PORT_FRONTEND":30001,"api_host_payments":"10.66.119.87","PORT_PAYMENTS_MICROSERVICE":5005}')}},[[116,1,3]]]);
//# sourceMappingURL=main.dacaee2a.chunk.js.map