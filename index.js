
import express from "express"
const app = express()
const port = 3000

import {getUsage, getBilling} from "./api.js"

app.use(express.static('public'))

app.get('/api/meters', (req, res) => {
  let meters = async ()=>{
    res.json( await getUsage() );
  }
   meters() 
})
app.get('/api/services', (req, res) => {
  let services = async ()=>{
    res.json( await getBilling() );
  }
   services() 
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})