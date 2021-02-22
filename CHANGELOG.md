# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.4.9](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.4.8...v1.4.9) (2021-02-22)


### Bug Fixes

* clarified use of mDNS data in description/README ([33d5096](https://github.com/apexad/homebridge-airport-express-playing/commit/33d5096600585571d30323f082bddcb08b02d5b7))
* correcrt typo in logs ([8fff343](https://github.com/apexad/homebridge-airport-express-playing/commit/8fff343c60684b6a26ecc641cc0ef796a366c08c))

### [1.4.8](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.4.7...v1.4.8) (2021-01-14)


### Bug Fixes

* move try..catch into mdns update function ([acee65e](https://github.com/apexad/homebridge-airport-express-playing/commit/acee65e19a03661537f90509663c062102dd4cfc))

### [1.4.7](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.4.6...v1.4.7) (2021-01-14)


### Bug Fixes

* wrap mDNS calls in try...catch fixes [#7](https://github.com/apexad/homebridge-airport-express-playing/issues/7) ([4f4565b](https://github.com/apexad/homebridge-airport-express-playing/commit/4f4565bff8019f22509ddbe81102eb86d6766fdb))

### [1.4.5](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.4.4...v1.4.5) (2020-12-16)

### [1.4.4](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.4.3...v1.4.4) (2020-12-09)


### Bug Fixes

* change manufacturer to be clear this is a homebridge plugin and not an Apple device ([cf786f7](https://github.com/apexad/homebridge-airport-express-playing/commit/cf786f74d8464e5a7f3c7bb407b439143f30a1ca))

### [1.4.3](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.4.2...v1.4.3) (2020-12-09)


### Bug Fixes

* remove broken test file ([3087e09](https://github.com/apexad/homebridge-airport-express-playing/commit/3087e09911a1300f59e61923bf698e287de12302))
* use STOPPED if Airport Express not connected/Playing, INTERRUPTED if error ([6b1c32a](https://github.com/apexad/homebridge-airport-express-playing/commit/6b1c32a1c17f87b568e0ea6235ac1db5a27df229))

### [1.4.2](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.4.1...v1.4.2) (2020-12-08)


### Bug Fixes

* correction to bit 11 (playing status bit) ([ea3f1e7](https://github.com/apexad/homebridge-airport-express-playing/commit/ea3f1e789f870e853a9db08a03bd8f70d6598e63))

### [1.4.1](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.4.0...v1.4.1) (2020-12-07)


### Bug Fixes

* showSwitch value check corrected ([745630d](https://github.com/apexad/homebridge-airport-express-playing/commit/745630deb786de362647c674a37c0f7b713a1c09))

## [1.4.0](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.4.0-beta.3...v1.4.0) (2020-12-07)


### Features

* make switch optional with config option ([66475cb](https://github.com/apexad/homebridge-airport-express-playing/commit/66475cb0b75592fc9aab43149c663eb0921219ac))

## [1.3.0](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.2.0...v1.3.0) (2020-12-06)


### Features

* remove test script, it was dangerous ([eee6096](https://github.com/apexad/homebridge-airport-express-playing/commit/eee6096052cc4eb56c365e954f35d0e50ec1b30f))

## [1.2.0](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.1.3...v1.2.0) (2020-12-06)


### Features

* re-enable adding of all airport express and fix check for playing/not playing ([16bc5a6](https://github.com/apexad/homebridge-airport-express-playing/commit/16bc5a62d4a5b9dbcd3d73a0ec1560a9111780ce))

### [1.1.3](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.1.2...v1.1.3) (2020-12-06)


### Bug Fixes

* again try and correct test script ([f95804f](https://github.com/apexad/homebridge-airport-express-playing/commit/f95804ffbadcc50cab4de3ec4860c1675ef440a1))

### [1.1.2](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.1.1...v1.1.2) (2020-12-06)


### Bug Fixes

* convert test script to pure javascript ([040e626](https://github.com/apexad/homebridge-airport-express-playing/commit/040e626b59a34b67d2a46c39a224ebf592355422))

### [1.1.1](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.1.0...v1.1.1) (2020-12-06)


### Bug Fixes

* fix location of bin test script ([d71dca6](https://github.com/apexad/homebridge-airport-express-playing/commit/d71dca6542a6272fe94b769ca7491f89fc3fdbf4))

## [1.1.0](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.0.3...v1.1.0) (2020-12-06)


### Features

* add a testing script and some info about it readme ([c0059e9](https://github.com/apexad/homebridge-airport-express-playing/commit/c0059e99d4f9b7e730e1cdc720986fc979fc2a3d))

### [1.0.3](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.0.2...v1.0.3) (2020-12-06)


### Bug Fixes

* confirm play/pause flag is in the record ([f4535b4](https://github.com/apexad/homebridge-airport-express-playing/commit/f4535b4d863e89a3f0e62e58f16bf4c9b983eb24))

### [1.0.2](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.0.1...v1.0.2) (2020-12-06)


### Bug Fixes

* check if a device is already added using serial number ([d3d6dd6](https://github.com/apexad/homebridge-airport-express-playing/commit/d3d6dd67b60f26f7c1c3b0044a54c92ec6ff495f))

### [1.0.1](https://github.com/apexad/homebridge-airport-express-playing/compare/v1.0.0...v1.0.1) (2020-12-06)


### Bug Fixes

* add config.schema.json to files list ([1412904](https://github.com/apexad/homebridge-airport-express-playing/commit/1412904a7acf008faa9793278500f090185b9ec1))

## 1.0.0 (2020-12-06)
