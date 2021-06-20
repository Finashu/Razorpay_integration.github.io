const express = require('express')
const Razorpay = require('razorpay')

let app  = express()

 
const razorpay = new Razorpay({
    key_id:'rzp_test_cYwvp9iQ4YNSN1',
    key_secret:'VOkXgiH54o5yru4dxdUiLqZi' ,
})


app.set('view engine', 'ejs')
app.set(express.urlencoded({extended: false}))

app.get('/',(req, res) => {
    res.render('razorpay.ejs')
})

app.post('/orders', (req, res) => {
    let options = {
        amount: 100000,  // amount in the smallest currency unit
        currency: "INR",
        
      };
    
    razorpay.orders.create(options, function (err, order){
        
        console.log(order)
        res.json(order)
    })
})
app.post( '/is-order-completed', (req, res) => {
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
        if(paymentDocument.status=='captured'){
            res.send("success")
        } else{
            res.send("fail")
        }
    })    

})

app.listen(1000)
