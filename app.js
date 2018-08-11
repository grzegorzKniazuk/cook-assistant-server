// express dependencies
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const User = require('./models/user.model');
const jsonwebtoken = require('jsonwebtoken');

// my dependencies
const engine_setup = require('./functions/engine_setup');
const db_connect = require('./functions/db_connect');
const routes_setup = require('./functions/routes_setup');

engine_setup(app, express, path, cookieParser, logger, sassMiddleware, jsonwebtoken, User);
db_connect(mongoose);
routes_setup(app);