GMF HTML5 Player
================

An userscript that converts legacy &lt;object&gt; youtube embed into more modern iframe embeds.

*Note:* This script can be configured in the source.

## Install ###

#### [Install GMF HTML5 Player](https://raw.githubusercontent.com/razorih/GMF-HTML5-Player/master/gmf-youtube_html5_player.user.js) ####

### Firefox ###
1.  Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
2.  Install the script.

### Chrome ###
1.  (Optional) Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo). Chrome can handle userscipts by itself, but this is recommended way of running the script.
2.  Install the script.

### Opera ###
1.  Install [Download Chrome Extension](https://addons.opera.com/en/extensions/details/download-chrome-extension-9/)
2.  Intall the script from link above
3.  Enable the script in `opera://extensions`


## Changelog ##

### 1.1 ###
- Added automatic conversion if there's only one video on the page (configurable in the source)
- Master switch for HTTPS (configurable in the source)
- The script now makes sure that we are actually converting a youtube player
- Code cleanup

### 1.0 ###
- Initial release

## Troubleshooting ##

#### I get an error when I try to play a video ####
This script is known to conflict with Youtube Center. Surest way to fix this is to disable all youtube related scripts or at least disable them from running on embedded videos.