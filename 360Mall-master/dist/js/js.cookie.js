function setCookie(e,t,o){var n=new Date;n.setDate(n.getDate()+o),document.cookie=e+"="+encodeURIComponent(t)+";expires="+n.toGMTString()}function getCookie(e){for(var t=document.cookie,o=t.split("; "),n=0;n<o.length;n++){var i=o[n].split("=");if(i[0]==e)return decodeURIComponent(i[1])}return""}function getCookie2(e){for(var t=document.cookie,o=t.split("; "),n={},i=0;i<o.length;i++){var r=o[i].split("=");n[r[0]]=r[1]}return e in n?n[e]:""}function getCookie3(e){var t=document.cookie,o=t.indexOf(e);if(o!=-1){var n=o+e.length+1,i=t.indexOf(";",n);return i!=-1?t.substring(n,i):t.substring(n)}return""}function delCookie(e){var t=new Date;t.setDate(t.getDate()-1),document.cookie=e+"=xx;expires="+t.toGMTString()}