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
            'location': null,
            'center': [-122.5, 45.5],
        };
    }

    onMessage(message) {
        console.log('got message', message.data);
        this.setState({ location: JSON.parse(message.data) })
    }

    render() {
        const { connected, location, center } = this.state;

        return (
            <span>
                {connected ? 'Connected' : 'Not Connected'}
                <WebSocketWrapper url="ws://localhost:8899"
                    onOpen={() => this.setState({ connected: true })}
                    onClose={() => this.setState({ connected: false, location: null })}
                    onMessage={m => this.onMessage(m)} />
                <Map style="mapbox://styles/mapbox/streets-v9" containerStyle={{ height: '100vh', width: '100vw' }} center={center}>
                    {location &&
                        <Marker coordinates={[location.longitude, location.latitude]} anchor="bottom"><img width="100px" height="100px" src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_New_Mexico.svg"></img></Marker>
                    }
                </Map>
            </span>
        )
    }

    componentWillUnmount() {
        this.client.close();
    }
}