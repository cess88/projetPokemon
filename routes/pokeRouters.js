import { Router } from "express";
import pokeModel from "../models/pokemon.js";
import userModel from "../models/user.js";
import authGuard from "../customDependances/authGuard.js";
import pokeController from "../controller/pokecontroller.js";
import userController from "../controller/usercontroller.js";

const pokeRouter = Router()

//**************pokeListe***********/


pokeRouter.get('/pokemons', authGuard, async (req, res) => {
 try {
  let pokemons = await pokeController.getPokemons(req);
console.log(pokemons.length);
  res.render('demarrer.twig', {
    pokemons: pokemons
  })
 } catch (error) {
  console.log(error)
 }
  
})

pokeRouter.post('/pokemon', async (req, res) => {
  try {
    await pokeController.postPokemon(req)
    res.redirect('/pokemons')
  } catch (error) {
    console.log(error);
    res.redirect('/pokemons')
  }
})

pokeRouter.get('/pokemon/:id', async (req, res) => {
  try {
    let pokemon = await pokeController.findOnePokemon( req)
    res.render("pokemon")
  } catch (error) {
    res.redirect(error)
  }
})

//**************modif pokemon***********/
pokeRouter.get('/updatePokemon/:id', async (req, res) => {
  try {
    let pokemon = await pokeController.findOnePokemon(req)
    res.render('demarrer.twig', {
      currentAction: "update",
      pokemon: pokemon
    })
  } catch (error) {
    res.redirect(error)
  }
})

pokeRouter.post('/updatePokemon/:id', authGuard, async (req, res) => {
  try {
    await pokeController.postUpdateOnePokemon(req)
    res.redirect('/pokemons')
  } catch (error) {
    res.redirect(error)
  }
})

//**************effacer***********/

pokeRouter.get('/deletePokemon/:id', async (req, res) => {
  try {
    await pokeController.deleteOnePokemon(req)
    res.redirect('/pokemons')
  } catch (error) {
    console.log(error);
    res.redirect('/pokemons')
  }
})

//**************deconnexion ***********/

pokeRouter.get('/resetUser', authGuard, async (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/login')
  } catch (error) {
    res.send(error)
  }
})

export default pokeRouter