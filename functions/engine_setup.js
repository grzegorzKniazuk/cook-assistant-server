function engine_setup(app, express, cors) {

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({ credentials: true, origin: true }));
    app.listen(3000);
}

module.exports = engine_setup;
