function engine_setup(app, express, path, cookieParser, logger, sassMiddleware, jsonwebtoken, User) {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use((request, response, next) => {
        if (request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT') {
            jsonwebtoken.verify(request.headers.authorization.split(' ')[1], 'RESTFULAPIs', (error, decode) => {
                if (error) {
                    request.user = undefined;
                    request.user = decode;
                    next();
                }
            })
        } else {
            request.user = undefined;
            next();
        }
    });
    app.listen(3000);
}

module.exports = engine_setup;