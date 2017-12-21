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
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/', (req, res) =>{
const pakim=dbBooking.get('booking').value()
  res.render('table',{data:pakim,type:"booking"})
})
app.get('/details', (req, res) =>{
  let travel=req.query.travel
  let flight=JSON.parse(req.query.flight)
  let flight1=[]
  let travel1=[]
  flight.forEach(flights=>{

const pakim=dbFlight.get('flight').find({id:Number(flights)}).value()
flight1.push(pakim)
  })
const pakim2=dbTraveler.get('traveler').find({id:Number(travel)}).value()
travel1.push(pakim2)
  res.render('details',{travel:travel1,flight:flight1})

})
app.get('/flight', (req, res) =>{
const pakim=dbFlight.get('flight').value()
  res.render('table',{data:pakim,type:"flight"})
})
app.get('/generator', (req, res) =>{
const pakim=dbBooking.get('booking').value()
const pakim2=dbTraveler.get('traveler').value()
const pakim3=dbFlight.get('flight').value()
  res.render('generator',{id_booking:Number(pakim[pakim.length-1].id),id_traveler:Number(pakim2[pakim2.length-1].id)
    ,id_flight:Number(pakim3[pakim3.length-1].id)
  })
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

const cam=dbBooking.get('booking').find({id:Number(req.query.id)}).value()
const cam2=dbTraveler.get('traveler').find({id:Number(cam.travelerId)}).value()
  let flight1=[]
  let travel1=[]
  // travel1.push(cam2)
  cam.flightIds.forEach(flights=>{

const pakim=dbFlight.get('flight').find({id:Number(flights)}).value()
flight1.push(pakim)
  })
  if(cam==undefined){
res.json([])
  }else{
      res.json({id:cam.id,date:cam.date,cost:cam.cost,miles:cam.miles,traveler:cam2,flight:flight1})
  }

})
app.get('/getBookingByTravelerId',(req,res)=>{
const cam=dbBooking.get('booking').find({travelerId:Number(req.query.id)}).value()
const cam2=dbTraveler.get('traveler').find({id:Number(cam.travelerId)}).value()
  let flight1=[]
  let travel1=[]
  // travel1.push(cam2)
  cam.flightIds.forEach(flights=>{

const pakim=dbFlight.get('flight').find({id:Number(flights)}).value()
flight1.push(pakim)
  })
  if(cam==undefined){
res.json([])
  }else{
      res.json({id:cam.id,date:cam.date,cost:cam.cost,miles:cam.miles,traveler:cam2,flight:flight1})
  }
})
app.get('/getTravelerById', (req, res) =>{
const cam=dbTraveler.get('traveler').find({id:Number(req.query.id)}).value()
  res.json(cam)
})
app.get('/getTravelerByLoyalityNum', (req, res) =>{
const cam=dbTraveler.get('traveler').find({loyalityNumber:req.query.id}).value()
  res.json(cam)
})
app.get('/getFlightById', (req, res) =>{
const cam=dbFlight.get('flight').find({id:Number(req.query.id)}).value()
  res.json(cam)
})
app.post('/createBooking', (req, res) =>{
console.log(req.body)
const booking = dbBooking.get('booking').push(req.body.booking[0]).write()
const traveler = dbTraveler.get('traveler').push(req.body.traveler[0]).write()
req.body.flight.forEach(flying=>{
const flight = dbFlight.get('flight').push(flying).write()
})

res.send("success")
})

app.listen(process.env.PORT, () => console.log('Example app listening on port 3000!'))