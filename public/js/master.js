console.log('Client side js is loaded')



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const searchButton=document.querySelector('.search')
const msgOne=document.querySelector('#msg-one')
const msgTwo=document.querySelector('#msg-two')
// msgOne.textContent='sgdyi'

let showWeather=(location)=>{

  fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    msgOne.textContent='Loading...'
    msgTwo.textContent=''
    response.json().then((data)=>{
      if(data.error){
        msgOne.textContent=data.error
      }else{
        msgOne.textContent=data.location
        msgTwo.textContent=data.forecast
      }
    })
  })
}

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  const location=search.value
  showWeather(location)
})

searchButton.addEventListener('click',()=>{
  const location=search.value
  showWeather(location)
})
