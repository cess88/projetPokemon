import UserModel from "../models/user.js";

export class userController{

    static async addUser (req){
        let user = new UserModel(req.body)
        await user.save()
        req.session.user = user._id
        return user
    }

    static async login (req){
        let user = await UserModel.findOne({mail: req.body.mail, password: req.body.password});
        return user
    }

}

export default userController

