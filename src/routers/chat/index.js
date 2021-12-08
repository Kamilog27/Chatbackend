const express=require("express")
const router=new express.Router()
const {authenticate} = require("../../middleware/auth")
const { createGroup,addGroupMember,deleteGroup,queryChatGroup,queryChatGroups,queryChatGroupsByNickname} = require("./utils")


//Crear Grupo
router.post("/chat/create-group",authenticate,async(req,res)=>{
    try{
        const request=req.body
        const createdGroup=await createGroup(
            request.name,
            request.adminNickname,
            request.adminUser,
            request.initialMessage

        )
        res.status(200).send({status:true,message:"Grupo Registrado con éxito",data:{chat:createdGroup}})
    }catch(error){
        console.log(error)
        res.status(500).send({status:false,message:"Creación de grupo Fallo",data:{error:error.toString()}})
    }
})

//Agregar Participantes
router.patch("/chat/add-group-member",authenticate,async(req,res)=>{
    try{
        const request=req.body
        const createdGroup=await addGroupMember(
            request.groupName,
            request.newMember

        )
        res.status(200).send({status:true,message:"Miembro Agregado con éxito",data:{users:createdGroup.users}})
    }catch(error){
        console.log(error)
        res.status(500).send({status:false,message:"Fallo al Agregar",data:{error:error.toString()}})
    }
})

//Eliminar grupo
router.delete("/chat/delete-group",authenticate,async (req,res)=>{
    try{
        const request=req.body
        await deleteGroup(
            request.groupName,
            request.adminNickname,
            request.adminPassword

        )
        res.status(200).send({status:true,message:"Grupo Eliminado con éxito",data:{}})
    }catch(error){
        console.log(error)
        res.status(500).send({status:false,message:"Fallo al eliminar el grupo",data:{error:error.toString()}})
    }
})


//Consultar todos los chats
router.get("/chat/all",authenticate,async (req,res)=>{
    try{
        const request=req.body
        const params=req.params
        console.log("/chat/all",request,params)
        const queriedChats=await queryChatGroups(
            
        )
        res.status(200).send({status:true,message:"Chat consultado con éxito",data:{chat:queriedChats}})
    }catch(error){
        
        console.log(error)
        res.status(500).send({status:false,message:"Consulta Fallo",data:{error:error.toString()}})
    }
})

//Consultar chat completo

router.get("/chat/:chatName",authenticate,async (req,res)=>{
    try{
        const request=req.body
        const params=req.params
        console.log("/chat/:chatname",request,params)
        const queriedChat=await queryChatGroup(
            params.chatName
        )
        res.status(200).send({status:true,message:"Chat consultado con éxito",data:{chat:queriedChat}})
    }catch(error){
        
        console.log(error)
        res.status(500).send({status:false,message:"Consulta Fallo",data:{error:error.toString()}})
    }
})

//Consultar chats de un usuario
router.get("/chat/user/:userNickname",authenticate,async (req,res)=>{
    try{
        const request=req.body
        const params=req.params
        console.log("/chat/user/:userNickname",request,params)
        const queriedChat=await queryChatGroupsByNickname(
            params.userNickname
        )
        res.status(200).send({status:true,message:"Chat consultado con éxito",data:{chat:queriedChat}})
    }catch(error){
        
        console.log(error)
        res.status(500).send({status:false,message:"Consulta Fallo",data:{error:error.toString()}})
    }
})

//Enviar mensaje a grupo


module.exports=router