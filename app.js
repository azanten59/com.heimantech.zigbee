'use strict';

import Homey from 'homey';

class MyHeimanZigbeeApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('MyHeimanZigbeeApp has been initialized');
  }

}

module.exports = MyHeimanZigbeeApp;
