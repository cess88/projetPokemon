import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "nom obligatoire"]
    },
    mail:{
        type:String,
        required: [true,"Email obligatoire"]
    },
    password: {
        type: String,
        required: [true, "mot de passe obligatoire"]
    },
})

const UserModel = mongoose.model('users',userSchema)
export default UserModel 