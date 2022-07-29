import { Router } from "express";
import userController from "../controller/usercontroller.js";

const userRouter = Router()

//**************créer un nouvel utilisateur***********/
userRouter.get('/addUser',async (req, res)=>{
    try{
        res.render('inscription.twig',{
        action: "inscription"
    })   
    }catch (error){
        console.log(error);
        res.send(error)
    }
})
//*********renvoi avec user controller***********/
userRouter.post('/addUser',async (req, res)=>{
    try{
      await userController.addUser(req)
      res.redirect('/login')
    }catch (error){
        console.log(error);
        res.redirect('/addUser')
    }
})



//**************connect user***********/



userRouter.get('/login', async (req, res)=>{
    try {
        res.render('connexion.twig',{
        })
    } catch (error) {
        res.send(error)
    }
})

userRouter.post('/login', async (req, res)=>{
    try {
        let user = await userController.login(req)
        if (user){
            req.session.user = user._id
            res.redirect('/pokemons')
        }else{
            res.redirect('/login')
        }
    } catch (error) {
        res.send(error)
    }
})


export default userRouter
