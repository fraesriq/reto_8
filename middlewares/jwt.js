const jwt = require('jsonwebtoken');

const usuario = {
    email: "carlos@gmail.com",
    password: "123456"
}

const SECRETO = process.env.SECRETO;

const emisionToken = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        
        if(usuario.email == email && usuario.password == password){
            //generar token
            const token = jwt.sign({ usuario }, SECRETO);
            req.token = token;
            next()
        }else{
            return res.status(401).json({code: 401, message: "Verifique las credenciales de acceso"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({code: 500, message: "error interno del servidor"})
    }
}

const validarToken = (req, res, next) => {
    let bearer;
    if(req.query.token){
        bearer = req.query.token;
    }else {
        bearer = req.headers["authorization"];
    }
    
    if(typeof bearer != "undefined"){
        let token = bearer.split(" ")
        token = token[1];
        jwt.verify(token, SECRETO, (err, authData) => {
            if(err) return res.status(403).json({code: 403, message: "el token entregado no es válido, pruebe iniciando sesión nuevamente o verifique sus permisos."})
            req.usuario = authData.usuario
            next();
        })
    }else{
        return res.status(400).json({code: 401, message: "Debe enviar un token"})
    }
}

module.exports = {
    emisionToken,
    validarToken
}