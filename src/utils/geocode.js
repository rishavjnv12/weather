const request=require('request')
const mapbox_access_token = 'pk.eyJ1IjoicmlzaGF2am52MTIiLCJhIjoiY2tjazV6cnR3MHZobDJ6cDVnZnc1ODY0NCJ9.NcyxZGrY62-qGICUs_zc0w'


const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=' + mapbox_access_token + '&limit=2'
  // console.log(getcodeURL)
  request({
    url,
    json: true
  }, (error, {body}) => {

    if (error) {
      callback('Unable to connect to location service!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location,Try another search!!', undefined)
    } else {
      const latitude = body.features[0].center[1]
      const longitude = body.features[0].center[0]
      callback(undefined,{
        latitude:latitude,
        longitude:longitude,
        location:body.features[0].place_name
      })
    }
  })
}

module.exports=geocode
