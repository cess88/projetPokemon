import pokeModel from "../models/pokemon.js";

let colortab = ["#BCC4C3","#D6A01B","#FADA0E"]
export class pokeController {

    static async getPokemons(req){

        let pokemons = await pokeModel.find({trainer: req.session.user})
        return pokemons
    }
    static async postPokemon(req){
        req.body.trainer = req.session.user
        req.body.pokeColor = colortab[req.body.pokeLevel - 1]  //****let colortab****/
        let poke = new pokeModel(req.body)
        await poke.save()
        return poke
    }
    static async findOnePokemon(req){
        let pokemon = await pokeModel.findOne({ _id: req.params.id })
        return pokemon
    }
   
    static async postUpdateOnePokemon(req){
        if (req.body.pokeLevel) {
            req.body.pokeColor = colortab[req.body.pokeLevel - 1]
        }
        let pokemon = await pokeModel.updateOne({ _id: req.params.id },req.body)
        return pokemon
    }
    static async deleteOnePokemon(req){
        let pokemon = await pokeModel.deleteOne({ _id: req.params.id });
        return pokemon
    }
   
}

export default pokeController


