import * as mediasoupClient from 'mediasoup-client';

export class WebRTC {
    device = null;
    
    constructor(socket, users) {
        this.socket = socket;
        this.users = users;
    }

    async loadDevice(routerRtpCapabilities) {
        try {
            this.device = new mediasoupClient.Device();
        } catch(e) {
            console.error(e);
        }
        await this.device.load({ routerRtpCapabilities })
    } 
}