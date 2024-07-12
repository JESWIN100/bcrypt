const asyncHandler =(fn)=> async (req,res,next)=>{
    try{
        await fn(req,res,next)
        }catch(err){
           res.status(err.status|| 500).send(err.message)
            }

  }
            module.exports=asyncHandler

