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
var secretRegex = /chat.init.(.*)chatRoot'/
console.log(secretRegex);