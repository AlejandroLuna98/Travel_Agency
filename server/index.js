// requerimos express
import express from 'express';
// importamos router
import router from './routes/index.js'
import db from './config/db.js';
import dotenv from 'dotenv'; // <------------------------
dotenv.config({path: 'variables.env'});
const app = express();

// Conectar a BD
db.authenticate()
     .then( () => console.log('Base de datos conectada') )
     .catch( error => console.log(error))

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual para el copyright
app.use((req, res, next) => {
     const year = new Date();

     res.locals.ActualYear = year.getFullYear();

     res.locals.NombreSitio = 'Agencia de Viajes';

     return next();
});

// Agregar bodyparser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta public
app.use(express.static('public'));

// Agregar Router
app.use('/', router);

// Arranca el servidor con el método .listen, le pasa el port y un callback para 
app.listen(port, () => {
     console.log(`El servidor está funcionando en el puerto: ${port}`)
});
/* Vemos como estaba definido port y como al ultimo se le asignaba al app.liste, sin embargo ya esto cambiará, el servidor Heroku le pasará el puerto a través de la variable de entorno HOST.

3) Así se modificará el código del index.js de la raíz:
se define un nuevo host el cuál se le asignará el valor de la variable de entorno HOST ó se le asigna una ip inválida, con el fin de que HEROKU detecte la ip inválida y le asigne una ip válida.
La variable de entorno PORT no va a existir en el archivo variables.env, esa variable la va a generar y la va a inyectar automáticamente HEROKU, y como no sabemos que puerto asignará HEROKU, lo dejamos libre para que el lo asigne.
Si corremos el proyecto en entorno local y detecta que no existe la variable de entorno PORT, le vamos a asignar el puerto 4000. */