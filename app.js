const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const session = require('express-session');

const userRouter = require('./routes/userRoutes');
const { connection } = require('./connection/connection');
const uuid = require('uuid');
const nocache = require('nocache');
const randomSectret = uuid.v4();
console.log(randomSectret);




app.use(nocache())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:randomSectret,
    resave:false,
    saveUninitialized:true
}))
app.set('view engine','ejs');
app.use("/public", express.static(path.join(__dirname, "public")));
//mongodb connection
connection()

//userRouter
app.use("/",userRouter)




app.listen(PORT,()=>{
    console.log(`server is running suucessfully in ${PORT}...`);
})