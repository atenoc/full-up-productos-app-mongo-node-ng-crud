import { Router }  from 'express';

const router = Router();

import { getProductos, getProducto, createProducto, deleteProducto, updateProducto } from '../controllers/producto.controller'
import multer from '../libs/multer'


//ruta para get y post /tiendas
router.route('/productos').post(multer.single('imagen'), createProducto).get(getProductos);

router.route('/productos/:id').get(getProducto).delete(deleteProducto).put(updateProducto);

export default router;