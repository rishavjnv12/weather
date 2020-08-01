const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require("./utils/geocode")
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

const publicDirectoryPath=path.join(__dirname,'../public')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebar engines and view location
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(partialPath)

//setup setup directory
app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'Rishav Kumar'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'Please provide an address'
    })
  }
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
      if(error){
        return res.send({error})
      }

      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products:[]
  })

})


app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
    name:'Rishav Kumar'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About me',
    name:'Rishav'
  })
})
app.get('/help/*',(req,res)=>{
    res.send('Help article not found')
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:'Page not found',
    name:'Rishav',
    errmsg:'Page not found'
  })
})

app.listen(port,()=>{
  console.log('Server is up on port '+port)
})
