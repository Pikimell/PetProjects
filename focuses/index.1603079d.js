!function(){function n({value:n,suit:t},o=0){o=Math.floor(o);return`\n  <div class="card ${t===e.BUBA||t===e.CHIRVA?"red":""}" style="top:${40*o}px">\n    <div class="top-card">\n      <div class="card-value">${n}</div>\n      <div class="card-suit">${t}</div>\n    </div>\n\n    <div class="bot-card">\n      <div class="card-value">${n}</div>\n      <div class="card-suit">${t}</div>\n    <div>\n    </div>\n  `}function t(n){n=[...n];for(let t=0;t<100;t++){const t=Math.round(Math.random()*(n.length-1)),e=Math.round(Math.random()*(n.length-1));[n[t],n[e]]=[n[e],n[t]]}return n}const e={PIKA:"♠",CHIRVA:"♥",BUBA:"♦",HRESTA:"♣"},o={containerEl:document.querySelector(".js-container"),column_1:document.querySelector('.js-column[data-idx="1"]'),column_2:document.querySelector('.js-column[data-idx="2"]'),column_3:document.querySelector('.js-column[data-idx="3"]'),buttonsList:document.querySelector(".js-buttons"),modalEl:document.querySelector(".js-modal")};let c=0,r=a();const u=[];function a(){const n=[];for(let t=2;t<=10;t++)for(let o of Object.values(e)){const e={value:t,suit:o};n.push(e)}return n}function l(t=0){if(!(c>4))return function(n=0){const t=r.filter(((n,t)=>t%3==0)),e=r.filter(((n,t)=>t%3==1)),o=r.filter(((n,t)=>t%3==2));switch(n){case 1:r=[...e,...t,...o];break;case 2:r=[...o,...e,...t];break;case 3:r=[...t,...o,...e]}}(t),function(t){for(;u.length;)clearTimeout(u.pop());o.column_1.innerHTML="",o.column_2.innerHTML="",o.column_3.innerHTML="",t.forEach(((t,e)=>{const c=setTimeout((()=>{const c=e%3,r=n(t,e/3);o[`column_${c+1}`].insertAdjacentHTML("beforeend",r)}),700*e);u.push(c)}))}(r),c++,4===c?function(){const t=Math.floor(13.5);!function(n){o.modalEl.innerHTML=n,document.body.classList.add("show-modal")}(n(r[t]))}():void 0}function i(){r=t(r).slice(0,27)}o.buttonsList.addEventListener("click",(n=>{if(n.target===n.currentTarget)return;l(+n.target.dataset.idx)})),i(),l(),o.modalEl.parentElement.addEventListener("click",(n=>{n.target===n.currentTarget&&(document.body.classList.remove("show-modal"),function(){for(;u.length;)clearTimeout(u.pop());o.column_1.innerHTML="",o.column_2.innerHTML="",o.column_3.innerHTML="",c=0,r=a(),i()}())}))}();
//# sourceMappingURL=index.1603079d.js.map
