import mongoose from 'mongoose';
const Schema= mongoose.Schema;

const ProductSchema=Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String},
    url:{type:String}

})

export default mongoose.model("Product",ProductSchema);

/*
1) Debe proveer en su ruta raíz un formulario de entrada que envíe vía post al endpoint ‘/ingreso’
los datos de un producto: nombre, precio, descripción y la url de su foto (esta vista será estática).
 */