import { Request, Response } from 'express'
import Tienda from '../models/Tienda'
import path from 'path';
import fs from 'fs-extra'
import Producto from '../models/Producto';

export async function getTiendas(req:Request, res:Response): Promise<Response> {
    console.log("Obteniendo todas las tiendas...")
    const tiendas = await Tienda.find(); 
    return res.json(tiendas)
}

export async function getTienda(req:Request, res:Response): Promise<Response> {
    console.log("Obteniendo 1 tienda con id: "+ req.params.id)
    const tienda = await Tienda.findById(req.params.id)
    return res.json(tienda)
}

export async function createTienda(req:Request, res:Response): Promise<Response> {
    console.log("Guardando tienda...")
    const { nombre, descripcion, telefono, direccion, uid } = req.body;

    const nuevaTienda = {  
        nombre : nombre,
        descripcion : descripcion,
        imagenPath : req.file.path,
        telefono : telefono,
        direccion : direccion,
        usuario_id: uid           //falta usuario_id
    }

    const tienda = new Tienda(nuevaTienda); //crea un nuevo documento para mongo DB
    
    console.log(tienda)
    await tienda.save();

    return res.json({
        message:'¡Tienda guardada!',
        tienda
    })
}

/* FALTA: Al eliminar su tienda, debe eliminar todos los productos relacionados */
export async function deleteTienda(req:Request, res:Response): Promise<Response> {
    const { id } = req.params
    console.log("Obteniendo 1 tienda con id: "+ id)
    const tienda = await Tienda.findByIdAndRemove(id)

    if(tienda){
        await fs.unlink(path.resolve(tienda.imagenPath),function(response) {
            console.log("error al eliminar foto de tienda")
          });
    }
    console.log("¡Tienda eliminada!")

    await Producto.findByIdAndRemove(id)  //Eliminamos todos los productos relacionados

    return res.json({
        message:'¡Tienda eliminada!',
        tienda
    })
}

export async function updateTienda(req:Request, res:Response): Promise<Response> {
    const { id } = req.params;
    const { nombre, descripcion, telefono, direccion }= req.body;

    console.log("Obteniendo 1 tienda con id: "+ id);
    console.log(req.body);

    const tienda = await Tienda.findByIdAndUpdate(id, {
         nombre, descripcion, telefono, direccion
    }, {new: true});

    return res.json({
        message:'¡Tienda actualizada!',
        tienda
    })
}