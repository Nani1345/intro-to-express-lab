// import modules

import express from 'express'
import * as data from './data/data.js'

// create Express app

const app = express()

// configure the app (app.set)



// mount Middleware (app.use)



// mount routes
app.get('/greeting/:name', function(req, res){
    res.send(`Hello there, ${req.params.name}`)
})

app.get('/roll/:number', function(req, res){
    let num = parseInt(req.params.number)
    if(isNaN(num)){
        res.send('You must specify a number.')
    } else{
        let randomNum = Math.floor(Math.random() * (num + 1))
        res.send(`You rolled a ${randomNum}`)
    }
    
})


app.get('/collectibles/:index', function(req, res){
    let num = data.collectibles.length
    let indexNum = parseInt(req.params.index)
    if(num > indexNum){
        res.send(`So, you want the ${data.collectibles[indexNum].name}? For ${data.collectibles[indexNum].price}, it can be yours!”`)
    } else{
        res.send('This item is not yet in stock. Check back soon!')
    }   
})

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`)
})


app.get('/shoes', (req, res) => {
    let filterShoes
    if(req.query["min-price"] ){
        filterShoes = data.shoes.filter((shoe) => {
            return shoe.price < req.query["min-price"]})
    } 
    if(req.query["max-price"] ){
        filterShoes = data.shoes.filter((shoe) => {
            return shoe.price > req.query["max-price"]})
    }
    if(req.query.type){
        filterShoes = data.shoes.filter((shoe) => {
            return shoe.type === req.query.type})
    }
    if (!req.query['min-price'] && !req.query['max-price'] && !req.query.type) {
        return res.send(data.shoes)
    }
    res.send(filterShoes)
})
// tell the app to listen on port 3000

app.listen(3000, function() {
  console.log('Listening on port 3000')
})