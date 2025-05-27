import ratelimit from "../config/upstash.js";

const ratelimiter = async(req,res,next)=>{
  try {
    const {success} = await ratelimit.limit("my-rate-limit");

    if(!success){
      return res.status(429).json({
        message:"Too many request",
      });
    }
    next();
  } catch (error) {
    console.log("Rate limit Error",error)
    next(error);
    
  }
}

export default ratelimiter;
