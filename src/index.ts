import { io as socketIo, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { Channel } from './channel';

export interface ClientOptions extends ManagerOptions, SocketOptions {
    app: {
        id: string,
        secret: string,
    }
}

export class Client {
    private defaultOptions: any = {
        app: {
            id: '',
            secret: ''
        }
    }

    private channels: Channel[] = [];

    public connector: Socket;

    public constructor(private options: ClientOptions) {
        this.options = Object.assign(this.defaultOptions, this.options);
        this.connector = socketIo(this.options.host, this.options);
    }

    public channel(name: any, data: any = {}): Channel | undefined {
        this.channels[name] = new Channel(this.connector, name, data);

        return this.channels[name];
    }
}

/**
 * Module exports.
 */

module.exports = exports;

exports = { Client };
