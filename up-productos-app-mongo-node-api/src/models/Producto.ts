import { Schema, model, Document} from 'mongoose';

const schema = new Schema({
    nombre: String,
    categoria: String,
    descripcion: String,
    imagenPath: String,
    precio: Number,
    disponible: Boolean,
    tienda_id: String,
    usuario_id: String,
})

interface IProducto extends Document{
    nombre: string;
    categoria: string;
    descripcion: string;
    imagenPath: string;
    precio: number;
    disponible: boolean;
    tienda_id: string;
    usuario_id: string;
}

export default model<IProducto>('Producto', schema);