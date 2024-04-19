import { Request, Response } from 'express'
import Producto from '../models/Producto'
import path from 'path';
import fs from 'fs-extra'

import Tienda from '../models/Tienda'

export async function getProductos(req:Request, res:Response): Promise<Response> {
    console.log("Obteniendo todos los productos...")
    const productos = await Producto.find(); 
    return res.json(productos)
}

export async function getProducto(req:Request, res:Response): Promise<Response> {
    console.log("Obteniendo 1 producto con id: "+ req.params.id)
    const producto = await Producto.findById(req.params.id)
    return res.json(producto)
}

export async function createProducto(req:Request, res:Response): Promise<Response> {
    console.log("Guardando producto...")
    const { nombre, categoria, descripcion, precio, uid } = req.body;

    /*
    console.log("Consultar el id de Tienda del usuario...");
    console.log("id_usuario: "+uid);
    const tienda = await Tienda.findById({"_id":uid});
    console.log(tienda)*/

    const nuevoProducto = {  
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        imagenPath: req.file.path,
        precio: precio,
        disponible: true,
        tienda_id: '',
        usuario_id: uid,
    }

    const producto = new Producto(nuevoProducto); //crea un nuevo documento para mongo DB
    
    console.log("producto: "+ producto)
    await producto.save();

    return res.json({
        message:'Producto guardado!',
        producto
    })
}

export async function deleteProducto(req:Request, res:Response): Promise<Response> {
    const { id } = req.params
    console.log("Obteniendo 1 producto con id: "+ id)
    const producto = await Producto.findByIdAndRemove(id)

    if(producto){
        await fs.unlink(path.resolve(producto.imagenPath),function(response) {
            console.log("Error al eliminar foto de producto")
          });
    }
    console.log("¡Producto eliminado!")

    return res.json({
        message:'¡Producto eliminado!',
        producto
    })
}

export async function updateProducto(req:Request, res:Response): Promise<Response> {
    const { id } = req.params;
    const { nombre, categoria, descripcion, precio, disponible }= req.body;

    console.log("Obteniendo 1 producto con id: "+ id);
    console.log(req.body);

    const producto = await Producto.findByIdAndUpdate(id, {
         nombre, categoria, descripcion, precio, disponible
    }, {new: true});

    return res.json({
        message:'¡Producto actualizado!',
        producto
    })
}