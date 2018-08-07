"use strict";function minus_add(){$(".output").each(function(e,t){"-"==$(t).text().charAt(0)?$(this).addClass("minus"):$(this).removeClass("minus")})}function currency_char(e){switch(e){case"USD":return"$ ";case"EUR":return"&euro; ";case"RUB":return"&#x20bd; ";case"GBP":return"&#163; "}}function currency_time(e,t,c,n){if(1==c)switch(t){case"hour":return e.changes.price.hour+currency_char(n);case"day":return e.changes.price.day+currency_char(n);case"week":return e.changes.price.week+currency_char(n);case"month":return e.changes.price.month+currency_char(n)}else switch(t){case"hour":return e.changes.percent.hour+"%";case"day":return e.changes.percent.day+"%";case"week":return e.changes.percent.week+"%";case"month":return e.changes.percent.month+"%"}}function ajax_btc(e){$.ajax({type:"GET",url:URL+"BTC"+e,dataType:"json",success:function(t){$("#price-b").html(currency_char(e)+t.ask),$("#checkbox3").hasClass("percent-false")?($("#b_h").html(currency_time(t,"hour",!0,e)),$("#b_d").html(currency_time(t,"day",!0,e)),$("#b_w").html(currency_time(t,"week",!0,e)),$("#b_m").html(currency_time(t,"month",!0,e))):($("#b_h").html(currency_time(t,"hour",!1,e)),$("#b_d").html(currency_time(t,"day",!1,e)),$("#b_w").html(currency_time(t,"week",!1,e)),$("#b_m").html(currency_time(t,"month",!1,e))),minus_add()}})}function ajax_eth(e){$.ajax({type:"GET",url:URL+"ETH"+e,dataType:"json",success:function(t){$("#price-e").html(currency_char(e)+t.ask),$("#checkbox1").hasClass("percent-false")?($("#e_h").html(currency_time(t,"hour",!0,e)),$("#e_d").html(currency_time(t,"day",!0,e)),$("#e_w").html(currency_time(t,"week",!0,e)),$("#e_m").html(currency_time(t,"month",!0,e))):($("#e_h").html(currency_time(t,"hour",!1,e)),$("#e_d").html(currency_time(t,"day",!1,e)),$("#e_w").html(currency_time(t,"week",!1,e)),$("#e_m").html(currency_time(t,"month",!1,e))),minus_add()}})}function ajax_ltc(e){$.ajax({type:"GET",url:URL+"LTC"+e,dataType:"json",success:function(t){$("#price-l").html(currency_char(e)+t.ask),$("#checkbox2").hasClass("percent-false")?($("#l_h").html(currency_time(t,"hour",!0,e)),$("#l_d").html(currency_time(t,"day",!0,e)),$("#l_w").html(currency_time(t,"week",!0,e)),$("#l_m").html(currency_time(t,"month",!0,e))):($("#l_h").html(currency_time(t,"hour",!1,e)),$("#l_d").html(currency_time(t,"day",!1,e)),$("#l_w").html(currency_time(t,"week",!1,e)),$("#l_m").html(currency_time(t,"month",!1,e))),minus_add()}})}function json_result(e,t){$(t).hasClass("e")&&ajax_eth(e),$(t).hasClass("l")&&ajax_ltc(e),$(t).hasClass("b")?ajax_btc(e):(ajax_ltc(e),ajax_eth(e),ajax_btc(e))}function closeAllSelect(e){var t,c,n,s=[];for(t=document.getElementsByClassName("select-items"),c=document.getElementsByClassName("select-selected"),n=0;n<c.length;n++)e==c[n]?s.push(n):c[n].classList.remove("select-arrow-active");for(n=0;n<t.length;n++)s.indexOf(n)&&t[n].classList.add("select-hide")}var URL="https://apiv2.bitcoinaverage.com/indices/global/ticker/";$(document).ready(function(){var e=$(".select-selected").text();json_result(e),$(".custom-select").on("click",function(){e=$(".select-selected").text(),json_result(e,"all")}),$("input.ios-toggle").on("click",function(t){$(this).toggleClass("percent-false"),json_result(e,this)})});var x,i,j,selElmnt,a,b,c;for(x=document.getElementsByClassName("custom-select"),i=0;i<x.length;i++){for(selElmnt=x[i].getElementsByTagName("select")[0],a=document.createElement("DIV"),a.setAttribute("class","select-selected"),a.innerHTML=selElmnt.options[selElmnt.selectedIndex].innerHTML,x[i].appendChild(a),b=document.createElement("DIV"),b.setAttribute("class","select-items select-hide"),j=1;j<selElmnt.length;j++)c=document.createElement("DIV"),c.innerHTML=selElmnt.options[j].innerHTML,c.addEventListener("click",function(e){var t,c,n,s,r;for(s=this.parentNode.parentNode.getElementsByTagName("select")[0],r=this.parentNode.previousSibling,c=0;c<s.length;c++)if(s.options[c].innerHTML==this.innerHTML){for(s.selectedIndex=c,r.innerHTML=this.innerHTML,t=this.parentNode.getElementsByClassName("selected"),n=0;n<t.length;n++)t[n].removeAttribute("class");this.setAttribute("class","selected");break}r.click()}),b.appendChild(c);x[i].appendChild(b),a.addEventListener("click",function(e){e.stopPropagation(),closeAllSelect(this),this.nextSibling.classList.toggle("select-hide"),this.classList.toggle("select-arrow-active")})}document.addEventListener("click",closeAllSelect);