// ==UserScript==
// @name         TornToDiscord
// @namespace    http://sigmadevops.com
// @version      0.1
// @description  Pushes a message from Torn chat to Discord
// @author       saeed [1826888]
// @match        *://www.torn.com/*
// @downloadURL  https://github.com/imsaeed/tornchatdiscord/blob/master/TornToDiscord.user.js
// @updateURL    https://github.com/imsaeed/tornchatdiscord/blob/master/TornToDiscord.user.js
// ==/UserScript==
//Get Chat Secret
var secretRegex = document.body.textContent.match (/chat.init.(.*)chatRoot'/);
var chatSecret = secretRegex[0].split(",");
var chatSecret = chatSecret[3].replace(" ","").slice(1, -1);


//Open the websocket for viewing
var webSocket = new WebSocket('wss://ws.torn.com/chat/ws?uid=1826888&secret=b6457aae92cdf25f11d15cb2d82df06e22ebe4e9986c1d09195b85708f2bcfc7');
    webSocket.onopen = function (e) {
        console.log('websocket opened');
    };

webSocket.onerror = function(e) {
        console.log('an error occured', e);
    };
webSocket.onmessage = function(msg){
  var msgParse = JSON.parse(msg.data);
  dataToSend = JSON.stringify({ "content": msgParse.data[0].messageText + " Sent by:" + msgParse.data[0].senderName});

if (msgParse.data[0].messageText.indexOf('!f') !== -1) {

  $.ajax({
    type: 'POST',
    async: false,
    url: 'https://discordapp.com/api/webhooks/346508040654028802/S8TcxcRa8Vo5LRhjpp5e609Jp6J6NzPRQ6VA9uGhU1_mG3YQPdAFxOFU32-XDN-12OST',
    data: dataToSend, // or JSON.stringify ({name: 'jonas'}),
    contentType: "application/json",
    dataType: 'json'
});}}
