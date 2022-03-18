// XML Manipulation Using Regex
// to modify parameters universally use js proxy

function XM(str){

  if(!(this instanceof XM)){
    return new XM(str);
  }

  var str = str || '';

  // capturing group (from non-capturing)
  function C(str) {
    return str.replace('?:','')
  }

  // required group (from optional)
  function R(str) {
    return str.replace(')?', ')')
  }

  var all  = String.raw`[\s\S]*?`;
  var ns   = String.raw`(?:\S+?:)?`;
  var attr = String.raw`(?:\s+[\s\S]*?)?`;

  this.fill = function(ele,content){
    var reg = new RegExp(String.raw`<${C(ns)}${ele}${C(attr)}>${all}<\/${ns}${ele}>`);
    str = str.replace(reg, `<$1${ele}$2>${content}<\/$1${ele}>`);
    return this;
  }
  
  this.replace = function(ele,content){
    var reg = new RegExp(String.raw`<${ns}${ele}${attr}>${all}<\/${ns}${ele}>`);
    str = str.replace(reg, content);
    return this;
  }

  this.prepend = function(ele,content){
    var reg = new RegExp(String.raw`<${C(ns)}${ele}${C(attr)}>`);
    str = str.replace(reg, `<$1${ele}$2>${content}`);
    return this;
  }

  this.append = function(ele,content){
    var reg = new RegExp(String.raw`<\/${C(ns)}${ele}>`);
    str = str.replace(reg, `${content}<\/$1${ele}>`);
    return this;
  }

  this.before = function(ele,content){
    var reg = new RegExp(String.raw`<${C(ns)}${ele}${C(attr)}>`);
    str = str.replace(reg, `${content}<$1${ele}$2>`);
    return this;
  }

  this.after = function(ele,content){
    var reg = new RegExp(String.raw`<\/${C(ns)}${ele}>`);
    str = str.replace(reg, `<\/$1${ele}>${content}`);
    return this;
  }

  this.remove = function(...eles){
    eles.forEach((ele)=>{
      var reg = new RegExp(String.raw`<${ns}${ele}${attr}>${all}<\/${ns}${ele}>`);
      str = str.replace(reg, '');     
    })
    return this;
  }
    
  this.empty = function(ele){
    var reg = new RegExp(String.raw`<${C(ns)}${ele}${C(attr)}>${all}<\/${ns}${ele}>`);
    str = str.replace(reg, `<$1${ele}$2><\/$1${ele}>`);
    return this;
  }
  

  this.get = function(ele){
    var reg = new RegExp(String.raw`<${ns}${ele}${attr}>(${all})<\/${ns}${ele}>`);
    return str.match(reg)?.[1];
  }

  this.getAll = function(ele){
    var reg = new RegExp(String.raw`<${ns}${ele}${attr}>(${all})<\/${ns}${ele}>`, 'g');
    return [...str.matchAll(reg)].map((i)=>i[1]);
  }

  this.render = function(){
    return str;
  }
}

function X(obj) {
  var xml = '';
  for (var key in obj) {
    if (obj[key] instanceof Array) {
      for (var arr in obj[key]) {
        xml += '<'+key+'>';
        xml += X(new Object(obj[key][arr]));
        xml += '</'+key+'>';
      }
    } else {
        xml += '<'+key+'>';
        if (typeof obj[key] == "object") {
          xml += X(new Object(obj[key]));
        } else {
          xml += obj[key];
        }
        xml += '</'+key+'>';
    }
  }
  return xml
}