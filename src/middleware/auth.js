const jwt=require("jsonwebtoken")

function authenticate(req,res,next){
    try{
        const token=req.headers["accesstoken"]
        const email=req.headers["email"]
        const nickname=req.headers["nickname"]

        if(email==null){
            throw new Error ("No se envio el email")
        }
        if(nickname==null){
            throw new Error ("No se envio el nickname")
        }
        if(token==null){
            throw new Error ("No se envio el token")
        }

        const auth=jwt.verify(token,process.env.PASSWORD)
        if(auth.email!=email || auth.nickname!=nickname){
            throw new Error ("Error el token no es válido")
        }
        return next()
    }catch(error){
        console.log(error)
        res.status(401).send({
            status:false,
            message:"Autenticación invalida",
            data:{error:error.toString()}
        })
    }
}

module.exports={authenticate}