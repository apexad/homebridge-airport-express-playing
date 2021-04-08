import {
  Service,
  PlatformAccessory,
  CharacteristicValue,
} from 'homebridge';
import mdns from 'mdns-js';
import AirportExpressPlayingPlatform from './platform';
import { mDNSReply } from './settings';

export default class ExamplePlatformAccessory {
  private service: Service;
  private readonly name: string;
  private readonly serialNumber: string;
  private readonly showSwitch: boolean;
  private readonly switchService!: Service;

  constructor(
    private readonly platform: AirportExpressPlayingPlatform,
    private readonly accessory: PlatformAccessory,
  ) {
    this.platform = platform;
    this.showSwitch = this.platform.config.showSwitch;
    this.name = accessory.context.device.displayName;
    this.serialNumber = accessory.context.device.serialNumber

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Apple Inc. via apexad')
      .setCharacteristic(this.platform.Characteristic.Model, 'AirPort10,115')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, this.serialNumber);

    this.service = this.accessory.getService(this.platform.Service.SmartSpeaker) || this.accessory.addService(this.platform.Service.SmartSpeaker);
    this.service
      .setCharacteristic(this.platform.Characteristic.Name, this.name)
      .setCharacteristic(this.platform.Characteristic.ConfiguredName, this.name);

    if(this.showSwitch) {
      this.switchService = accessory.getService(this.platform.Service.Switch)
      || accessory.addService(this.platform.Service.Switch, `${this.name} Switch`, `${this.serialNumber} Switch`);
    }

    this.platform.log.info(`Airport Express device ${this.name} (serial number: ${this.serialNumber} created!`);

    this.setMediaState(this.convertMediaState(accessory.context.device.data.txt));
    setInterval(this.updateMediaState.bind(this), 5000);
  }

  updateMediaState() {
    this.platform.log.debug(`Updating Airport Exrpess with serial number ${this.serialNumber}`);
    const mdnsBrowser = mdns.createBrowser(mdns.tcp("airplay"));
    mdnsBrowser.on('ready', () => mdnsBrowser.discover());
    mdnsBrowser.on('update', (data: mDNSReply) => {
      try {
        if (data && data.txt) {
          const foundSerialNumber = data.txt.find((str) => str.indexOf('serialNumber') > -1)?.replace('serialNumber=', '');

          if (data.txt.includes('model=AirPort10,115') && foundSerialNumber && this.serialNumber === foundSerialNumber) {
            this.platform.log.debug(`txt record contents: ${data.txt}`)
            this.setMediaState(this.convertMediaState(data.txt));
            mdnsBrowser.stop();
          }
        }
      } catch(error) {
        this.platform.log.error(`Error in mDNS check, found invalid record`);
        this.platform.log.debug(error);
        mdnsBrowser.stop();
      }
      setTimeout(() => {
        try {
          // make sure mdnsBrowser was stopped if it was not stopped above
          mdnsBrowser.stop();
        } catch(err) {
          this.platform.log.debug(`mdns browser for stop via timeout error: ${err}`);
        }
      }, 5000);
    });
  }

  setMediaState(state: CharacteristicValue) {
    this.service
      .setCharacteristic(this.platform.Characteristic.TargetMediaState, state)
      .setCharacteristic(this.platform.Characteristic.CurrentMediaState, state);

    if (this.showSwitch) {
      this.switchService
        .setCharacteristic(
          this.platform.Characteristic.On,
          state === this.platform.Characteristic.CurrentMediaState.PLAY ? true : false  
        )
    }
  }

  convertMediaState(mDNS_TXT_record: Array<string>) {
    const bit11 = (parseInt(mDNS_TXT_record.find((r: string) => r.indexOf('flag') > -1)!.replace('flags=', ''), 16).toString(2)).padStart(12, '0').charAt(0);
    if (bit11 === '0') {
      return this.platform.Characteristic.CurrentMediaState.STOP;
    } else if (bit11 === '1') {
      /* bit11 correspponds to playing
       * see https://github.com/openairplay/airplay-spec/blob/master/src/status_flags.md
       */
      return this.platform.Characteristic.CurrentMediaState.PLAY;
    }
    return this.platform.Characteristic.CurrentMediaState.INTERRUPTED;
  }
}
