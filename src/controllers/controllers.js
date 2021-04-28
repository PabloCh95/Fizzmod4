import Product from '../models/products.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import {emailValidation} from '../utils/mailValidation.js';
import {writeFile,readFile} from 'fs/promises';
//funcion para crear un producto
export const ingresar=async (req,res)=>{
    try{
        const {name,price,description,url}=req.body;
        if(!name || !price || !description || !url){
            res.status(404).send({message:"Los campos tienen que tener contenido"});
        }else{
            await Product.create({
                name,
                price,
                description,
                url
            })
            const product = await Product.find();
            console.log('tipo de dato',typeof product);
            if(product.length>=10){
                sendEmail();
                res.redirect('/')
            }else res.redirect('/');
        }
    }catch(error){
        console.log("error: ",error)
    }
}

//funcion para la lista de productos
export const listar = (req,res)=>{
        Product.find().lean().then(products=>{
            if(!products){
                res.status(404).send({message:'No hay Productos para listar'});
            }else{
                res.render('index',{products})
                
            }
        }).catch((error)=>{
            console.log(error);
            res.status(500).send({message:"Error del servidor"});
        })
}
//funcion para redireccionar a la page del formulario del mail
export const addMail=(req,res)=>{
    res.sendFile(process.cwd()+'/src/public/mail.html');
}
//creacion del archivo dat para la direccion del correo electronico.
export const createEmail=async (req,res)=>{
    try{
        const {email}=req.body;
        if(emailValidation(email)){
            await writeFile('correo.dat', email);
            res.redirect('/');
        }
    }catch(err){
        console.log(err);
    };
}
//envio de mail
export const sendEmail = async (req,res)=>{
   try{
        const email = await readFile('correo.dat','utf-8');

            //datos para consumir la api de gmail
           
            const CLIENT_ID="767667904489-oa2ds3bl1o96tllvr28qecd7g7f39kgp.apps.googleusercontent.com";
            const CLIENT_SECRET="emyytRprmzMrFkgAnfHRilEm";
            const REDIRECT_URI="https://developers.google.com/oauthplayground";
            const REFRESH_TOKEN="1//04GU8PrlZzsVcCgYIARAAGAQSNwF-L9Irg0kx7zrTUbP4y2PNSrRD_mmxOdf6Uqz1y-4tsPkqXoUzdCds-loSyBPyl8JjYOKZFz8";

            const oAuth2Client= new google.auth.OAuth2(
                CLIENT_ID,
                CLIENT_SECRET,
                REDIRECT_URI
                );

            oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
        
            const accessToken= await oAuth2Client.getAccessToken()
            const productos=await Product.find();
            let contentHTML="";
            
            productos.forEach((productos)=>{
                contentHTML+=`
                <tr>
                <td>${productos.name}</td>
                <td><b>${productos.price}</b></td>
                <td>${productos.description}</td>
                <td>
                    <img src=${productos.url} alt=${productos.name}/>
                </td>
            </tr>`
            })
            const transporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    type:"OAuth2",
                    user:"ema1995.ch@gmail.com",
                    clientId:CLIENT_ID,
                    clientSecret:CLIENT_SECRET,
                    refreshToken:REFRESH_TOKEN,
                    accessToken:accessToken,
                }
            })
            const mailOptions={
                from:"ema1995.ch@gmail.com",
                to:email,
                subject:"Listado de Productos",
                html: 
                `<head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        td{text-align:center; margin: 0 3px;}
                        img{height: 70px;}
                    </style>
                </head>
                <body>
                    ${contentHTML}
                </body>
                `,
            }
            console.log("esta a punto de enviar un email"+typeof email)
            //envia el mail
            await transporter.sendMail(mailOptions,()=>{
                console.log("email enviado");
                res.status(200)
            })
            /*await transporter.sendMail(mailOptions,()=>{
                    res.status(200).send({message:"Email Enviado"});
                })*/

    }catch(error){
        console.error(error);
        res.status(500).send({message:"Error al enviar email"});
   }
}
/*
3) Se deberá disponer de otra ruta get ‘/listar’ la cual devuelva una vista dinámica con una tabla que
contenga los productos ingresados. La tabla tendrá las columnas Nombre, Precio (anteponer un $ en
el valor), Descripción y Foto (representarla como imágen). Esta vista podrá ser implementada con
handlebars, ejs ó pug a elección.
*/

export const genEmail=async () => {
    try{
        await readFile('correo.dat','utf-8');
    }
    catch(e){
        if(e.code == 'ENOENT'){
                await writeFile('correo.dat','pablo.ch98@gmail.com')
                .then(()=>{
                    console.log("Se creo un email inicial");
                }).catch(err=>{
                    console.log("ERROR:",err);
                });
        }
        else console.log(error);
    }
}