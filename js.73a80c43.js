parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Y5Mt":[function(require,module,exports) {
function t(t){return o(t)||n(t)||e()}function e(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function n(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function o(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function r(t,e){return a(t)||l(t,e)||i()}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function l(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var n=[],o=!0,r=!1,i=void 0;try{for(var l,a=t[Symbol.iterator]();!(o=(l=a.next()).done)&&(n.push(l.value),!e||n.length!==e);o=!0);}catch(c){r=!0,i=c}finally{try{o||null==a.return||a.return()}finally{if(r)throw i}}return n}}function a(t){if(Array.isArray(t))return t}var c=document.querySelector(".loader"),u=document.getElementById("canvas"),d={width:window.innerWidth,height:window.innerHeight-2},s={fillColor:"#48f",size:50},f={fillColor:"#4f3"},h={fillColor:"#f43"};u.setAttribute("width","".concat(d.width,"px")),u.setAttribute("height","".concat(d.height,"px"));var v=u.transferControlToOffscreen(),y=v.getContext("2d");document.body.addEventListener("mousedown",C,{passive:!0}),document.body.addEventListener("touchstart",C,{passive:!0}),document.body.addEventListener("mousemove",E,{passive:!0}),document.body.addEventListener("touchmove",E,{passive:!0}),document.body.addEventListener("mouseup",S,{passive:!0}),document.body.addEventListener("touchend",S,{passive:!0});var g,p,m=[],b=new Worker("./pointsGeneratorWorker.eed5afbb.js");b.addEventListener("message",function(t){m=t.data.randomPoints});var w=!1;function C(t){y.fillStyle=s.fillColor,y.strokeStyle=s.fillColor,y.lineWidth=s.size,y.lineCap="round",y.lineJoin="round",A(),y.beginPath(),w=!0,g=t.clientX||t.touches[0].clientX,p=t.clientY||t.touches[0].clientY,b.postMessage({canvasWidth:d.width,canvasHeight:d.height})}function E(t){if(w){var e=t.clientX||t.touches[0].clientX,n=t.clientY||t.touches[0].clientY;y.moveTo(g,p),y.lineTo(e,n),y.stroke(),g=e,p=n}}function S(){y.closePath(),w=!1,k()}function A(){y.clearRect(0,0,d.width,d.height)}function j(t,e){y.beginPath(),y.arc(t,e,1,0,2*Math.PI),y.fill()}var L=function(t,e){return function(n){var o=r(n,2),i=o[0],l=o[1];return i===t&&l===e}};function k(){for(var e=[],n=[],o=y.getImageData(0,0,d.width,d.height).data,i=0;i<m.length;i++){var l=r(m[i],3),a=l[0],c=l[1];0!==o[l[2]]?e.find(L(a,c))||e.push([a,c]):n.find(L(a,c))||n.push([a,c])}y.fillStyle=f.fillColor,y.strokeStyle=f.fillColor,e.forEach(function(e){return j.apply(void 0,t(e))}),y.fillStyle=h.fillColor,y.strokeStyle=h.fillColor,n.forEach(function(e){return j.apply(void 0,t(e))});var u=e.length+n.length,s=e.length,v=Math.floor(s/u*(d.width*d.height));return console.log({surface:v}),v}
},{"./pointsGeneratorWorker.js":[["pointsGeneratorWorker.eed5afbb.js","uD8o"],"pointsGeneratorWorker.eed5afbb.js.map","uD8o"]}]},{},["Y5Mt"], null)
//# sourceMappingURL=/js.73a80c43.js.map