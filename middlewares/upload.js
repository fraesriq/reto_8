const path = require("path")
const {v4: uuid} = require('uuid');



const uploadFile = (req, res, next) => {
    try {
        let foto = req.files.foto;
        //guardando foto
        let identificador = uuid().slice(0,6)
        let nombreImagen = identificador +"-"+ foto.name;
        let ruta = path.resolve(__dirname, '../public/img/', nombreImagen);
        let mimeType = foto.mimetype;
        mimeType = mimeType.split("/")[0];
        console.log(mimeType)

        if(mimeType != "image") return res.status(400).json({code: 400, message:"El archivo subido no es una imagen."});

        if(foto){
            foto.mv(ruta, function(err) {
                if (err) {
                    console.log(err)
                  return res.status(500).json({code: 500, message:"Error al guardar su imagen."});
                }
                req.imagen = nombreImagen;
                req.ruta = ruta;
                next();
            });
        }else{
            return res.status(400).json({code: 400, message:"Debe enviar todos los datos de la publicación."});
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({code: 500, message: "error interno del servidor"})
    }

}


module.exports = {
    uploadFile
}