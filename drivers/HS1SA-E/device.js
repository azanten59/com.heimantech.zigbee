'use strict';

const Homey = require('homey');
const { ZigBeeDevice } = require('homey-zigbeedriver');
const { debug, CLUSTER } = require('zigbee-clusters');

class MyDevice extends ZigBeeDevice {

  /**
   * onNodeInit is called when the device is initialized.
   */

  async onNodeInit({ zclNode }) {
    this.log('MyDevice has been initialized');
    // this.log('Inhoud van zclNode', zclNode);

    // enable debugging
    // this.enableDebug();

    // Enables debug logging in zigbee-clusters
    // debug(true);

    // print the node's info to the console
    // this.printNode();

    // Register measure_battery capability
    if (this.isFirstInit()) {
      await this.configureAttributeReporting([
        {
          endpointId: 1,
          cluster: CLUSTER.POWER_CONFIGURATION,
          attributeName: 'batteryPercentageRemaining',
          minInterval: 6600,
          maxInterval: 7200,
          minChange: 1,
        },

      ]);
      // await this.configureAttributeReporting([
      //   {
      //     endpointId: 1280,
      //     cluster: CLUSTER.IAS_ZONE,
      //     attributeName: 'zoneStatus',
      //     minInterval: 6600,
      //     maxInterval: 7200,
      //     minChange: 1,
      //   },
      //  ]);

      this.log('Config updated');
    }
    // measure_battery
    const batteryStatus = await this.zclNode.endpoints[1].clusters.powerConfiguration.readAttributes('batteryPercentageRemaining');
    this.log('measure_battery | powerConfiguration - batteryPercentageRemaining (%): ', batteryStatus.batteryPercentageRemaining / 2);
    this.setCapabilityValue('measure_battery', batteryStatus.batteryPercentageRemaining / 2);

    // alarm_smoke
    // const alarmStatus = await this.zclNode.endpoints[1280].clusters.iasZone.readAttributes('zoneStatus');
    // this.log('alarm_smoke | iasZone - zoneStatus: ', alarmStatus.zoneStatus);
    // this.setCapabilityValue('alarm_smoke', alarmStatus.zoneStatus);
  }

}

module.exports = MyDevice;
