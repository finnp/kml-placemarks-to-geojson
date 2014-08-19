var xmljson = require('xml-json')
var map = require('through2').obj
var pumpify = require('pumpify')

module.exports = function (opts) {
  
  
    var convert = map(function (placemark, enc, next) {
      next(null, toFeature(placemark))
    })

  return pumpify.obj(xmljson('Placemark'), convert)

}

function toFeature(placemark) {
  var feature = {type: 'Feature'}
  if('Point' in placemark) {
    feature.geometry = {
      type: 'Point',
      coordinates: placemark.Point.coordinates.split(',').map(parseFloat)
    }
    delete placemark['Point']
  } else {
    console.error('Unsupported type.')
  }
  
  feature.properties = placemark
  
  return feature
}