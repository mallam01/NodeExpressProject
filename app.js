const express = require('express');
const app = express()
const port = process.env.PORT || 3000

// npm packages require to MongoDB connection
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }))
const UserScehema = require("./models/userSchema");
const { render } = require('ejs');

var methodOverride = require('method-override')
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Connect to MongoDB
// Collection_Name: data_collections
mongoose.connect('mongodb+srv://admin1:admin@cluster0.fqlxg.mongodb.net/data_collections?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'))
  .catch((err) => {
    console.log('error' + err)
  });

// POST Endpoint to save/create a new user 
app.post('/', (req, res) => {
  const userData = new UserScehema(req.body);
  userData.save()
  console.log(req.body)
  res.redirect("/")
})

app.set('view engine', 'ejs')

// GET Endpoint for Home page (home.html)
app.get('/', (req, res) => {
  UserScehema.find()
  .then((result) => {
    console.log(result)
    res.render("home", {userList: result})
  })
  .catch((err) => {
    console.log('error' + err)
  });
})

// GET Endpoint for Index Page (index.html)
app.get('/index.html', (req, res) => {
  UserScehema.find()
  .then((result) => {
    console.log(result)
    res.render("home", {userList: result})
  })
  .catch((err) => {
    console.log('error' + err)
  });
})

// GET Endpoint for update user --> editUser.ejs
app.get('/update/:id', (req, res) => {
  UserScehema.findById(req.params.id)
  .then((result) => {
    console.log(result)
    res.render("editUser", {userData: result})
  })
  .catch((err) => {
    console.log('error' + err)
  });
})


// UPDATE  Endpoint 
app.put('/edit/:id', (req, res) => {
  const userData = new UserScehema(req.body);
  console.log(".............Edit/PUT Endpoint" + userData) 
  UserScehema.findByIdAndUpdate(req.params.id, userData)
  .then((result) => {
    res.redirect("/")
  })
  .catch((err) => {
    console.log('error' + err)
  });
})



// DELETE Endpoint for Home page (home.html)
app.delete('/delete/:id', (req, res) => {
                               
  UserScehema.findByIdAndDelete(req.params.id)
  .then((result) => {
    console.log("delete user: Id=" + req.params.id)
    res.redirect("/")
  })
  .catch((err) => {
    console.log('error' + err)
  });
  

});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})