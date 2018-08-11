function db_connect(mongoose) {

    // db
    mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true });
    let database = mongoose.connection;
    database.on('error', () => {
        throw new Error('Błąd połączenia');
    });
    database.once('open', () => {
        console.log('Połączenie z bazą nawiązane...');
    });
}

module.exports = db_connect;

