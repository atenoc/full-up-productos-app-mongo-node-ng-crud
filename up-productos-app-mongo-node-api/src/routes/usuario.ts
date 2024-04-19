import { Router }  from 'express';

const router = Router();

import { getUsuarios, getUsuario, deleteUsuario, createUsuario, updateUsuario } from '../controllers/usuario.controller'
import multer from '../libs/multer'


//ruta para get y post /usuarios
router.route('/usuarios').post(createUsuario).get(getUsuarios);

router.route('/usuarios/:id').get(getUsuario).delete(deleteUsuario).put(updateUsuario);

export default router;