//create mini express
const exp=require('express')
const productApi=exp.Router();
productApi.use(exp.json())

const expressErrorHandler=require("express-async-handler")
const multerObj=require("./middleware/addFile")




 //create user
 productApi.post("/createproducts",multerObj.single('prodphoto'),expressErrorHandler(async(req,res,next)=>{
    //get user obj
    let productCollectionObject=req.app.get("productCollectionObject")
    let newProd=JSON.parse(req.body.prodObj);
    let prod=await productCollectionObject.findOne({productname:newProd.model})

    if(prod!==null){
        res.send({message:"product allready existed"})
    }
    else{

        //add CDN link of image
        newProd.profileImage=req.file.path
        await productCollectionObject.insertOne(newProd)
        res.send({message:"Product Added"})
    }
}))

//get user
productApi.get("/getproducts",expressErrorHandler(async(req,res,next)=>{
    let productCollectionObject=req.app.get("productCollectionObject")
    let prodList=await productCollectionObject.find().toArray()
 //   console.log("productlist",prodList)
    res.send({message:prodList})
}))
module.exports=productApi;