import { Request, Response } from 'express'
import Photo from '../models/Photo'
import path from 'path';
import fs from 'fs-extra'

export async function getPhotos(req:Request,res:Response): Promise<Response> {

    console.log("Obteniendo todas las fotos...")
    const photos = await Photo.find(); 

    return res.json(photos)
}

export async function getPhoto(req:Request,res:Response): Promise<Response> {

    console.log("Obteniendo 1 foto con id: "+req.params.id)
    //console.log(req.params.id)
    const photo = await Photo.findById(req.params.id)

    return res.json(photo)
}

export async function createPhoto(req:Request,res:Response): Promise<Response> {

    console.log("Guardando foto...")
    //console.log(req.body)

    const { titulo, descripcion } = req.body;
    const newPhoto = {
        titulo : titulo,
        descripcion : descripcion,
        imagenPath : req.file.path
    }

    const photo = new Photo(newPhoto); //crea un nuevo documento para mongo DB
    console.log(photo)
    await photo.save();

    return res.json({
        message:'Foto guardada',
        photo
    })
}

export async function deletePhoto(req:Request,res:Response): Promise<Response> {
    const { id } = req.params
    console.log("Obteniendo 1 foto con id: "+ id)
    const photo = await Photo.findByIdAndRemove(id)

    if(photo){
        //console.log("Eliminar foto")
        await fs.unlink(path.resolve(photo.imagenPath),function(response) {
            console.log("error al eliminar foto")
          });
    }
    console.log("Registro eliminado")

    return res.json({
        message:'Foto eliminada',
        photo
    })
}

export async function updatePhoto(req:Request,res:Response): Promise<Response> {
    const { id } = req.params;
    const { titulo, descripcion }= req.body;
    console.log("Obteniendo 1 foto con id: "+ id);
    console.log(req.body);

    const photo = await Photo.findByIdAndUpdate(id, {
         titulo, descripcion 
    }, {new: true});

    return res.json({
        message:'Foto actualizada',
        photo
    })
}