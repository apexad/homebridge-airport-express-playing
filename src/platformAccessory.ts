import {
  AccessoryPlugin,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service,
  CharacteristicEventTypes,
  PlatformConfig,
} from "homebridge";
import { mDNSReply } from './settings';

export default class AirportExpress implements AccessoryPlugin {
  private readonly log: Logging;
  private readonly name: string;
  public readonly serialNumber: string;
  private readonly speakerService: Service;
  private readonly informationService: Service;
  private readonly switchService!: Service;
  private readonly hap: HAP;
  private readonly mdns: any;
  private readonly showSwitch: boolean;

  constructor(hap: HAP, mdns: any, log: Logging, config: PlatformConfig, data: mDNSReply) {
    this.log = log;
    this.name = data.fullname.replace('._airplay._tcp.local', '');
    this.showSwitch = config.hasOwnProperty('showSwitch') ? config.showSwitch : true;
    this.serialNumber = data.txt.find((str) => str.indexOf('serialNumber') > -1)?.replace('serialNumber=', '') || '';
    this.hap = hap;
    this.mdns = mdns;
    this.speakerService = new hap.Service.SmartSpeaker(this.name);

    this.speakerService
      .setCharacteristic(this.hap.Characteristic.ConfiguredName, this.name);

    this.speakerService
     .getCharacteristic(this.hap.Characteristic.CurrentMediaState) /* ignore attempts to set media state */
     .on(CharacteristicEventTypes.SET, (state: CharacteristicValue, callback: CharacteristicSetCallback) => callback(null));

    this.speakerService
     .getCharacteristic(this.hap.Characteristic.TargetMediaState) /* ignore attempts to set media state */
     .on(CharacteristicEventTypes.SET, (state: CharacteristicValue, callback: CharacteristicSetCallback) => callback(null));

    if(this.showSwitch) { this.switchService = new hap.Service.Switch(this.name); }

    this.informationService = new this.hap.Service.AccessoryInformation()
      .setCharacteristic(this.hap.Characteristic.Manufacturer, 'Apple Inc. via apexad')
      .setCharacteristic(this.hap.Characteristic.Model, 'AirPort10,115')
      .setCharacteristic(this.hap.Characteristic.SerialNumber, this.serialNumber);

    this.log.info(`Airport Express device ${this.name} (serial number: ${this.serialNumber} created!`);

    this.setMediaState(this.convertMediaState(data.txt));
    setInterval(this.updateMediaState.bind(this), 5000);
  }

  convertMediaState(mDNS_TXT_record: Array<string>) {
    const bit11 = (parseInt(mDNS_TXT_record.find((r: string) => r.indexOf('flag') > -1)!.replace('flags=', ''), 16).toString(2)).padStart(12, '0').charAt(0);
    if (bit11 === '0') {
      return this.hap.Characteristic.CurrentMediaState.STOP;
    } else if (bit11 === '1') { /* bit11 correspponds to playing https://github.com/openairplay/airplay-spec/blob/master/src/status_flags.md */
      return this.hap.Characteristic.CurrentMediaState.PLAY;
    }
    return this.hap.Characteristic.CurrentMediaState.INTERRUPTED;
  }

  updateMediaState() {
    this.log.debug(`Updating Airport Exrpess with serial number ${this.serialNumber}`);
    const mdnsBrowser = this.mdns.createBrowser(this.mdns.tcp("airplay"));
    try {
      mdnsBrowser.on('ready', () => mdnsBrowser.discover());
      mdnsBrowser.on('update', (data: mDNSReply) => {
        const foundSerialNumber = data.txt.find((str) => str.indexOf('serialNumber') > -1)?.replace('serialNumber=', '');

        if (data.txt.includes('model=AirPort10,115') && foundSerialNumber && this.serialNumber === foundSerialNumber) {
          this.log.debug(`txt record contents: ${data.txt}`)
          this.setMediaState(this.convertMediaState(data.txt));
          mdnsBrowser.stop();
        }
      });
    } catch(error) {
      this.log.error(`Unable to check mDNS for ${this.name}`);
      this.log.debug(error);
    }
  }

  setMediaState(state: CharacteristicValue) {
    this.speakerService
      .setCharacteristic(this.hap.Characteristic.TargetMediaState, state)
      .setCharacteristic(this.hap.Characteristic.CurrentMediaState, state);

    if (this.showSwitch) {
      this.switchService
        .setCharacteristic(this.hap.Characteristic.On, state ===this.hap.Characteristic.CurrentMediaState.PLAY ? true : false)
    }
  }

  getServices(): Service[] {
    const services = [ this.informationService, this.speakerService ];
    if (this.showSwitch) { services.push(this.switchService); }
    return services;
  }
}
