import Product from '../models/products.js';
//funcion para crear un producto
export const ingresar=async (req,res)=>{
    try{
        const {name,price,description,url}=req.body;
        if(!name || !price || !description || !url){
            res.status(404).send({message:"Los campos tienen que tener contenido"});
        }else{
            const product = await Product.create({
                name,
                price,
                description,
                url
            })
        }
    }catch(error){
        console.log("error: ",error)
        res.status(500).send({message:"Error del servidor"})
    }
}
//funcion para la lista de productos
export const listar = (req,res)=>{
    try{
        Product.find().then(products=>{
            if(!products){
                res.status(404).send({message:'No se encontraron Productos'});
            }else{
                res.render('listar',{products})
            }
        })
    }catch(error){
        console.log(error);
        res.status(500).send({message:"Error del servidor"});
    }
}
/*
3) Se deberá disponer de otra ruta get ‘/listar’ la cual devuelva una vista dinámica con una tabla que
contenga los productos ingresados. La tabla tendrá las columnas Nombre, Precio (anteponer un $ en
el valor), Descripción y Foto (representarla como imágen). Esta vista podrá ser implementada con
handlebars, ejs ó pug a elección.
*/

//funcion para el envio de mails