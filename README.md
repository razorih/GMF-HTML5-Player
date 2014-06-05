GMF HTML5 Player
================

An userscript that converts legacy &lt;object&gt; youtube embed into more modern iframe embeds.
*Note:* This script can be configured in the source.

## Install ###

### Firefox ###
1.  Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
2.  Open the script
3.  Click install

### Chrome ###
1.  (Optional) Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo). Chrome can handle userscipts by itself, but this is recommended way of running the script.
2.  Open the script
3.  Click install


## Changelog ##

### 1.1 ###
- Added automatic conversion if there's only one video on the page (amount of video configurable in the source)
- Master switch for HTTPS (configurable in the source)
- Code cleanup

### 1.0 ###
- Initial release

## Troubleshooting ##

#### I get an error when I try to play a video ####
This script is known to conflict with Youtube Center. Surest way to fix this is to disable all youtube related scripts or at least disable them from running on embedded videos.