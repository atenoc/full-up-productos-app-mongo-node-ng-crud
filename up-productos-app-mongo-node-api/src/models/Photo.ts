import { Schema, model, Document} from 'mongoose';

const schema = new Schema({
    titulo: String,
    descripcion: String,
    imagenPath: String
})

interface IPhoto extends Document{
    titulo: string;
    descripcion: string;
    imagenPath: string;
}

export default model<IPhoto>('Photo', schema);