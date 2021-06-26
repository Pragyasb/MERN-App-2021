//import express server
const exp = require ("express")
const app  = exp();
 const path = require("path")
 require('dotenv').config()


//coonection build of react with current server
 app.use(exp.static(path.join(__dirname,"./build/")))

 //import api
const userApi = require("./APIS/user-api")
const productApi=require("./APIS/product-api")
const adminApi=require("./APIS/admin-api")



//execute api based on path
app.use("/user", userApi)
app.use("/product",productApi)
app.use("/admin",adminApi)

let dburl=process.env.DATABASE_URL

//connect with mongodb server
const mongoClient=require("mongodb").MongoClient

 mongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
     if(err){
         console.log("err in db connect",err)
     }
     else{
       //create databaseobject
        let databaseObject=client.db("firstdb")
         //create collection object
        let userCollectionObject=databaseObject.collection("usercollection")
        let adminCollectionObject=databaseObject.collection("admincollection")
       let  productCollectionObject=databaseObject.collection("productcollection")
       let userCartCollectionObject=databaseObject.collection("usercartcollection")

         //sharing collection object
         app.set("userCollectionObject",userCollectionObject)
         app.set("adminCollectionObject",adminCollectionObject)
         app.set("productCollectionObject",productCollectionObject)
         app.set("userCartCollectionObject",userCartCollectionObject)




         console.log("Db connection success")
     }
 })



















//for refresh
app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

  //handle invalid path
  app.use((req,res,next)=>{
      res.send({message:`path ${req.url} is invalid`})
  })

  //handle errors
  app.use((err,req,res,next)=>{
      res.send({message:err.message})
  })

let port=process.env.PORT||8080
app.listen(port, ()=>console.log(`server is listening on port `))