// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
function click(e) {
    chrome.tabs.executeScript(null, {
        code: "document.body.style.backgroundColor='" + e.target.id + "'"
    });
    window.close();
}

document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});
*/




// A $( document ).ready() block.
$(document).ready(function () {
    console.log("ready!");
    state = 2;

    if (state == 1) {
        // NOT SCANNED
        $('.NotScanned').removeClass('hideThis');
        $('.NoVulns').addClass('hideThis');
        $('.VulnsFound').addClass('hideThis');
        $('.Scanning').addClass('hideThis');

        chrome.browserAction.setBadgeText({
            'text': '' //an empty string displays nothing!
        });

    } else if (state == 2) {
        // NO VULNERABILITIES
        $('.NotScanned').addClass('hideThis');
        $('.NoVulns').removeClass('hideThis');
        $('.VulnsFound').addClass('hideThis');
        $('.Scanning').addClass('hideThis');

        chrome.browserAction.setBadgeBackgroundColor({
            color: [38, 166, 91, 10]
        });

        chrome.browserAction.setBadgeText({
            text: "✔"
        }); // We have 10+ unread items.


    } else if (state == 3) {
        // VULNERABILITIES WERE FOUND
        $('.NotScanned').addClass('hideThis');
        $('.NoVulns').addClass('hideThis');
        $('.VulnsFound').removeClass('hideThis');
        $('.Scanning').addClass('hideThis');

        chrome.browserAction.setBadgeBackgroundColor({
            color: [236, 17, 38, 50]
        });

        chrome.browserAction.setBadgeText({
            text: "!"
        }); // We have 10+ unread items.


    } else if (state == 4) {
        // SCANNING
        $('.NotScanned').addClass('hideThis');
        $('.NoVulns').addClass('hideThis');
        $('.VulnsFound').addClass('hideThis');
        $('.Scanning').removeClass('hideThis');

        chrome.browserAction.setBadgeBackgroundColor({
            color: [30, 139, 195, 50]
        });

        chrome.browserAction.setBadgeText({
            text: "↺"
        }); // We have 10+ unread items.

    }

});