import { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { Channel } from './channel';
export interface ClientOptions extends ManagerOptions, SocketOptions {
    app: {
        id: string;
        secret: string;
    };
}
export declare class Client {
    private options;
    private defaultOptions;
    private channels;
    connector: Socket;
    constructor(options: ClientOptions);
    channel(name: any, data?: any): Channel | undefined;
}
