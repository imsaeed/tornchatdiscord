// ==UserScript==
// @name         TornToDiscord
// @namespace    http://sigmadevops.com
// @version      0.1
// @description  Pushes messages from Torn to Discord
// @author       saeed [1826888]
// @match        *://www.torn.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

//Get Chat Secret
var secretRegex = document.body.textContent.match (/chat.init.(.*)chatRoot'/);
var chatSecret = secretRegex[0].split(",");
var Secret = chatSecret[3].replace(" ","").slice(1, -1);
var uid = chatSecret[1].replace(" ","").slice(1,-1);

if(GM_getValue("ttdIsLoaded") != "1") {
//set "is open"
console.log("TTD Loaded");
GM_setValue("ttdIsLoaded", '1');

//Open the websocket for viewing
var webSocket = new WebSocket('wss://ws.torn.com/chat/ws?uid=' + uid + '&secret=' + Secret);
    webSocket.onopen = function (e) {
        console.log('websocket opened');
    };

webSocket.onerror = function(e) {
        console.log('an error occured', e);
    };
webSocket.onmessage = function(msg){
  var msgParse = JSON.parse(msg.data);
  dataToSend = JSON.stringify({ "content": msgParse.data[0].senderName + ': ' + msgParse.data[0].messageText});

if (msgParse.data[0].messageText.indexOf('!f') !== -1) {

  $.ajax({
    type: 'POST',
    url: 'https://discordapp.com/api/webhooks/346508040654028802/S8TcxcRa8Vo5LRhjpp5e609Jp6J6NzPRQ6VA9uGhU1_mG3YQPdAFxOFU32-XDN-12OST',
    data: dataToSend, // or JSON.stringify ({name: 'jonas'}),
    contentType: "application/json",
    dataType: 'json'
});
}
};
    //unset when page close
$(window).unload(function(){
    console.log("TTD Unloaded");
    GM_setValue("ttdIsLoaded", '0');
});
} else {console.log("TTD is already loaded! Not loading again.");}
