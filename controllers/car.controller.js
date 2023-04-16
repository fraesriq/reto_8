import { Cars } from "../models/Cars.model.js";

export const addCar = async (req, res) => {
  try {
    let { carMarca, carModelo, carAnio, carPropietario } = req.body
    
    if (carMarca == undefined | carModelo == undefined | carAnio == undefined | carPropietario == undefined) {
      fs.unlinkSync(path.resolve("../public/img" + req.body.imagen));
      return res.status(400).json({code: 400, message: "Debe entregar toda la informacion requerida."})
    } else {
      
      let objCar = {
        marca       :carMarca,
        modelo      :carModelo,
        anio        :carAnio,
        propietario :carPropietario,
        imagen      :req.imagen
      }
      
      let car = await Cars.create(objCar);
      
      if (car === null) throw new Error('No se logro guardar el vehiculo');

      res.status(201).json({ code: 201, message: "Publicado correctamente." })
    }

  } catch (error) {
    console.log('error al crear vehiculo: ', error);
    res.status(400).json({code: 400, message: error})
  }

}

export const editCar = async (req, res) => {
  
  let {id, carMarca, carModelo, carAnio, carPropietario } = req.body

  let car = await Cars.findByPk(id);
  
  if (car == null) {
    res.status(400).send("El vehiculo que intenta actualizar no existe.");
  } else {

    let objCar = {
      marca       :carMarca,
      modelo      :carModelo,
      anio        :carAnio,
      propietario :carPropietario
    }
    
    await Cars.update(objCar, {
      where: {
        id
      }
    });
    
    //Devuelvo los productos para llenar nuvamente la tabla
    let cars = await Cars.findAll({
      raw: true,
      order: [
        ["id", "ASC"]
      ]
    });

    res.json({
      code: 200,
      cars,
      message: "Vehiculo actualizado correctamente."
    });
  }
}

export const deleteCarById = async (req, res) => {
  
  try {
    let id = req.params.id;
    await Cars.destroy({
      where: {
        id
      }
    })

    //Devuelvo los productos para llenar nuvamente la tabla
    let cars = await Cars.findAll({
      raw: true,
      order: [
        ["id", "ASC"]
      ]
    });

    res.json({
      code: 200,
      cars,
      message: "Vehiculo eliminado correctamente."
    })

  } catch (error) {
    res.status(500).json({code:500,message:"Error al eliminar el vehiculo."})
  }
}