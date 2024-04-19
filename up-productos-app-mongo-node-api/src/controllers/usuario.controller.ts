import { Request, Response } from 'express'
import Usuario from '../models/Usuario'
import Tienda from '../models/Tienda';

export async function getUsuarios(req:Request, res:Response): Promise<Response> {
    console.log("Obteniendo todos los usuarios...")
    const usuarios = await Usuario.find(); 
    return res.json(usuarios)
}

export async function getUsuario(req:Request, res:Response): Promise<Response> {
    console.log("Obteniendo 1 usuario con id: "+ req.params.id)
    const usuario = await Usuario.findById(req.params.id)
    return res.json(usuario)
}

export async function createUsuario(req:Request, res:Response): Promise<Response> {
    console.log("Guardando usuario...")
    const { correo } = req.body;

    const nuevoUsuario = {  
        nombre : '',
        correo : correo,
        activo : true,
        rol : 'user'
    }

    const usuario = new Usuario(nuevoUsuario); //crea un nuevo documento para mongo DB
    
    console.log(usuario)
    await usuario.save();

    return res.json({
        message:'¡Usuario guardado!',
        usuario
    })
}

//eliminar usuario, debe eliminar su tienda 
export async function deleteUsuario(req:Request, res:Response): Promise<Response> {
    const { id } = req.params
    console.log("Obteniendo 1 usuario con id: "+ id)
    const usuario = await Usuario.findByIdAndRemove(id)

    console.log("Usuario eliminado!")
    Tienda.findByIdAndRemove(id)  //Eliminamos todas las tiendas relacionadas

    return res.json({
        message:'Usuario eliminado!',
        usuario
    })
}

export async function updateUsuario(req:Request, res:Response): Promise<Response> {
    const { id } = req.params;
    const { nombre }= req.body;

    console.log("Obteniendo 1 usuario con id: "+ id);
    console.log(req.body);

    const usuario = await Usuario.findByIdAndUpdate(id, {
         nombre
    }, {new: true});

    return res.json({
        message:'¡Usuario actualizado!',
        usuario
    })
}