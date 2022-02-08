module.exports = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    }
   else {
       console.log("plse login first")
   }
}