import React from 'react';
import WebSocketWrapper from './WebSocketWrapper'
// import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiZXpoIiwiYSI6IlpQQ01TR2cifQ.LuIx3e1Ez52srjbRHymXNg',
});

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
                <Map style="mapbox://styles/mapbox/streets-v9" containerStyle={{ height: '100vh', width: '100vw' }} center={[-122.5, 45.5]}>
                    <Marker coordinates={[-122.5, 45.5]} anchor="bottom"><img width="100px" height="100px" src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_New_Mexico.svg"></img></Marker>
                </Map>
            </span>
        )
    }

    componentWillUnmount() {
        this.client.close();
    }
}