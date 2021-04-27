import express from 'express'

const Router=express.Router();

Router.get('/listar',()=>{
    console.log('ruta1')
});

export default Router;