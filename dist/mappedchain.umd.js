var n,r;n=this,r=function(n){var r=function(n,r,t){if(r)return(Array.isArray(r)?r:r.split(/[,[\].]/g).filter(Boolean)).reduce((function(n,r){return n&&n[r]}),n)||t},t=function(n){return{models:function(){return[].concat(n)},get:function(t,e){for(var u,o,f="string"==typeof e,i=Array.isArray(e),c=arguments.length,a=new Array(c>2?c-2:0),v=2;v<c;v++)a[v-2]=arguments[v];var l=a.filter((function(n){return"function"==typeof n})),s=function(n){return l.reduce((function(n,r){return r(n)}),n)};if("string"==typeof t&&(void 0===e||f||i)){if(f){var p=n.find((function(n){return n.t===e}));if(!p)return;return s(r(p,t))}return i&&(u=e.map((function(r){return n.find((function(n){return n.t===r}))}))),u||(u=n),u.some((function(n){return void 0!==(o=r(n,t))})),s(o)}}}};n.chain=function(){for(var n=[],r=arguments.length,e=new Array(r),u=0;u<r;u++)e[u]=arguments[u];var o=e.every((function(r){var t=r.u,e=r.t,u=-1===n.indexOf(r.t);return n.push(e),t&&u}));if(!o)return null;var f=t(e);return f},n.get=r,n.mapper=function(n,t,e){return void 0===n||"function"!=typeof t?null:t.source?function(n,t,e){var u,o={};function f(t){var e;if(t){var u=o[t];if(u){try{e="function"==typeof u?u.call(this,n,t):r(n,u,void 0)}catch(n){throw console.error(n),new Error(n)}return e}}}t((function(n){return{to:function(r){o[n]=r}}}),n),u=Object.create({},{u:{enumerable:!0,get:function(){return!0},set:function(){}},o:{enumerable:!0,get:function(){return n}},t:{enumerable:!0,get:function(){return t.source},set:function(){}}});var i=Object.keys(o).reduce((function(n,r){return n[r]={get:f.bind(u,r),enumerable:!0},n}),{});return Object.defineProperties(u,i),u}(n,t):null}},"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((n=n||self).mappedchain={});
//# sourceMappingURL=mappedchain.umd.js.map
