const express = require('express');
const dbContection = require('./database/config');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Base de datos
dbContection();

//CORS
app.use(cors())

// Directorio publico
app.use( express.static('public') )

// Lectura y parseo del body

app.use( express.json() );


app.use('/api/auth', require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log('Server corriendo en puerto '+process.env.PORT);
});

// mern_user
// Z8VTqFhagwm9NCh