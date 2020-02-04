import * as fs from 'fs';

export function* generateMessagesFromFixture(fixturename: string): Iterator<string> {
    const data = fs.readFileSync(`./fixtures/${fixturename}.geojson`);
    const gj = JSON.parse(data.toString());
    for (const feature of gjFeatures(gj)) {
        const geometry = feature['geometry'];
        if (geometry['type'] == 'LineString') {
            for (const point of geometry['coordinates']) {
                yield JSON.stringify({
                    longitude: point[0],
                    latitude: point[1],
                    date: (new Date()).toISOString(),
                    mode: feature['properties']['mode'] || 'burrito',
                })
            }
        }
    }
}

function* gjFeatures(gj: any): Iterable<any> {
    if (gj['type'] == 'FeatureCollection') {
        for (const f of gj['features']) {
            yield f
        }
    }
    else if (gj['type'] == 'Feature') {
        yield gj
    }
}

function* gjGeometries(gj: any): Iterable<any> {
    for (const f of gjFeatures(gj)) {
        yield f['geometry'];
    }
}