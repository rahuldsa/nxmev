const express=require('express')
const{noteModel}=require('../models/note.model')
const noteRouter=express.Router()

noteRouter.post('/create',async(req,res)=>{
    const playload=req.body
    try{
        const new_note=new noteModel(playload)
        await new_note.save()
        res.send('create the note')
    }catch(err){
        console.log(err);
        res.send({'msg':'something went wrong'})
    }
})

noteRouter.patch('/update/:id',async(req,res)=>{
    const playload=req.body
    const id=req.params.id
    const note=await noteModel.findOne({'_id':id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({'msg':'you are not authorized'})
        }else{
            await noteModel.findByIdAndUpdate({'_id':id},playload)
            res.send('updated the note')
        }
    }catch(err){
        console.log(err);
        res.send({'msg':'something went wrong'})
    }
})

noteRouter.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    const note=await noteModel.findOne({'_id':id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({'msg':'you are not authorized'})
        }else{
            await noteModel.findByIdAndDelete({'_id':id})
            res.send('deleted the note')
        }
    }catch(err){
        console.log(err);
        res.send({'msg':'something went wrong'})
    }
})

module.exports={
    noteRouter
}