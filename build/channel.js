"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
class Channel {
    constructor(socket, name, data) {
        this.socket = socket;
        this.name = name;
        this.data = data;
        this.listeners = {};
        this.data = Object.assign({ channel: this.name }, this.data);
        this.subscribe();
    }
    subscribe() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit('subscribe', this.data);
    }
    unsubscribe() {
        var _a;
        this.unbind();
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit('unsubscribe', this.data);
    }
    listen(event, callback) {
        this.on(event, callback);
        return this;
    }
    leave() {
        this.unbind();
        this.unsubscribe();
    }
    stop(event, callback) {
        this.unbind(event, callback);
    }
    send(event, ...args) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(event, ...args);
        return this;
    }
    on(event, callback) {
        var _a;
        this.listeners[event] = this.listeners[event] || [];
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.on(event, (channel, data) => {
            if (this.name === channel && data.event === event) {
                delete data.event;
                this.listeners[event].forEach((cb) => cb(data));
            }
        });
        this.listeners[event].push(callback);
    }
    unbind(event, callback) {
        if (event) {
            this.removeListener(event, callback);
        }
        else {
            this.removeListeners();
        }
    }
    removeListener(event, callback) {
        var _a;
        if (this.listeners[event]) {
            if (!callback) {
                (_a = this.socket) === null || _a === void 0 ? void 0 : _a.removeListener(event, callback);
                delete this.listeners[event];
            }
            else {
                this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
            }
        }
    }
    removeListeners() {
        Object.keys(this.listeners).forEach((event) => {
            this.removeListener(event);
        });
    }
}
exports.Channel = Channel;
