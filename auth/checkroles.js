module.exports = role => {
    return function(req, res, next){
        if(req.decodedToken.role && req.decodedToken.role.includes(role)){
            next()
        }else{
            res.status(403).json({message: "acces denied"})
        }
    }
}