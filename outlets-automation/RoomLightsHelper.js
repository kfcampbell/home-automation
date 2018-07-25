const tplink = require('tplink-cloud-api');
const { EMAIL, PASSWORD } = require('./Keys');

const ToggleRoomLights = async () => {
    let currentTPLink = await tplink.login(EMAIL, PASSWORD);
    console.log('link:', JSON.stringify(currentTPLink));
    let deviceList = await currentTPLink.getDeviceList()
    console.log('devicelist:', JSON.stringify(deviceList));

    let roomLights = await currentTPLink.getHS100('bedroom_lights');
    let response = await roomLights.toggle();
    console.log('toggled response:', response);
};

module.exports = { ToggleRoomLights };