import { Socket } from 'socket.io-client';

export class Channel {
    private listeners: any = {};

    public constructor(
        private socket: any,
        private name: string,
        private data: {}
    ) {
        this.data = Object.assign({ channel: this.name }, this.data);

        this.subscribe();
    }

    private subscribe(): void {
        this.socket?.emit('subscribe', this.data);
    }

    private unsubscribe(): void {
        this.unbind();

        this.socket?.emit('unsubscribe', this.data);
    }

    public listen(event: string, callback: Function): this {
        this.on(event, callback);

        return this;
    }

    public leave(): void {
        this.unbind();
        this.unsubscribe();
    }

    public stop(event: string, callback?: Function): void {
        this.unbind(event, callback);
    }

    public send(event: string, ...args: any[]): this {
        this.socket?.emit(event, ...args);

        return this;
    }

    private on(event: any, callback: Function): void {
        this.listeners[event] = this.listeners[event] || [];

        this.socket?.on(event, (channel: string, data: any) => {
            if (this.name === channel && data.event === event) {
                delete data.event;

                this.listeners[event].forEach((cb: Function) => cb(data));
            }
        });

        this.listeners[event].push(callback);
    }

    private unbind(event?: string, callback?: Function): void {
        if (event) {
            this.removeListener(event, callback);
        } else {
            this.removeListeners();
        }
    }

    private removeListener(event: any, callback?: Function): void {
        if (this.listeners[event]) {
            if (!callback) {
                this.socket?.removeListener(event, callback);

                delete this.listeners[event];
            } else {
                this.listeners[event] = this.listeners[event].filter((cb: Function) => cb !== callback);
            }
        }
    }

    private removeListeners(): void {
        Object.keys(this.listeners).forEach((event: any) => {
            this.removeListener(event);
        });
    }
}