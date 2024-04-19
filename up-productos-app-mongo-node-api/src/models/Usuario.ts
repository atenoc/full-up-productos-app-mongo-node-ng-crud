import { Schema, model, Document} from 'mongoose';

const schema = new Schema({
    nombre: String,
    correo: String,
    activo: Boolean,
    rol: String
})

interface IUsuario extends Document{
    nombre: string;
    correo: string;
    activo: boolean;
    rol: string;
}

export default model<IUsuario>('Usuario', schema);