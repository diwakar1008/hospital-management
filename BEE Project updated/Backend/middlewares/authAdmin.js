import jwt from "jsonwebtoken"

// admin auth middleware

const authAdmin=async(req,res,next)=>{
    try {
        
        const{atoken}=req.headers
        if(!atoken){
            return res.json({Success:false,message:"Not Authorized"})
        }

        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)

        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({Success:false,message:"Not Authorized"})
        }

        next()

    } 
    catch (error) {
        console.log(error)
        res.json({Success:false,message:error.message})
    }
}

export default authAdmin