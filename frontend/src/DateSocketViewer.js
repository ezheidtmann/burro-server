import React from 'react';
import WebSocketWrapper from './WebSocketWrapper'
// import { w3cwebsocket as W3CWebSocket } from 'websocket';

export default class DateSocketViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'connected': false,
            'message': '',
        };
    }

    onMessage(message) {
        this.setState({ message: message.data })
    }

    render() {
        const { connected, message } = this.state;
        return (
            <span>
                {connected ? 'Connected' : 'Not Connected'} -- {message}
                <WebSocketWrapper url="ws://localhost:8899"
                    onOpen={() => this.setState({ connected: true })}
                    onClose={() => this.setState({ connected: false, message: null })}
                    onMessage={m => this.onMessage(m)} />
            </span>
        )
    }

    componentWillUnmount() {
        this.client.close();
    }
}