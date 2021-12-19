const { query } = require("express");
const express=require("express"); 
const tenantModel=require('../models/tenant');
const router=express.Router();

router.put("/tenant/:CNIC",async(req,res,next)=>{
     const tenant=new tenantModel({CNIC:req.params.CNIC});
     if(await tenantModel.exists({CNIC:req.params.CNIC}))
     {
         res.json("Already registered");
     }
     else{
     try{
        await tenant.save();
        res.json(`${req.params.CNIC} Successfully registered`);
     }catch(err){
        res.send(err);
     }
    }
})

router.post("/tenant",async(req,res,next)=>{    //CNIC propertyID
    if(await tenantModel.exists({CNIC:req.body.CNIC})){
        try{
            const updated=await tenantModel.findOneAndUpdate({CNIC:req.body.CNIC},{$push:{favorites:req.body.propertyID}},{new:true});
            res.json(updated.favorites);
        }catch(err){
            res.status(404).send(err)
        }
    }else{
        res.json("CNIC not registered")
    }
})

router.delete("/tenant",async(req,res,next)=>{   //Deleted property from watchlist
    if(await tenantModel.exists({CNIC:req.query.CNIC})){
     const result= await  tenantModel.findOneAndUpdate({CNIC:req.query.CNIC},{$pullAll:{favorites:[req.query.propertyID]}},{new:true});
        res.json(result.favorites)   //updated favourites
    }else{
        res.json("CNIC not registered")
    }
})

router.get("/tenant/:CNIC",async(req,res,next)=>{   //GEt favourites of a tenant
    if(await tenantModel.exists({CNIC:req.params.CNIC}))
    {
        const favorites=await tenantModel.findOne({CNIC:req.params.CNIC});
        res.json(favorites.favorites);
    }
    else{
        res.status(404).send("Not found")
   }
})

module.exports=router;