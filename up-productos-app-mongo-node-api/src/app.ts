import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

const app = express();

import indexRoutes from './routes/index';
import usuarioRoutes from './routes/usuario';
import tiendaRoutes from './routes/tienda';
import productoRoutes from './routes/producto';

//settings
app.set('port', process.env.PORT || 4000);

//middlewares : ver peticiones http (morgan)
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//rutas
app.use('/api', indexRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', tiendaRoutes);
app.use('/api', productoRoutes);

//carpeta para archivos
app.use('/uploads', express.static(path.resolve('uploads')))

export default app;