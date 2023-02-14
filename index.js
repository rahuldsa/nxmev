const express = require('express')
const { connection } = require('./configs/db')
const { userRouter } = require('./routes/user.route')
const { noteRouter } = require('./routes/note.route')
const { authenticate } = require('./middleware/authentication')

const passport=require('./configs/googleoauth')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome to home page')
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    console.log(req.user);
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.use('/users', userRouter)
app.use(authenticate)
app.use('/notes', noteRouter)

app.listen(4500, async () => {
    try {
        await connection
        console.log('connected to db');
    } catch (err) {
        console.log('trouble connecting to db');
        console.log(err);
    }
    console.log('runs at port 4500');
})