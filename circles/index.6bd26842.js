!function(){function t(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)}function e(t,e){return e.get?e.get.call(t):e.value}function n(n,i){return e(n,t(n,i,"get"))}function i(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function a(t,e,n){i(t,e),e.set(t,n)}function r(t,e){if(t!==e)throw new TypeError("Private static access of wrong provenance")}function s(t,e){if(void 0===t)throw new TypeError("attempted to "+e+" private static field before its declaration")}function o(t,n,i){return r(t,n),s(i,"get"),e(t,i)}function c(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}function l(t,e,n,i){return r(t,e),s(n,"set"),c(t,n,i),i}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}class u{show(){o(u,u,d).fillStyle="black";const t=this.center;this.drawEllipse(t),this.drawLine(t,this.currentPoint)}nextIteration(){this.angle+=this.step,this.angle%=360;const t=2*Math.PI/360;this.currentPoint.x=this.radius*Math.cos(this.angle*t)+this.center.x,this.currentPoint.y=this.radius*Math.sin(this.angle*t)+this.center.y}drawLine(t,e){o(u,u,d).moveTo(t.x,t.y),o(u,u,d).lineTo(e.x,e.y),o(u,u,d).stroke(),this.drawDot(e)}drawDot(t){o(u,u,d).fillStyle="red",o(u,u,d).beginPath(),o(u,u,d).ellipse(t.x,t.y,5,5,0,0,2*Math.PI),o(u,u,d).fill(),o(u,u,d).beginPath(),o(u,u,d).fillStyle="black"}drawEllipse(t){o(u,u,d).beginPath(),o(u,u,d).ellipse(t.x,t.y,this.radius,this.radius,0,0,2*Math.PI),o(u,u,d).closePath(),o(u,u,d).strokeStyle="black",o(u,u,d).stroke()}static clearCanvas(){o(u,u,d).clearRect(0,0,1e4,1e4)}static get canvas(){return o(this,u,d)}constructor(t,e,n=1,i=25){h(this,"radius",25),h(this,"center",new v),h(this,"angle",0),h(this,"step",1),h(this,"currentPoint",new v);const{x:a,y:r}=e;this.center=new v(a,r),this.radius=i,l(u,u,d,t.getContext("2d")),o(u,u,d).lineWidth=5,o(u,u,d).lineCap="round",this.step=n}}var d={writable:!0,value:void 0},f=new WeakMap;class v{constructor(t=0,e=0){a(this,f,{writable:!0,value:60}),h(this,"x",void 0),h(this,"y",void 0),this.x=t+n(this,f),this.y=e+n(this,f)}}const w={canvas:document.querySelector(".js-canvas1"),canvas2:document.querySelector(".js-canvas2"),saveBtn:document.querySelector(".js-save-btn")},p=[],g=[],y=50;w.canvas.width=1200,w.canvas.height=1200,w.canvas2.width=1200,w.canvas2.height=1200;for(let t=0;t<10;t++){const e={x:120*t,y:0};p[t]=new u(w.canvas,e,t+1,y)}for(let t=0;t<10;t++){const e={x:0,y:120*t};g[t]=new u(w.canvas,e,t+1,y)}function b(t,e){const n=w.canvas2.getContext("2d");n.fillStyle="blue",n.beginPath(),n.ellipse(t,e,5,5,0,0,2*Math.PI),n.fill(),n.beginPath(),n.fillStyle="black"}w.saveBtn.addEventListener("click",(()=>{let t=document.createElement("a");t.setAttribute("download","CanvasAsImage.png");let e=w.canvas2.toDataURL("image/png").replace(/^data:image\/png/,"data:application/octet-stream");t.setAttribute("href",e),t.click()})),setInterval((()=>{u.clearCanvas(),function(){for(let t=1;t<10;t++)p[t].nextIteration(),p[t].show();for(let t=1;t<10;t++)g[t].nextIteration(),g[t].show();for(let t=1;t<10;t++)for(let e=1;e<10;e++)b(p[t].currentPoint.x,g[e].currentPoint.y)}()}),10)}();
//# sourceMappingURL=index.6bd26842.js.map