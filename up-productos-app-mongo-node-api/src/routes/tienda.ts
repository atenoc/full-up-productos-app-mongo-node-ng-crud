import { Router }  from 'express';

const router = Router();

import { getTiendas, getTienda, createTienda, deleteTienda,updateTienda } from '../controllers/tienda.controller'
import multer from '../libs/multer'


//ruta para get y post /tiendas
router.route('/tiendas').post(multer.single('imagen'), createTienda).get(getTiendas);

router.route('/tiendas/:id').get(getTienda).delete(deleteTienda).put(updateTienda);

export default router;