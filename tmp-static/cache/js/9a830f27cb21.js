jQuery.fn.extend({getUrlParam:function(strParamName){var qString,query,returnVal,strHref,strQueryString;strParamName=escape(unescape(strParamName));if($(this).attr("nodeName")==="#document"){if(window.location.search.search(strParamName)>-1){qString=window.location.search.substr(1,window.location.search.length).split("&");}}else if($(this).attr("src")!=="undefined"){strHref=$(this).attr("src");if(strHref.indexOf("?")>-1){strQueryString=strHref.substr(strHref.indexOf("?")+1);qString=strQueryString.split("&");}}else if($(this).attr("href")!=="undefined"){strHref=$(this).attr("href");if(strHref.indexOf("?")>-1){strQueryString=strHref.substr(strHref.indexOf("?")+1);qString=strQueryString.split("&");}}else{return null;}
if(!qString){return null;}
returnVal=(function(){var _i,_len,_results;_results=[];for(_i=0,_len=qString.length;_i<_len;_i++){query=qString[_i];if(escape(unescape(query.split("=")[0]))===strParamName){_results.push(query.split("=")[1]);}}
return _results;})();if(returnVal.lenght===0){return null;}else if(returnVal.lenght===1){return returnVal[0];}else{return returnVal;}}});window.load_start=Date.now();$(window).on('load',function(){return window.time_load_ms=+(Date.now()-window.load_start);});$(function(){var mt_submit_error,mt_submit_impl,mt_submit_ready;mt_submit_ready=false;window.mt_submit_ready=function(data_callback){var btn;if(!mt_submit_ready){mt_submit_ready=true;btn=$('#btn-submit').removeAttr('disabled');if(data_callback!=null){return btn.on('click',window.mt_submit(data_callback));}}};window.mt_submit_not_ready=function(disable){if(disable==null){disable=true;}
if(mt_submit_ready){mt_submit_ready=false;if(disable){return $('#btn-submit').attr('disabled','disabled').off('click');}}};window.mt_submit=function(data_callback){var do_submit;mt_submit_ready=true;do_submit=mt_submit_impl(data_callback);if(window.ask_for_feedback===true&&(window.show_modal_feedback!=null)&&(window.feedback_bonus!=null)){return window.show_modal_feedback('Thank you!',("<p>We will give a bonus of "+window.feedback_bonus+" if you help us improve ")+'the task and answer these questions.</p>'+'<p>If you don\'t want to answer, just click "Submit".</p>',do_submit);}else{return do_submit();}};window.mt_submit_partial=function(data){console.log("partial submit data:");console.log(data);return $.ajax({type:'POST',url:window.location.href,data:$.extend(true,{partial:true,screen_width:screen.width,screen_height:screen.height,time_load_ms:window.time_load_ms},data),contentType:"application/json; charset=utf-8",dataType:'json',success:function(data,status,jqxhr){console.log("partial submit success: data:");return console.log(data);},error:function(){return console.log("partial submit error");}});};mt_submit_error=function(msg){return hide_modal_loading(function(){return window.show_modal_error(msg);});};return mt_submit_impl=function(data_callback){return function(){var data,feedback;if(!mt_submit_ready){return;}
window.show_modal_loading("Submitting...",0);data=data_callback();if(window.ask_for_feedback){feedback=typeof window.get_modal_feedback==="function"?window.get_modal_feedback():void 0;}
if((feedback!=null)&&!$.isEmptyObject(feedback)){data.feedback=JSON.stringify(feedback);}
console.log("submit data:");console.log(data);return $.ajax({type:'POST',url:window.location.href,data:$.extend(true,{screen_width:screen.width,screen_height:screen.height,time_load_ms:window.time_load_ms},data),contentType:"application/json; charset=utf-8",dataType:'json',success:function(data,status,jqxhr){var host,new_url;console.log("success: data:");console.log(data);host=decodeURIComponent($(document).getUrlParam('turkSubmitTo'));console.log("host: "+host);if(data.result==="success"){new_url=""+host+"/mturk/externalSubmit"+window.location.search;console.log("success: redirecting to "+new_url);window.location=new_url;return setInterval((function(){return window.location=new_url;}),5000);}else if(data.result==="error"){return mt_submit_error("There was an error contacting the server; try submitting again after a few seconds... ("+data.message+")");}else{return mt_submit_error("There was an error contacting the server; try submitting again after a few seconds...");}},error:function(){return mt_submit_error("Could not connect to the server; try submitting again after a few seconds...");}});};};});var btn_submit;$(function(){template_args.width=$('#mt-container').width()-4;template_args.height=$(window).height()-$('#mt-top-nohover').height()-16;template_args.container_id='mt-container';$('#poly-container').width(template_args.width).height(template_args.height);return window.controller_ui=new ControllerUI(template_args);});btn_submit=function(){return window.mt_submit(window.controller_ui.get_submit_data);};$(window).on('load',function(){return $('#btn-submit').on('click',btn_submit);});