import mdns from 'mdns-js';
import { mDNSReply } from './settings';

mdns.excludeInterface('0.0.0.0')

const browser = mdns.createBrowser(mdns.tcp("airplay"));

browser.on('ready', () => {
  console.log('browser is ready');
  browser.discover();
});

browser.on('update', (data: mDNSReply) => {
  console.log('data:', data);
});

//stop after timeout
setTimeout(() => { browser.stop(); }, 5000);
