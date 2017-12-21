const express = require('express')
const app = express()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapterBooking = new FileSync(__dirname+'/booking.json')
const adapterFlight = new FileSync(__dirname+'/flight.json')
const adapterTraveler = new FileSync(__dirname+'/traveler.json')
const dbBooking = low(adapterBooking)
const dbFlight = low(adapterFlight)
const dbTraveler = low(adapterTraveler)
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/', (req, res) =>{
const pakim=dbBooking.get('booking').value()
  res.render('table',{data:pakim,type:"booking"})
})
app.get('/flight', (req, res) =>{
const pakim=dbFlight.get('flight').value()
  res.render('table',{data:pakim,type:"flight"})
})
app.get('/traveler', (req, res) =>{
const pakim=dbTraveler.get('traveler').value()
  res.render('table',{data:pakim,type:"traveler"})
})
app.get('/booking.json', (req, res) =>{
const cam=dbBooking.get('booking').value()
  res.json(cam)
})
app.get('/traveler.json', (req, res) =>{
const cam=dbTraveler.get('traveler').value()
  res.json(cam)
})
app.get('/flight.json', (req, res) =>{
const cam=dbFlight.get('flight').value()
  res.json(cam)
})
app.get('/getBookingById',(req,res)=>{

const cam=dbBooking.get('booking').find({id:Number(req.query.id)})
  .value()
  if(cam==undefined){
res.json([])
  }else{
      res.json(cam)
  }

})
app.get('/getBookingByTravelerId',(req,res)=>{

const cam=dbBooking.get('booking').find({travelerId:Number(req.query.id)})
  .value()
 if(cam==undefined){
res.json([])
  }else{
      res.json(cam)
  }
})

app.listen(process.env.PORT, () => console.log('Example app listening on port 3000!'))