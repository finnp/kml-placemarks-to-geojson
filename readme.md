# kml-placemarks-to-geojson

Converts a KML file with Placemarks (`<Placemark>`) to GeoJSON, where
each chunk is a GeoJSON feature. 

Install with `npm install kml-placemarks-to-geojson`.

## Supported Geometry types

KML | GeoJSON | Supported?
--- | ---
Point | Point | Yes
LineString | LineString | No
Polygon | Polygon | No
LinearRing | LineString? | No
Model | ?? | Probably never
MultiGeometry | GeometryCollection | No

Please make a pull request if you want a certain Geometry
to be supported.

## Example

Assume you have a file `helsinki.kml`.

```
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Placemark>
    <name>Cafe Regatta</name>
    <description>You get 5 cents for every coffee refill here!</description>
    <Point>
      <coordinates>60.18017,24.911849,0</coordinates>
    </Point>
  </Placemark>
  <Placemark>
    <name>Made in Kallio</name>
    <description>Place to hang out for makers.</description>
    <Point>
      <coordinates>60.188269,24.95587,0</coordinates>
    </Point>
  </Placemark>
</kml>
```

And the following code:

```js
var geojson = require('kml-placemarks-to-geojson')
var fs = require('fs')

fs.createReadStream('./helsinki.kml')
  .pipe(geojson())
  .on('data', function (feature) {
    console.log(feature)
  })
```

Then this will result in:

```js
{ type: 'Feature',
  geometry: { type: 'Point', coordinates: [ 60.188269, 24.95587, 0 ] },
  properties:
   { name: 'Made in Kallio',
     description: 'Place to hang out for makers.' } }
{ type: 'Feature',
  geometry: { type: 'Point', coordinates: [ 60.18017, 24.911849, 0 ] },
  properties:
   { name: 'Cafe Regatta',
     description: 'You get 5 cents for every coffee refill here!' } }
```
