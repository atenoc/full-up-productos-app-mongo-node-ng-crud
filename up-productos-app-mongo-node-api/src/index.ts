/* Arrancar la aplicación */

import app from './app';
import { startConnectionDB } from './database'

async function main(){
    startConnectionDB()
    await app.listen(app.get('port'));
    console.log('Server en puerto:',app.get('port'));
} 

main();

