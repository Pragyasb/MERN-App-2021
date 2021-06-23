const exp=require('express')
const userApi=exp.Router();
userApi.use(exp.json())
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const expressErrorHandler=require("express-async-handler")
const multerObj=require("./middleware/addFile")


const checkToken=require('./middleware/verifyToken')





 userApi.get("/getusers",async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
     let userList=await userCollectionObject.find().toArray()
     res.send({message:userList})
 })
 
 
 userApi.get("/getuser/:username",expressErrorHandler(async(req,res,next)=>{
     let userCollectionObject=req.app.get("userCollectionObject")
     let un=req.params.username;
     let user=await userCollectionObject.findOne({username:un})
    
         res.send({message:user})
 }))

 
//create user
userApi.post("/createusers",multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")

    //get user obj
    let newUser=JSON.parse(req.body.userObj);
    let user=await userCollectionObject.findOne({username:newUser.username})

    if(user!==null){
        res.send({message:"user allready existed"})
    }
    else{
        let hashedPassword=await bcryptjs.hash(newUser.password,7)
        newUser.password=hashedPassword;

        //add CDN link of image
        newUser.profileImage=req.file.path
        await userCollectionObject.insertOne(newUser)
        res.send({message:"user created"})
    }
}))


userApi.put("/updateuser/:username",async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")

    let modifiedUser=req.body;

    let un=req.params.username;
    let user=await userCollectionObject.findOne({username:un})

    if(user===null){
        res.send({message:"user not esisted"})
    }
    else{
        await userCollectionObject.updateOne({username:modifiedUser.username},{$set: {...modifiedUser}})
        res.send({message:"user updated"})
    }
})



userApi.delete("/deleteuser/:username",async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    let un=req.params.username;
    let user=await userCollectionObject.findOne({username:un})

    if(user===null){
        res.send({message:"user not existed"})
    }
    else{
        await userCollectionObject.deleteOne({username:un})
        res.send({message:"user removed"})
    }
})

userApi.post("/login",async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    let credentials=req.body;
    let user=await userCollectionObject.findOne({username:credentials.username})

    if(user===null){
        res.send({message:"invalid username"})
    }
    else{
        let result=await bcryptjs.compare(credentials.password,user.password)
        if(result===false){
            res.send({message:"Invalid password"})
        }
        
        else{
            delete user.password; 
            let token=await jwt.sign({username:credentials.username},'abcdef',{expiresIn:10})
            res.send({message:"login-success",
            token:token,
            username:credentials.username,
            userObj:user})
        }
    }
})


//protected route
userApi.get('/testing',checkToken,expressErrorHandler( (req,res)=>{

    res.send({message:"this is protected data"})
}))



module.exports=userApi;