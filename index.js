const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')
const productsRoute = require('./Routes/product')
const path = require('path')
 
const app = express()

app.use(cors())
app.use(express.json())

// Connect to mongo DB
mongoose.connect(process.env.MONGO_URL).then(console.log('DB successfully connected')).catch(err=>console.log(err))

// Endpoints
app.use('/api/product/', productsRoute)

    __dirname = path.resolve()
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '/client/build')))
        
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }else{
        app.get("/",(req,res)=>{
            res.send('API RUNNING CORRECTLY')
        })
    }


// App listening on Port
app.listen(5000, ()=>{
    console.log('Server is running on port 5000')
})