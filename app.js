// express dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// my dependencies
const engine_setup = require('./functions/engine_setup');
const db_connect = require('./functions/db_connect');
const routes_setup = require('./functions/routes_setup');

engine_setup(app, express, cors);
db_connect(mongoose);
routes_setup(app);
