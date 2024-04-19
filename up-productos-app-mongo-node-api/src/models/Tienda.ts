import { Schema, model, Document} from 'mongoose';
import { stringify } from 'uuid';

const schema = new Schema({
    nombre: String,
    descripcion: String,
    imagenPath: String,
    telefono: String,
    direccion: String,
    usuario_id:String
})

interface ITienda extends Document{
    nombre: string;
    descripcion: string;
    imagenPath: string;
    telefono: string;
    direccion: string;
    usuario_id: string;

}

export default model<ITienda>('Tienda', schema);