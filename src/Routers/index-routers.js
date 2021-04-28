import express from 'express'
import {ingresar,listar,addMail,createEmail} from '../controllers/controllers.js'
const Router=express.Router();
//localhost:4000/api/ingresar >>te permite crear productos
//localhost:4000/api/listar >> te muestra una lista de productos
//localhost:4000/api/set-correo >> te muestra un formulario para ingresar mail
Router.post('/ingresar',ingresar);
Router.get('/listar',listar);
Router.get('/set-correo',addMail); 
Router.post('/set-correo',createEmail);


export default Router;