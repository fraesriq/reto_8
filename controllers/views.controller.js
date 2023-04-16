
import { Cars } from '../models/Cars.model.js';

export const controllerHome = async (req, res) => {

  let cars = await Cars.findAll({  
    raw: true,
    order: [
      ['id','ASC']
    ]
  })

  res.render('home', {
    cars: cars
  })
}

export const controllerLogin = async (req, res) => {
  res.render('login', {
    layout: "secondary"
  })
}

export const controllerRegistro = async (req, res) => {
  res.render('registro', {
    layout: "secondary"
  })
}

export const controllerPublicar = async (req, res) => {
  res.render("publicar", {
    email: req.usuario.email
  });
}