import mongoose from 'mongoose'

const pokeSchema = new mongoose.Schema({
    pokeName: {
        type:String,
        required: [true, "Nom obligatoire"]
    },
    pokeLevel:Number,
     
    pokeType:String,
    trainer: String ,

   pokeColor:String,
})



const PokeModel = mongoose.model('pokemons',pokeSchema)
export default PokeModel 