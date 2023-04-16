import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  
  let bearer;
  if(req.query.token){
      bearer = req.query.token;
  }else {
      bearer = req.headers["authorization"];
  }
  
  if(typeof bearer != "undefined"){
      let token = bearer.split(" ")
    token = token[1];
    
    jwt.verify(token, process.env.SECRETO, (err, authData) => {
      if(err) return res.status(403).json({code: 403, message: "el token entregado no es válido, pruebe iniciando sesión nuevamente o verifique sus permisos."})
      req.usuario = authData.user
      next();
    })
  }else{
      return res.status(400).json({code: 401, message: "Debe enviar un token"})
  }
}