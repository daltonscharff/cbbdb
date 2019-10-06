const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
} catch (e) {
    console.error('Mongoose connection error')
    console.error(e);
}
