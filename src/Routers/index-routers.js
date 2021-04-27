import express from 'express'
import {ingresar,listar} from '../controllers/controllers.js'
const Router=express.Router();

Router.post('/ingresar',ingresar);
Router.get('/listar',listar);


export default Router;