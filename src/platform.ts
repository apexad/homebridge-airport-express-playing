import {
  API,
  DynamicPlatformPlugin,
  Logger,
  PlatformAccessory,
  PlatformConfig,
  Service,
  Characteristic,
} from 'homebridge';
import mdns from 'mdns-js';
import {
  mDNSReply,
  PLATFORM_NAME,
  PLUGIN_NAME,
} from './settings';
import AirportExpress from './platformAccessory';

export default class AirportExpressPlayingPlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  public readonly accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.config = config;
    this.log.debug('Finished initializing platform:', this.config.name);

    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
      this.discoverDevices();
    });
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  discoverDevices() {
    const mdnsBrowser = mdns.createBrowser(mdns.tcp("airplay"));

    mdnsBrowser.on('ready', () => {
      this.log.info('Searching for Airport Express devices')
      mdnsBrowser.discover();
    });
    
    mdnsBrowser.on('update', (data: mDNSReply) => {
      if (data && data.txt && data.txt.includes('model=AirPort10,115')) {
        const serialNumber = data.txt.find((str) => str.indexOf('serialNumber') > -1)?.replace('serialNumber=', '') || '';
        const displayName = data.fullname.replace('._airplay._tcp.local', '');
        const uuid = this.api.hap.uuid.generate(serialNumber);

        const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

        if (existingAccessory) {
          // the accessory already exists
          this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
          new AirportExpress(this, existingAccessory);
        } else {
          this.log.info('Adding new accessory:', displayName);

          const accessory = new this.api.platformAccessory(displayName, uuid);
          accessory.context.device = {
            serialNumber,
            displayName,
            data,
          };

          new AirportExpress(this, accessory);

          this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
        }
      }
    });

    setTimeout(() => mdnsBrowser.stop(), 5000);
  }
}