const request = require('request')

const forecast = (lat, lon, callback) => {
  const apiKey = 'ad5d16db3c66adacf83023ce32283aed'
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  request({
    url,
    json: true
  }, (error, {body}) => {
    if (error) {
      callback('Unable to connect forecast service!', undefined)
    } else if (body.name == undefined) {
      console.log('Unable to find location!')
    } else {
      console.log(body.main)
      callback(undefined,`Current temperature is ${body.main.temp},Cloud coverage is ${body.clouds.all}%`)
    }
  })
}

module.exports = forecast
