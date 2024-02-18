const jwt = require('jsonwebtoken')

//verify token
function verifyToken(req,res,next){
    const authToken= req.header.authorization;
    if(authToken){
        const token=authToken.split(" ")[1];
        try{
            const decodePayload = jwt.verify(token,process.env.jwt_SECRET);
            req.user=decodePayload;
        }
        catch(error){
            return res.status(401).json({message: "invalid token,access denied"})
        }
    }
    else{
        return res.status(401).json({message:"no token provided, acces denied"});
    }
}
// verify token only user
function verifyTokenAndOnlyUser(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id){
            next();
        }
        else{
            return res.status(403).json({message:"not allowed,only user"})
        }
    })
}

// Verify Token & Authorization
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id ) {
        next();
      } else {
        return res.status(403).json({ message: "not allowed, only user himself " });
      }
    });
  }
  
module.exports = {
    verifyToken,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
}