import UserModel from "../models/user.js";

let authGuard = async (req, res, next) =>{
    let user = await UserModel.findOne({_id: req.session.user})
    if (user) {
        next()
    }else{
        res.redirect("/login")
    }
}

export default authGuard


/******protege les routes en leur donnant l'exclusivité sur la session ****/
/******la fonction verifie si l'utilisateur connecté existe ds la BD******/