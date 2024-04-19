import { Router }  from 'express';

const router = Router();

import { getPhotos, getPhoto, createPhoto, deletePhoto,updatePhoto } from '../controllers/photo.controller'
import multer from '../libs/multer'


//ruta para get y post /phootos
router.route('/photos').post(multer.single('image'), createPhoto).get(getPhotos);

router.route('/photos/:id').get(getPhoto).delete(deletePhoto).put(updatePhoto);

export default router;