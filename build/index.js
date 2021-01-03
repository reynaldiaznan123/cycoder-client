"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const socket_io_client_1 = require("socket.io-client");
const channel_1 = require("./channel");
class Client {
    constructor(options) {
        this.options = options;
        this.defaultOptions = {
            app: {
                id: '',
                secret: ''
            }
        };
        this.channels = [];
        this.options = Object.assign(this.defaultOptions, this.options);
        this.connector = socket_io_client_1.io(this.options.host, this.options);
    }
    channel(name, data = {}) {
        this.channels[name] = new channel_1.Channel(this.connector, name, data);
        return this.channels[name];
    }
}
exports.Client = Client;
module.exports = exports;
exports = { Client };
