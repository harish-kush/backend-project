// yaha jo bhi apn likhenge wo har jagah use hoga

const asyncHandler = (handleRequest) => {
    (req,res,next)=>{
        Promise.resolve(handleRequest(req,res,next)).catch((err)=>{
            next(err);
        })
    }
} 

/*
const asyncHandler = (fn) = async(req,res,next)=>{
    try{
    await fn(req,res,next);
    }catch(err){ 
      res.status(500).json({message:err.message});
    }

*/

export {asyncHandler};