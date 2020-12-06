# homebridge-airport-express-playing

[![mit license](https://badgen.net/badge/license/MIT/red)](https://github.com/apexad/homebridge-airport-express-playing/blob/master/LICENSE)
[![npm](https://badgen.net/npm/v/homebridge-airport-express-playing)](https://www.npmjs.com/package/homebridge-airport-express-playing)
[![npm](https://badgen.net/npm/dt/homebridge-airport-express-playing)](https://www.npmjs.com/package/homebridge-airport-express-playing)
[![donate](https://badgen.net/badge/donate/paypal/91BE09)](https://www.paypal.me/apexadm)

[Homebridge](https://github.com/homebridge/homebridge) plugin that creates a smart speaker accessory that shows playing/paused for airport express devices.

## Configuration
This easiest way to use this plugin is to use [homebridge-config-ui-x](https://www.npmjs.com/package/homebridge-config-ui-x).  
To configure manually, add to the `platforms` section of Homebridge's `config.json` after installing the plugin.

**Config:**
```json
{
  "platform": "AirportExpressPlaying",
  "name": "Airport Express Playing Platform"
}
```

## Testing
Use `npx homebridge-airport-express-playing` to test if you airport express will be seen by this plugin. Your device must broadcast a txt record that has a `flags=0x04` or `flags=0x804`.

## Sponsors
[mbmccormick](https://github.com/mbmccormick)
