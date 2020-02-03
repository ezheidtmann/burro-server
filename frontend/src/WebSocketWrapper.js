import React from 'react';

export default class WebSocketWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.unmounting = false;
    }

    componentDidMount() {
        this.connect();
    }

    connect(url) {
        url = url || this.props.url;
        if (this.client) {
            this.client.onclose = null
            this.client.close()
        }
        const client = new WebSocket(url);
        this.client = client;
        client.onopen = () => {
            clearTimeout(this.reconnectTimeoutId);
            this.props.onOpen && this.props.onOpen();
        }
        client.onclose = e => {
            clearTimeout(this.reconnectTimeoutId);
            this.reconnectTimeoutId = setTimeout(this.reconnectIfClosed.bind(this), 2000);
            this.props.onClose && this.props.onClose();
        }
        client.onerror = err => {
            this.props.onError && this.props.onError();
            client.close();

        }
        client.onmessage = (message) => {
            this.props.onMessage && this.props.onMessage(message);
        }
    }

    reconnectIfClosed() {
        const client = this.client;
        if (this.unmounting) {
            return;
        }
        if (!this.client || this.client.readyState == WebSocket.CLOSED) {
            this.connect();
        }
    }

    render() {
        return this.children || null;
    }

    componentWillUnmount() {
        this.unmounting = true;
        this.client.close();
    }
}