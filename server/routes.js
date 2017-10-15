const routes = require('express').Router();
const heartbeat = require('./api/v1/heartbeat');
const login = require('./api/v1/login');
const users = require('./api/v1/users');
const system = require('./api/v1/system');
const courses = require('./api/v1/courses');
//const badges = require('./api/v1/badges');

routes.use('/api/v1/heartbeat', heartbeat);
routes.use('/api/v1/system', system);
routes.use('/api/v1/login', login);
routes.use('/api/v1/courses', courses);
//routes.use('/api/v1/badges', badges);
routes.use('/api/v1/users', users);
/**
 * Serve the docs for the api
 */
// const path = require('path');
// routes.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/../doc/index.html'));
// });

module.exports = routes;
