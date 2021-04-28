import express from 'express';

import exphbs from 'express-handlebars'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Router from './routers/index-routers.js'
import {genEmail} from './controllers/controllers.js';


//dotenv.config()
const app=express();
const URL=`mongodb://pabloadmin:39208224@tp4-shard-00-00.aalch.mongodb.net:27017,tp4-shard-00-01.aalch.mongodb.net:27017,tp4-shard-00-02.aalch.mongodb.net:27017/Tp4?ssl=true&replicaSet=atlas-8gz350-shard-0&authSource=admin&retryWrites=true&w=majority`;
const PORT=4000

//configuraciones
app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.set('views', process.cwd()+'/src/views/');
app.engine('.hbs',exphbs({extname:'.hbs', defaultLayout: 'main'}))
app.set('view engine', '.hbs');


app.use(express.static(process.cwd()+'/src/public'));
//conexion a la base de datos
//me daba error con mongoose asi que me fije en la documentacion.
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('la base de datos se conecto exitosamente');
}).catch((err) => {
    console.error(err);
});
//rutas
app.use('/api',Router)
//conexion con el puerto
app.listen(PORT, () => {
    console.log("############################");
    console.log("######## API REST ##########");
    console.log("############################");

    console.log(`http://localhost:${PORT}/api/ Direccion del backend o servidor`);
    
    genEmail();
});
/*
TP4 – Servidores Avanzados en Node.js
Crear un servidor Node.js con express que realice las siguientes acciones:
1) Debe proveer en su ruta raíz un formulario de entrada que envíe vía post al endpoint ‘/ingreso’
los datos de un producto: nombre, precio, descripción y la url de su foto (esta vista será estática).
2) La información recibida por el backend, se almacenará en la colección ‘productos’ presente en
una base de datos MongoDB Atlas (crear una cuenta propia).
3) Se deberá disponer de otra ruta get ‘/listar’ la cual devuelva una vista dinámica con una tabla que
contenga los productos ingresados. La tabla tendrá las columnas Nombre, Precio (anteponer un $ en
el valor), Descripción y Foto (representarla como imágen). Esta vista podrá ser implementada con
handlebars, ejs ó pug a elección.
4) Si al listar no se encontraran productos, mostrar el mensaje: ‘No hay productos para listar’.
5) Cada 10 productos ingresados, el servidor deberá enviarnos un email con el listado completo.
La dirección de correo la ingresaremos a través de un formulario. Dicho formulario estático se
servirá en la ruta get ‘/set-correo’ y enviará los datos por post al endpoint ‘/set-correo’. El correo se
almacenará en el archivo correo.dat en el filesystem del servidor. Al iniciar el servidor, si este
archivo no está presente, crearlo con la dirección de correo de cada uno de ustedes.
6) Subir el proyecto a un repo en github y realizar el deploy del servidor en Heroku (los repos
pueden ser distintos)
Sugerencia: utilizar Bootstrap 4.6 ó algún framework css a elección para dar estilos a las vistas.
 */