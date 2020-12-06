import { AccessoryPlugin, CharacteristicSetCallback, CharacteristicValue, HAP, Logging, Service, CharacteristicEventTypes } from "homebridge";
import { mDNSReply } from './settings';

export default class AirportExpress implements AccessoryPlugin {
  private readonly log: Logging;
  private readonly name: string;
  private readonly serialNumber: string;
  private readonly speakerService: Service;
  private readonly informationService: Service;
  private readonly hap: HAP;
  private readonly mdns: any;

  constructor(hap: HAP, mdns: any, log: Logging, data: mDNSReply) {
    this.log = log;
    this.name = data.fullname.replace('._airplay._tcp.local', '');
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

    this.informationService = new this.hap.Service.AccessoryInformation()
      .setCharacteristic(this.hap.Characteristic.Manufacturer, 'Apple Inc.')
      .setCharacteristic(this.hap.Characteristic.Model, 'AirPort10,115')
      .setCharacteristic(this.hap.Characteristic.SerialNumber, this.serialNumber);

    this.log.info(`Airport Express device ${this.name} (serial number: ${this.serialNumber} created!`);

    this.setMediaState(this.convertMediaState(data.txt));

    setInterval(this.updateMediaState.bind(this), 5000);
  }

  convertMediaState(mDNS_TXT_record: Array<string>) {
    let playState = this.hap.Characteristic.CurrentMediaState.STOP;
    if (mDNS_TXT_record.includes('flags=0x4')) {
      playState = this.hap.Characteristic.CurrentMediaState.PAUSE;
    } else if (mDNS_TXT_record.includes('flags=0x804')) {
      playState = this.hap.Characteristic.CurrentMediaState.PLAY;
    }
    return playState;
  }

  updateMediaState() {
    this.log.debug(`Updating Airport Exrpess with serial number ${this.serialNumber}`);
    const mdnsBrowser = this.mdns.createBrowser(this.mdns.tcp("airplay"));
    mdnsBrowser.on('ready', () => mdnsBrowser.discover());
    mdnsBrowser.on('update', (data: mDNSReply) => {
      const foundSerialNumber = data.txt.find((str) => str.indexOf('serialNumber') > -1)?.replace('serialNumber=', '');
      if (data.txt.includes('model=AirPort10,115') && foundSerialNumber && this.serialNumber === foundSerialNumber) {
        this.setMediaState(this.convertMediaState(data.txt));
        mdnsBrowser.stop();
      }
    });
  }

  setMediaState(state: CharacteristicValue) {
    this.speakerService
      .setCharacteristic(this.hap.Characteristic.TargetMediaState, state)
      .setCharacteristic(this.hap.Characteristic.CurrentMediaState, state);
  }

  getServices(): Service[] { return [ this.informationService, this.speakerService ]; }
}
