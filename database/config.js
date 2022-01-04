const mongoose = require('mongoose');


const dbContection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('DB online')
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = dbContection;