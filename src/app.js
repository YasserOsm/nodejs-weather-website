const express = require('express')
const path = require('path')
const hbs = require ('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// paths for Express config
const publicDirectoryPath= path.join(__dirname ,'../public')
const customViewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and custom views directory path
app.set('view engine','hbs')
app.set('views',customViewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req , res)=>{
    res.render('index',{
        title : 'Weather app',
        name : 'Yasser Osama'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : " About Me",
        name : "Yasser Osama"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : " Help !",
        message : "If you can't get the weather information , the servers may be goind under maintainence . Please try again later  ",
        name : "Yasser Osama"
    })
})
app.get('/weather',(req , res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Please enter an address '
        })
    }
    geocode(req.query.address,(error , {longtitude , latitude} = {} )=>{
        if(error){
            return res.send({ error  })
        }
        forecast(longtitude,latitude,(error,data)=>{
            if(error){
                return res.send({error})
            }
    
            res.send(data)

        })

    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title : 'Error',
        error : 'Help article not found',
        name : 'Yasser Osama'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title : 'Error' ,
        error : 'Page not found',
        name : 'Yasser Osama'
    })
})

app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}`);
})