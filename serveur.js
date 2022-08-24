import express from 'express';
import mongoose from "mongoose";
import userRouter from "./routes/userRouters.js";
import session from 'express-session';
import pokeRouter from "./routes/pokeRouters.js"
import 'dotenv/config';

const db = process.env.BDD_URL;
const app = express()
const router = express.Router()


app.use(session({secret:process.env.SECRET_KEY,saveUninitialized: true,resave: true}));
app.use(express.static('./assets'));
app.use(express.urlencoded({extended: true}));
app.use(router);
router.use(userRouter);
router.use(pokeRouter);

app.listen(process.env.PORT,(err)=>{
    
    if (err) {
        console.log(err);
    }else{
        console.log(`connected at ${process.env.APP_URL}`);
    }
})

mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connected to database mongodb ( c'est ok!)");
    }
})

app.get('*', (req,res)=>{
    res.redirect('/pokemons')
})

export default router