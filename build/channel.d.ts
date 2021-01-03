export declare class Channel {
    private socket;
    private name;
    private data;
    private listeners;
    constructor(socket: any, name: string, data: {});
    private subscribe;
    private unsubscribe;
    listen(event: string, callback: Function): this;
    leave(): void;
    stop(event: string, callback?: Function): void;
    send(event: string, ...args: any[]): this;
    private on;
    private unbind;
    private removeListener;
    private removeListeners;
}
