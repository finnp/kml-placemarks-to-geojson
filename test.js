var geojson = require('./')
var fs = require('fs')

fs.createReadStream('./example.kml')
  .pipe(geojson())
  .on('data', function (feature) {
    console.log(feature)
  })