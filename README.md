*This package is deprecated, please use https://github.com/maxileith/homebridge-airport-express-connected (https://www.npmjs.com/package/homebridge-airport-express-connected) instead*

# homebridge-airport-express-playing

[![mit license](https://badgen.net/badge/license/MIT/red)](https://github.com/apexad/homebridge-airport-express-playing/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/homebridge-airport-express-playing)](https://www.npmjs.com/package/homebridge-airport-express-playing)
[![npm](https://badgen.net/npm/dt/homebridge-airport-express-playing)](https://www.npmjs.com/package/homebridge-airport-express-playing)
[![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins)
[![donate](https://badgen.net/badge/donate/paypal/91BE09)](https://www.paypal.me/apexadm)



[Homebridge](https://github.com/homebridge/homebridge) plugin that creates a smart speaker accessory that shows playing/paused for airport express devices and has optional switch that can be used to trigger home automations.

## Configuration
This easiest way to use this plugin is to use [homebridge-config-ui-x](https://www.npmjs.com/package/homebridge-config-ui-x).  
To configure manually, add to the `platforms` section of Homebridge's `config.json` after installing the plugin.

**Config:**
```json
{
  "platform": "AirportExpressPlaying",
  "name": "Airport Express Playing Platform",
  "showSwitch": true
}
```

## Notes
1. Will not work when AirPlaying from iTunes running on Win10
2. Will not work in many situations involving grouped accessories due to limitations in mDNS

## Sponsors
[mbmccormick](https://github.com/mbmccormick)  
[jsiegenthaler](https://github.com/jsiegenthaler) - orginal idea to use airport express txt record [posted to reddit](https://www.reddit.com/r/homebridge/comments/jxt9le/added_a_switch_in_homebridge_to_show_if_airport/)
